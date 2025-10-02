# Blog Site (React + Vite)

A modern blog application built with React and Vite. Features include:

- User authentication
- Create, edit, and view blog posts
- Rich text editor for writing posts
- Appwrite backend integration for database and storage

## Project Structure

- `src/components/` — Reusable UI components
- `src/pages/` — Main application pages (Home, AllPosts, AddPosts, EditPost, Post, Login, SignUp)
- `src/backend/` — Appwrite authentication and database logic
- `src/config/` — Configuration for environment variables
- `src/store/` — Redux store and slices for state management

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your `.env` file with Appwrite credentials and TinyMCE API key.
3. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React
- Vite
- Appwrite
- Redux
- TinyMCE (Rich Text Editor)

---

Feel free to customize and extend the project for your own blogging needs!
