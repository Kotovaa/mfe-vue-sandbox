FROM node:22-alpine AS base
WORKDIR /workspace

FROM base AS deps
COPY package.json package-lock.json* turbo.json ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/
RUN npm install

FROM deps AS build
COPY . .
ENV VITE_DASHBOARD_REMOTE=http://localhost:8081/assets/remoteEntry.js
ENV VITE_PROFILE_REMOTE=http://localhost:8082/assets/remoteEntry.js
ENV VITE_BILLING_REMOTE=http://localhost:8083/assets/remoteEntry.js
RUN npm run build

FROM nginx:1.27-alpine AS shell
COPY --from=build /workspace/apps/shell-app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx:1.27-alpine AS dashboard
COPY --from=build /workspace/apps/dashboard-mfe/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx:1.27-alpine AS profile
COPY --from=build /workspace/apps/profile-mfe/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx:1.27-alpine AS billing
COPY --from=build /workspace/apps/billing-mfe/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
