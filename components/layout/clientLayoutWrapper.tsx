"use client";

import { ReactNode } from "react";

interface ClientLayoutWrapperProps {
  children: ReactNode;
  locale: string;
}

export default function ClientLayoutWrapper({
  children,
}: ClientLayoutWrapperProps) {
  return <>{children}</>;
}
