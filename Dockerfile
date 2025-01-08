# Vaihe 1: Builder
FROM node:18 as build

WORKDIR /app
COPY app/package*.json ./
RUN npm install
COPY app ./
RUN npm run build

# Vaihe 2: Production server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]