# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the app for production
RUN npm run build

# Serve the static files
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]

# Expose the port the app runs on
EXPOSE 5173
