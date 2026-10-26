"use client";

import { ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
import SpotlightCard from "../components/SpotlightCard";
import { covers } from "../components/project-covers";
import { useMarginTheme } from "../components/theme-shell";
import { Container, Eyebrowed, TechIcon } from "../components/ui";
import { projects } from "../content";

type Project = (typeof projects.items)[number];

function ProjectTools({ project }: { project: Project }) {
  return <ul className="flex flex-wrap gap-x-3 gap-y-2">{project.tech.map(tech => <li key={tech.name} className="flex items-center gap-1.5 text-xs text-(--margin-secondary)"><span className="rounded-sm bg-white p-0.5"><TechIcon icon={tech.icon} name="" size={12} /></span>{tech.name}</li>)}</ul>;
}

export function Projects() {
  const { theme } = useMarginTheme();
  const [featured, ...other] = projects.items;
  const FeatureCover = covers[featured.cover];

  return (
    <Container id="projects">
      <Eyebrowed eyebrow={projects.eyebrow} title={projects.title} />
      <SpotlightCard theme={theme} intensity={0.08} className="group grid overflow-hidden rounded-2xl! border border-(--margin-line) bg-(--margin-card)! p-0! sm:grid-cols-2">
        <div className="margin-project-cover relative min-h-64 overflow-hidden sm:min-h-80" style={{ backgroundColor: featured.tint }}><FeatureCover /></div>
        <div className="flex flex-col items-start p-6">
          <p className="margin-mono flex w-full justify-between gap-3 text-xs text-(--margin-secondary)"><span>{projects.featuredLabel} / {featured.year}</span><span className="text-(--margin-accent)">01</span></p>
          <h3 className="mt-6 text-3xl font-semibold tracking-tight">{featured.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-(--margin-secondary)">{featured.description}</p>
          <p className="mt-4 text-sm font-medium text-(--margin-accent)">{featured.note}</p>
          <div className="mt-6"><ProjectTools project={featured} /></div>
          <a href={featured.website} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-(--margin-line) underline-offset-4 transition-colors duration-500 hover:text-(--margin-accent)">{projects.actionLabel}<ArrowUpRightIcon size={16} /></a>
        </div>
      </SpotlightCard>
      <div className="mt-4 flex flex-col gap-3">
        {other.map((project, i) => {
          const Cover = covers[project.cover];
          return (
            <article key={project.title} className="margin-project-index group grid min-w-0 overflow-hidden border border-(--margin-line) bg-(--margin-card) transition-colors duration-500 sm:grid-cols-[184px_minmax(0,1fr)]">
              <div className="margin-project-cover relative hidden overflow-hidden sm:block" style={{ backgroundColor: project.tint }}><Cover /></div>
              <div className="min-w-0 p-5">
                <div className="flex items-center justify-between gap-3 text-xs text-(--margin-secondary)"><p className="margin-mono">{String(i + 2).padStart(2, "0")} / {project.category}</p><span className="margin-mono">{project.year}</span></div>
                <div className="mt-3 flex items-center justify-between gap-3"><h3 className="text-xl font-semibold tracking-tight"><a href={project.website} className="transition-colors duration-500 hover:text-(--margin-accent)">{project.title}</a></h3><a href={project.website} aria-label={`Ask about ${project.title}`} className="rounded-md p-1 transition-colors duration-500 hover:bg-(--margin-muted)"><ArrowUpRightIcon size={20} /></a></div>
                <p className="mt-2 text-sm leading-relaxed text-(--margin-secondary)">{project.description}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><ProjectTools project={project} />{project.repo && <a href={project.repo} aria-label={`${project.title} on GitHub`} target="_blank" rel="noopener noreferrer"><GithubLogoIcon size={18} /></a>}</div>
              </div>
            </article>
          );
        })}
      </div>
      <a href={projects.moreCta.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-(--margin-secondary) transition-colors duration-500 hover:text-(--margin-fg)">{projects.moreCta.label}<ArrowUpRightIcon size={16} /></a>
    </Container>
  );
}
