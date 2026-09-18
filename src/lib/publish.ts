type Publishable = {
  published?: boolean;
  hidden?: boolean;
};

export function isPublishedProject(project: Publishable): boolean {
  return project.published === true && !project.hidden;
}
