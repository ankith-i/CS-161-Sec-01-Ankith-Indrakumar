# # Use an official Node.js runtime as a parent image
# FROM node:16-alpine

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json (or yarn.lock if you use Yarn)
# COPY package*.json ./

# # Install dependencies, including 'devDependencies' necessary for Vite
# RUN npm install --force

# # Copy the rest of your application's code
# COPY . .

# # Set environment variable to let Next.js know we are running in development mode
# ENV NODE_ENV development

# # Expose the port Vite uses by default
# EXPOSE 3000

# # The default command to run when starting the container
# CMD ["npm", "run", "dev"]

# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files into the working directory
COPY package*.json ./

# Install all dependencies, making sure to clean the cache to avoid any conflicts
RUN npm install -g vite
RUN npm cache clean --force
RUN npm install --force

# Globally install Vite

# Copy the rest of your application's code
COPY . .

# Set environment variable to let Next.js know we are running in development mode
ENV NODE_ENV development

# The default command to run when starting the container
# EXPOSE 3000
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Expose the port the app runs on


