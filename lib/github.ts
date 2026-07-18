// lib/github.ts
// Server-only. Fetches pinned repos + contribution calendar from GitHub's
// GraphQL API. Requires GITHUB_TOKEN (see .env). Never call from a client
// component — the token must stay server-side.

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
};

export type GithubContributionDay = {
  date: string;
  count: number;
  color: string;
};

export type GithubShowcase = {
  login: string;
  url: string;
  totalContributions: number;
  weeks: GithubContributionDay[][];
  pinnedRepos: GithubRepo[];
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      url
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function getGithubShowcase(): Promise<GithubShowcase | null> {
  const token = process.env.GITHUB_TOKEN;
  const login = process.env.GITHUB_USERNAME || "ceyhun64";

  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const user = json?.data?.user;
    if (!user) return null;

    const calendar = user.contributionsCollection.contributionCalendar;

    return {
      login,
      url: user.url,
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((w: any) =>
        w.contributionDays.map((d: any) => ({
          date: d.date,
          count: d.contributionCount,
          color: d.color,
        })),
      ),
      pinnedRepos: user.pinnedItems.nodes,
    };
  } catch {
    return null;
  }
}
