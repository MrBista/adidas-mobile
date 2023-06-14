FROM node:lts-hydrogen

WORKDIR /apps

COPY . .

RUN npm install --production 

ENV PORT=4000

ENV REDIS_PASSWORD=BJk8wTH3fYKNWP1Ljp5W5ookvDI7e8JD
ENV URL_PRODUCTS=http://apps:4002
ENV URL_USERS=http://users:4001

ENV NODE_ENV=production

EXPOSE 4000
CMD ["node","app.js"]