FROM node:20-alpine3.21

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install pm2 -g

ENV TZ=America/Puerto_Rico

CMD ["pm2-runtime", "dist/main.js"]
