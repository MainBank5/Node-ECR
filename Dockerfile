#base image
FROM node:23-alpine3.20

#set working directory to /app
WORKDIR /app
#copy package*.json to /app
COPY package*.json ./

#run insall dependencies
RUN npm install
#copy remaining files
COPY . /app/
#copy .src/ /app/
#expose port
EXPOSE 3001
#run command to start app
CMD ["npm", "start"]