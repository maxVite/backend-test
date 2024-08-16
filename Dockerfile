FROM node:iron-alpine
WORKDIR /app

RUN npm i -g pnpm@9

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

ENV NODE_ENV=development
ENV PORT=3000
ENV SIMPLE_ARRAY='Greetings, traveler'
ENV JSON_API_URL=https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8


CMD ["node", "dist/main.js"]
