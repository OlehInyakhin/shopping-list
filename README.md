# Shopping List Application

A modern shopping list application built with React, TypeScript, and Vite. This application allows users to create, manage, and organize their shopping lists with features like categorization, filtering, and real-time search.

## Features

- Add, edit, and delete shopping items
- Categorize items (Fruits, Dairy, Meat, etc.)
- Mark items as purchased
- Filter items by category and purchase status
- Real-time search functionality
- Undo last action
- Responsive design with light/dark mode support

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

2. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Build for production:

   ```bash
   npm run build
   # or
   yarn build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

5. Run unit tests:
   ```bash
   # Run tests once
   npm run test
   # or
   yarn test
   
   # Run tests in watch mode
   npm run test:watch
   # or
   yarn test:watch
   
   # Run tests with UI
   npm run test:ui
   # or
   yarn test:ui
   
   # Run tests with coverage report
   npm run test:coverage
   # or
   yarn test:coverage
   ```

6. Format code with Prettier:
   ```bash
   # Check formatting
   npm run format
   # or
   yarn format
   
   # Fix formatting issues
   npm run format:fix
   # or
   yarn format:fix
   ```

## Architectural Decisions

### Project Structure

The application follows a modular architecture with clear separation of concerns:

- **Components**: UI components organized by feature and reusability

  - `ui/`: Reusable UI components based on Shadcn/UI
  - `shared/`: Shared components like ErrorBoundary
  - `ShoppingList/`: Feature-specific components
  - `Header/` and `Footer/`: Layout components

- **State Management**: Zustand for global state management

  - Persistent storage with localStorage
  - Optimized to prevent unnecessary re-renders

- **Services**: API simulation layer with artificial delays

  - Mimics real-world API behavior
  - Handles data persistence

- **Hooks**: Custom hooks for reusable logic

  - `useShoppingList`: Shopping list management
  - `useFilter`: Filtering functionality
  - `useLocalStorage`: Local storage interaction
  - `useDebounce`: Performance optimization for search

- **Types**: TypeScript interfaces and type definitions

### Technology Choices

- **React + TypeScript**: For type safety and better developer experience
- **Vite**: Fast development server and optimized builds
- **Zustand**: Lightweight state management with minimal boilerplate
- **React Hook Form + Zod**: Form handling with schema validation
- **Tailwind CSS + Shadcn/UI**: Utility-first CSS with customizable components
- **ErrorBoundary**: Graceful error handling to prevent app crashes

## Potential Improvements

### Features

- Add a sorting feature for items
- Implement user authentication and cloud synchronization
- Add drag-and-drop functionality for reordering items
- Implement sharing functionality for collaborative shopping lists
- Add a settings page for customization
- Add a shopping history feature
- Implement push notifications for reminders

### Technical Improvements

- Add comprehensive test coverage with Vitest and React Testing Library
- Add analytics to track user behavior and feature usage
- Implement accessibility improvements (ARIA attributes, keyboard navigation)
- Add internationalization (i18n) support for multiple languages
