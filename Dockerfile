# Stage 1: Build the React app
FROM node:20 AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files for both frontend and backend
COPY ./client/package*.json ./client/
COPY ./package*.json ./

# Install dependencies for both frontend and backend
RUN npm install
RUN cd client && npm install

# Build the React app
COPY ./client ./client
RUN cd client && npm run build

# Stage 2: Serve the app with a Node.js server
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files for the backend
COPY package*.json ./

# Install backend dependencies only
RUN npm install --production

# Copy the backend code to the container
COPY . .

# Copy the React build from the previous stage
COPY --from=build /app/client/build ./client/build

# Expose the port the app runs on
EXPOSE 5000

# Start the Node.js app
CMD ["node", "index.js"]
