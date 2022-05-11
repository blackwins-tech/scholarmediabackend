FROM node:14-alpine3.12
RUN mkdir -p usr/src/app/node_modules && chown -R node:node usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 3001
CMD [ "node", "server.js" ]