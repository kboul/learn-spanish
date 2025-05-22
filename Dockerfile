FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy prisma schema first (for better caching)
COPY prisma ./prisma/

# Generate Prisma client
RUN pnpm prisma generate

# Copy the rest of the application
COPY . .

# Expose port 3001
EXPOSE 3001

# Start the development server
CMD ["pnpm", "dev", "--port", "3001"]