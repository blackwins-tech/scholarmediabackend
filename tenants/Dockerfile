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
CMD [ "node", "server.js" ]