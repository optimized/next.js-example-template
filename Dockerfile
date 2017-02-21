FROM node:7.5.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app
#Remove old next build and rebuild all modules
RUN rm -rf /usr/src/app/.next/ && rm -rf /usr/src/app/node_modules && npm install && npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
