import { createFileRoute } from "@tanstack/react-router";
import { TheoremApp } from "@/components/theorem/TheoremApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <TheoremApp />;
}
