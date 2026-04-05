// lib/staticData.ts
import blogsData from "@/data/blogs.json";
import projectsData from "@/data/projects.json";
import technologiesData from "@/data/technologies.json";

export type Blog = {
  id: string;
  title: string;
  summary: string;
  description: string;
  titleEng?: string;
  summaryEng?: string;
  descriptionEng?: string;
  url: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Technology = {
  id: string;
  name: string;
  icon: string;
  type: string;
  yoe: number;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  titleEng?: string;
  summaryEng?: string;
  descriptionEng?: string;
  url: string;
  image: string;
  demoUrl?: string | null;
  githubUrl?: string | null;
  subImage1?: string | null;
  subImage2?: string | null;
  subImage3?: string | null;
  subImage4?: string | null;
  subImage5?: string | null;
  technologies: string[]; // technology id'leri
  createdAt: string;
  updatedAt: string;
};

export type ProjectWithTechnologies = Omit<Project, "technologies"> & {
  technologies: Technology[];
};

export const getAllBlogs = (): Blog[] => blogsData as Blog[];

export const getBlogById = (id: string): Blog | null =>
  (blogsData as Blog[]).find((b) => b.id === id) ?? null;

export const getAllTechnologies = (): Technology[] =>
  technologiesData as Technology[];

export const getTechnologyById = (id: string): Technology | null =>
  (technologiesData as Technology[]).find((t) => t.id === id) ?? null;

export const getAllProjects = (): ProjectWithTechnologies[] =>
  (projectsData as Project[]).map((p) => ({
    ...p,
    technologies: p.technologies
      .map((tid) => getTechnologyById(tid))
      .filter((t): t is Technology => t !== null),
  }));

export const getProjectById = (id: string): ProjectWithTechnologies | null =>
  getAllProjects().find((p) => p.id === id) ?? null;