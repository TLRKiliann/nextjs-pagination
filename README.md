# nextjs-pagination

Another way of creating a pagination system.

**NextJS 14.2.3 - Tailwindcss - useQuery - TypeScript**

---

## Installation

**Project was created**

`$ pnpx create-next-app@latest`

`$ pnpm add @tanstack/react-query`

`$ pnpm add -D @tanstack/eslint-plugin-query`

`$ pnpm add @tanstack/react-query-devtools`

---

**Run this app**

`$ git clone <addr of project>`

`$ cd pagination/my-app`

`$ pnpm install`

`$ pnpm run dev`

---

## Data path from fake database (simulation)

- database simulation:

`lib/data.ts`

- get fake db:

`api/articles/route.ts`

- call api:

`utils/api-requests.ts`

- RSC to pass data

`pagination/page.tsx`

- display all data

`ui/pagination.tsx`
`ui/index-pages.tsx`

- display data by id

`pagination/[articleId]/layout.tsx`

---

## Some additionnal features:

Metadata - not-found - error - loading





