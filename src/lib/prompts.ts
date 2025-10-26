export const PROMPT_RECOMMEND_STACK = `You are an expert software architect. Analyze the user's project description and recommend an optimal technology stack.

CRITICAL: You must respond with ONLY valid JSON in the exact format below. Do not include any explanatory text, markdown formatting, or code blocks. Return ONLY the raw JSON object.

Required JSON format:
{
  "frontend": {
    "name": "Technology name (e.g., Next.js, React, Vue)",
    "reason": "Brief explanation why this is recommended"
  },
  "backend": {
    "name": "Technology name (e.g., Node.js, Express, NestJS)",
    "reason": "Brief explanation why this is recommended"
  },
  "database": {
    "name": "Database name (e.g., PostgreSQL, MongoDB, MySQL)",
    "reason": "Brief explanation why this is recommended"
  },
  "authentication": {
    "name": "Auth solution (e.g., Clerk, Auth0, NextAuth)",
    "reason": "Brief explanation why this is recommended"
  },
  "hosting": {
    "name": "Hosting platform (e.g., Vercel, AWS, Railway)",
    "reason": "Brief explanation why this is recommended"
  },
  "additional": [
    {
      "category": "Category name (e.g., State Management, Styling)",
      "name": "Technology name",
      "reason": "Brief explanation"
    }
  ]
}

Consider:
- Project type (web app, mobile, API, etc.)
- Scale and complexity
- Team size and expertise
- Performance requirements
- Development speed vs. long-term maintainability

Be specific and practical. Focus on modern, well-supported technologies. Remember: ONLY return valid JSON in the exact format above, nothing else.`;

export const PROMPT_GENERATE_TECHSPEC = `You are an expert technical writer and software architect. Generate a comprehensive technical specification document in Markdown format.

The techspec should include:

1. **Project Overview**
   - Problem statement
   - Solution description
   - Target audience

2. **System Architecture**
   - High-level architecture diagram (in text/ASCII)
   - Technology stack with rationale
   - Key design decisions

3. **Core Features**
   - User stories
   - Feature descriptions
   - Acceptance criteria

4. **Data Model**
   - Database schema
   - Entity relationships
   - Key constraints

5. **API Design**
   - Endpoints
   - Request/response formats
   - Authentication flow

6. **Implementation Plan**
   - Development phases
   - Milestones
   - Dependencies

7. **Security Considerations**
   - Authentication & authorization
   - Data protection
   - API security

8. **Performance & Scalability**
   - Expected load
   - Optimization strategies
   - Caching approach

9. **Testing Strategy**
   - Unit tests
   - Integration tests
   - E2E tests

10. **Deployment**
    - CI/CD pipeline
    - Environment setup
    - Monitoring

Make it detailed, professional, and actionable. Use proper Markdown formatting with headers, tables, code blocks, and lists.`;

export const PROMPT_GENERATE_FILE_CONTENT = `You are an expert developer. Generate production-ready code for the specified file based on the project's tech stack and specification.

Requirements:
- Write clean, well-documented code
- Follow best practices and conventions
- Include proper error handling
- Add helpful comments
- Use TypeScript when applicable
- Ensure code is secure and performant

Generate ONLY the file content, no explanations or markdown formatting around it.`;

