FROM node:alpine3.11
MAINTAINER <GROUP_NAME_HERE>

# Change working directory
WORKDIR /usr/src/index

# Install App Dependencies
COPY package*.json ./
RUN npm install --silent

# Copy App Source
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
