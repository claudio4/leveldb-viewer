FROM docker.io/library/node:20-slim AS BUILDER
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci

FROM gcr.io/distroless/nodejs20-debian12
ENV NODE_ENV=production

WORKDIR /app
COPY --from=BUILDER ["/app", "/app"]
COPY ["index.mjs", "./"]

ENTRYPOINT ["/nodejs/bin/node", "/app/index.mjs"]
