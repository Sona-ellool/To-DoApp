# To-Do List App

A modern, feature-rich task management application built with React, Material-UI, and Firebase.

## Features

- 🌓 Light/Dark mode support
- 🌐 Multilingual support (English, Arabic, French)
- 📱 Responsive design
- 🔄 Real-time updates with Firebase
- 📂 Category-based task organization
- 🔍 Advanced search functionality
- 🔄 Task sorting and filtering
- 📅 Due date tracking with visual indicators
- 💾 Offline support
- ⚡ Performance optimized

## Technology Stack

- React 18
- Material-UI v5
- Firebase v9
- i18next for internationalization
- Framer Motion for animations
- date-fns for date handling
- Vite for build tooling

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Features in Detail

### Task Management
- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Add due dates with visual indicators
- Categorize tasks with custom categories

### Categories
- Create custom categories with colors and icons
- Filter tasks by category
- Visual organization of tasks

### Filtering and Sorting
- Filter tasks by status (All/Active/Completed)
- Sort tasks by:
  - Name
  - Due Date
  - Category
  - Creation Date
  - Status

### Search
- Search across all task fields
- Real-time search results
- Search within categories

### Internationalization
- Support for multiple languages
- RTL layout support for Arabic
- Easy language switching

### Theme
- Light and dark mode support
- Persistent theme preference
- Smooth theme transitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
