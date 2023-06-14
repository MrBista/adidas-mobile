FROM node:lts-hydrogen

WORKDIR /apps

COPY . .

RUN npm install --production 

ENV PORT=4001

ENV MONGODB_CONNECTION=mongodb+srv://MrBista:udPymTL96rwVhLhC@atlascluster.zwwkcyz.mongodb.net/test
ENV NODE_ENV=production

EXPOSE 4001

CMD ["node","app.js"]