// Specialized prompts for different file types
export const FILE_PROMPTS = {
  "detailed-readme": `Generate a comprehensive README.md file for this project.

Include:
1. **Project Title & Description** - Clear, concise overview
2. **Features** - Bullet list of key features
3. **Tech Stack** - List all technologies used with brief descriptions
4. **Prerequisites** - What needs to be installed
5. **Installation** - Step-by-step setup instructions
6. **Environment Variables** - List all required env vars with descriptions
7. **Running the Project** - Commands to run dev, build, start
8. **Project Structure** - Overview of folder structure
9. **API Documentation** - If applicable, list main endpoints
10. **Deployment** - Brief deployment guide
11. **Contributing** - How to contribute
12. **License** - License information

Use proper Markdown formatting. Be detailed but concise. Include code blocks for commands.`,

  "root-layout": `Generate a production-ready root layout component (layout.tsx) for Next.js App Router.

Requirements:
- Import and configure fonts (use next/font/google)
- Include metadata export with proper SEO
- Setup theme provider if applicable
- Include authentication provider if using Clerk
- Add proper TypeScript types
- Include global styles import
- Add proper HTML structure with lang attribute
- Include viewport meta tags
- Make it clean and well-organized

Generate ONLY the TypeScript/React code, no markdown formatting.`,

  "home-page": `Generate a modern, attractive home page component (page.tsx) for Next.js App Router.

Requirements:
- Create a hero section with compelling copy
- Add feature highlights (3-4 key features)
- Include call-to-action buttons
- Use Tailwind CSS for styling
- Make it responsive (mobile-first)
- Add proper TypeScript types
- Include loading states if needed
- Make it visually appealing with gradients/shadows
- Add proper semantic HTML
- Include accessibility attributes

Generate ONLY the TypeScript/React code, no markdown formatting.`,

  "database-client": `Generate a database client utility file for connecting to the database.

Requirements:
- Create singleton database client
- Include connection pooling
- Add error handling
- Include TypeScript types
- Add connection retry logic
- Include environment variable validation
- Add helpful comments
- Make it production-ready
- Include connection status logging
- Add graceful shutdown handling

Generate ONLY the TypeScript code, no markdown formatting.`,

  "prisma-schema": `Generate a Prisma schema file based on the project requirements.

Requirements:
- Define proper data models based on project description
- Include relationships between models
- Add proper field types and constraints
- Include indexes for performance
- Add timestamps (createdAt, updatedAt)
- Use proper naming conventions
- Add comments for clarity
- Include user authentication model if needed
- Make it scalable and maintainable

Generate ONLY the Prisma schema code, no markdown formatting.`,

  "type-definitions": `Generate TypeScript type definitions for the project.

Requirements:
- Define interfaces for main data models
- Include API request/response types
- Add utility types
- Include proper JSDoc comments
- Make types reusable and composable
- Add generic types where appropriate
- Include validation types if needed
- Make it comprehensive but not overwhelming

Generate ONLY the TypeScript code, no markdown formatting.`,

  // ===== REACT VITE PROMPTS =====
  "react-main": `Generate a main.tsx file for React with Vite.

Requirements:
- Import React and ReactDOM
- Import App component
- Import index.css
- Render App in strict mode
- Mount to #root element
- Include proper TypeScript types

Generate ONLY the TypeScript code, no markdown formatting.`,

  "react-app": `Generate a modern App.tsx component for React.

Requirements:
- Create an attractive landing page
- Include hero section
- Add feature highlights
- Use Tailwind CSS for styling
- Make it responsive
- Include routing setup if needed
- Add proper TypeScript types

Generate ONLY the TypeScript/React code, no markdown formatting.`,

  // ===== VUE PROMPTS =====
  "vue-main": `Generate a main.ts file for Vue 3.

Requirements:
- Import createApp from vue
- Import App component
- Import router if needed
- Mount the app
- Include proper TypeScript types

Generate ONLY the TypeScript code, no markdown formatting.`,

  "vue-app": `Generate an App.vue component for Vue 3.

Requirements:
- Use Composition API
- Create modern landing page
- Include hero section
- Use Tailwind CSS
- Make it responsive
- Add proper TypeScript types

Generate ONLY the Vue SFC code, no markdown formatting.`,

  // ===== SVELTE PROMPTS =====
  "svelte-page": `Generate a +page.svelte file for SvelteKit.

Requirements:
- Create modern landing page
- Include hero section
- Add feature highlights
- Use Tailwind CSS
- Make it responsive
- Use Svelte syntax

Generate ONLY the Svelte code, no markdown formatting.`,

  // ===== EXPRESS PROMPTS =====
  "express-server": `Generate an Express.js server file (index.ts).

Requirements:
- Import express and necessary middleware
- Setup CORS
- Setup body parser
- Import routes
- Setup error handling
- Include environment variables
- Add proper TypeScript types
- Include server startup logic
- Add health check endpoint

Generate ONLY the TypeScript code, no markdown formatting.`,

  "express-routes": `Generate Express.js routes file.

Requirements:
- Create router instance
- Define RESTful routes (GET, POST, PUT, DELETE)
- Include route handlers
- Add input validation
- Include error handling
- Add proper TypeScript types
- Include comments

Generate ONLY the TypeScript code, no markdown formatting.`,

  "express-auth-middleware": `Generate Express.js authentication middleware.

Requirements:
- Create auth middleware function
- Verify JWT tokens or session
- Handle unauthorized access
- Add proper TypeScript types
- Include error handling
- Add helpful comments

Generate ONLY the TypeScript code, no markdown formatting.`,

  "express-controllers": `Generate Express.js controllers.

Requirements:
- Create controller functions
- Handle CRUD operations
- Include error handling
- Add input validation
- Use async/await
- Add proper TypeScript types
- Include comments

Generate ONLY the TypeScript code, no markdown formatting.`,

  // ===== FASTIFY PROMPTS =====
  "fastify-server": `Generate a Fastify server file.

Requirements:
- Import Fastify
- Setup CORS plugin
- Register routes
- Setup error handling
- Include environment variables
- Add proper TypeScript types
- Include server startup logic

Generate ONLY the TypeScript code, no markdown formatting.`,

  "fastify-routes": `Generate Fastify routes file.

Requirements:
- Create Fastify plugin
- Define RESTful routes
- Include route handlers
- Add schema validation
- Include error handling
- Add proper TypeScript types

Generate ONLY the TypeScript code, no markdown formatting.`,

  // ===== NESTJS PROMPTS =====
  "nestjs-main": `Generate a NestJS main.ts file.

Requirements:
- Import NestFactory
- Import AppModule
- Create application instance
- Enable CORS
- Setup global pipes
- Start server
- Add proper TypeScript types

Generate ONLY the TypeScript code, no markdown formatting.`,

  "nestjs-module": `Generate a NestJS app.module.ts file.

Requirements:
- Import Module decorator
- Import necessary modules
- Setup module configuration
- Include controllers
- Include providers
- Add proper TypeScript types

Generate ONLY the TypeScript code, no markdown formatting.`,

  // ===== DJANGO PROMPTS =====
  "django-manage": `Generate a Django manage.py file.

Requirements:
- Standard Django manage.py structure
- Include proper imports
- Setup environment
- Execute from command line

Generate ONLY the Python code, no markdown formatting.`,

  "django-settings": `Generate Django settings.py file.

Requirements:
- Include all necessary settings
- Setup database configuration
- Configure middleware
- Setup static files
- Include security settings
- Add CORS configuration
- Use environment variables

Generate ONLY the Python code, no markdown formatting.`,

  // ===== FLASK PROMPTS =====
  "flask-app": `Generate a Flask app.py file.

Requirements:
- Import Flask and necessary extensions
- Create Flask app instance
- Setup CORS
- Configure database
- Import routes
- Include error handlers
- Add environment variables
- Include app startup logic

Generate ONLY the Python code, no markdown formatting.`,

  "flask-routes": `Generate Flask routes file.

Requirements:
- Import Flask Blueprint
- Define RESTful routes
- Include route handlers
- Add input validation
- Include error handling
- Use proper decorators

Generate ONLY the Python code, no markdown formatting.`,

  // ===== DATABASE PROMPTS =====
  "mongodb-client": `Generate MongoDB client utility file.

Requirements:
- Import mongoose
- Create connection function
- Include connection pooling
- Add error handling
- Include TypeScript types
- Add connection retry logic
- Include environment variable validation

Generate ONLY the TypeScript code, no markdown formatting.`,

  "mongoose-models": `Generate Mongoose models based on project requirements.

Requirements:
- Define schemas for main data models
- Include proper field types
- Add validation rules
- Include timestamps
- Add indexes
- Use proper naming conventions
- Include TypeScript types

Generate ONLY the TypeScript code, no markdown formatting.`,

  "mysql-client": `Generate MySQL client utility file.

Requirements:
- Import mysql2 or appropriate library
- Create connection pool
- Include error handling
- Add TypeScript types
- Include connection retry logic
- Add query helper functions

Generate ONLY the TypeScript code, no markdown formatting.`,

  // ===== AUTH PROMPTS =====
  "auth0-setup": `Generate Auth0 setup file.

Requirements:
- Import Auth0 SDK
- Configure Auth0 client
- Create authentication helpers
- Include login/logout functions
- Add token management
- Include TypeScript types
- Add error handling

Generate ONLY the TypeScript code, no markdown formatting.`,

  "firebase-setup": `Generate Firebase setup file.

Requirements:
- Import Firebase SDK
- Initialize Firebase app
- Setup Firebase Auth
- Create authentication helpers
- Include login/logout functions
- Add TypeScript types
- Include error handling

Generate ONLY the TypeScript code, no markdown formatting.`,
};
