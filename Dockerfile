# specify the node base image with your desired version node:<version>
FROM node:22
# replace this with your application's default port
EXPOSE 8398

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g nodemon

CMD ["nodemon", "index.js"]