FROM node:12-stretch-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

#EXPOSE 8080

CMD [ "sh", "test_all.sh" ]