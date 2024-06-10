FROM node:20-alpine as base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV RESEND_API_KEY=re_5HbXv6Gg_Du6sckNPUV8UK2VtozcZPQC7
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD npm run start