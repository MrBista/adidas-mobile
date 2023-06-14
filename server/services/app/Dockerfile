FROM node:lts-hydrogen

WORKDIR /apps

COPY . .

RUN npm install --production 

ENV PORT=4002

ENV DATABASE_URL=postgres://postgres:28nyogYsn73Sl0Nw@db.lefpisobdinqnnbmwqfq.supabase.co:6543/postgres

ENV NODE_ENV=production

EXPOSE 4002
CMD ["node","app.js"]