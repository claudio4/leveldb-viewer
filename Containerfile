FROM docker.io/library/node:20-slim AS BUILDER
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci

FROM gcr.io/distroless/nodejs20-debian12
ENV NODE_ENV=production

WORKDIR /app
COPY --from=BUILDER ["/app", "/app"]
COPY ["index.mjs", "./"]

LABEL org.opencontainers.image.source=https://github.com/claudio4/leveldb-viewer
LABEL org.opencontainers.image.description="Tool to easily explore LevelDB databases."
LABEL org.opencontainers.image.licenses=MIT

ENTRYPOINT ["/nodejs/bin/node", "/app/index.mjs"]
