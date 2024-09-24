FROM node:20-slim AS base
RUN corepack enable
COPY . /app
WORKDIR /app

RUN pnpm install

EXPOSE 3000
CMD ["pnpm", "run", "dev", "--host"]
