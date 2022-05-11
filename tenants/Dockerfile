FROM node:14-alpine3.12
# Create app directory
RUN mkdir -p /usr/src/tenants
WORKDIR /usr/src/tenants
ENV PATH /usr/src/node_modules/.bin:$PATH
# Install app dependencies
COPY package.json /usr/src/package.json
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# RUN mkdir -p usr/src/app/node_modules && chown -R node:node usr/src/app/
# WORKDIR /usr/src/app/
# COPY package*.json ./
# USER node
# RUN npm install
# COPY --chown=node:node . .
# EXPOSE 3000
CMD [ "node", "server.js" ]