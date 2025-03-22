# Git Nudge

Simple GitLab dashboard to monitor changes to Merge Requests and give you a nudge

## Contribution

### Libs

- runtime: [tauri](https://v2.tauri.app/)
- icons: [lucide](https://lucide.dev/guide/)
- components: [shadcn](https://ui.shadcn.com/docs)
- ui: [tailwind](https://tailwindcss.com/docs)

### getting schema

Can either use the public gitlab schema, or a hosted one.

#### Public

- from gitlab [graphql-schema-dump](https://gitlab.com/gitlab-org/gitlab/-/jobs/94889270010)
  https://gitlab.com/gitlab-org/gitlab/-/jobs/9488927001/artifacts/download

### Hosted

- for deployment, set env `GRAPH_DOMAIN=https://git.domain.io`
