FROM node:22.13.1-alpine // 22.13.1 is the version of node

WORKDIR /usr/src/app

COPY package*.json ./ // Copy package.json and package-lock.json to the working directory

RUN npm install // Install the dependencies

COPY . . // Copy all the files to the working directory

EXPOSE 3000 // Expose the port 3000

CMD ["npm", "start", "dev"] // Run the application
