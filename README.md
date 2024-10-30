# **Project Overview**

This is a full-stack application designed to help users seamlessly integrate their Google Calendar with a custom-built calendar interface, allowing them to view, create, and manage events. Built with a MERN (MongoDB, Express.js, React, Node.js) stack, the app leverages OAuth 2.0 for Google authentication and integrates the Google Calendar API to fetch and manage calendar events.

---

## **Table of Contents**

- [Demo and Tutorial](#demo-and-tutorial)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## **Demo and Tutorial**

For a complete walkthrough and video tutorial of this project, check out the [Tutorial Link](https://youtu.be/3Y-bAbWuBXQ). Here, you’ll find a detailed explanation of the features and step-by-step instructions for setup, customization, and deployment.

---

## **Features**

- **User Authentication with Google OAuth 2.0**: Secure login system utilizing Google OAuth to allow users to connect their Google accounts.
- **Google Calendar Integration**: Seamlessly fetch, display, and manage Google Calendar events within the application.
- **Event Management**: Create, view, and delete events in your Google Calendar directly from this application.
- **Responsive Design**: Optimized for both desktop and mobile views, ensuring a smooth user experience across devices.
- **Interactive Calendar**: Built-in calendar view with month, week, and day views, along with animations and transitions for enhanced UX.
  
---

## **Project Structure**

```
project-root
├── backend
│   ├── controllers      # Handles request logic and API integration
│   ├── models           # Mongoose models for MongoDB collections
│   ├── routes           # API routes for authentication and events
│   ├── services         # Google Auth service with Passport.js
│   ├── utils            # Error handling and utility functions
│   ├── config           # Passport and app configurations
├── frontend
│   ├── src
│   │   ├── components   # UI components for calendar, forms, etc.
│   │   ├── pages        # Views for home, calendar, and login
│   │   ├── contexts     # Context for authentication state management
│   │   ├── assets       # Static assets and images
│   │   ├── styles       # Global and component-specific CSS
```

---

## **Setup and Installation**

### **Prerequisites**

1. **Node.js** (v14 or later)
2. **MongoDB** (local or cloud instance)
3. **Google Cloud Project**: Set up a project on Google Cloud Console to enable Google OAuth and Calendar API.

### **Environment Variables**

To ensure secure handling of sensitive information, create a `.env` file in the backend directory to store environment variables. Required variables include:

```plaintext
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret
PORT=5000
..and other required Environment Variables
```

> **Note**: Do not share this file or commit it to version control for security reasons.

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Development Servers**:

   - **Backend**:
     ```bash
     cd ../backend
     npm run dev
     ```

   - **Frontend**:
     ```bash
     cd ../frontend
     npm run dev
     ```

   The application should now be accessible at `http://localhost:3000`.

---

## **Usage**

1. **Login with Google**:
   - Navigate to the homepage and click "Sign in with Google." This will redirect to Google's OAuth consent screen.
   - After successful login, you’ll be redirected to the calendar view within the application.

2. **View Events**:
   - Your Google Calendar events will be displayed on the calendar view. You can switch between month, week, and day views for convenience.

3. **Create Events**:
   - Use the "Create Event" button to schedule new events directly on your Google Calendar.
   - Fill in the event name, date, time, and duration, and submit the form to add the event.

4. **Delete Events**:
   - Hover over any event to reveal details, and use the delete option to remove events from your Google Calendar.

> **Tutorial**: For a step-by-step usage guide, refer to the [project tutorial](#) for in-depth explanations and demonstrations.

---

## **Technologies Used**

- **Frontend**:
  - **React**: Component-based frontend development.
  - **React Router**: For handling routing and navigation.
  - **React-Big-Calendar**: A customizable calendar component for React.
  - **Axios**: HTTP client for API requests.
  - **Tailwind CSS**: CSS framework for responsive styling.

- **Backend**:
  - **Node.js**: JavaScript runtime.
  - **Express.js**: Backend web application framework.
  - **Mongoose**: ODM for MongoDB.
  - **Passport.js**: Authentication middleware.
  - **Google OAuth**: OAuth 2.0 for secure Google login.
  - **JWT**: JSON Web Tokens for secure user sessions.

---

## **Folder Structure**

This project follows a well-organized folder structure, making it easy to locate and manage different components.

- **backend/config**: Configuration files (e.g., Passport and app settings).
- **backend/controllers**: API request handling and business logic.
- **backend/models**: MongoDB models and schemas.
- **backend/routes**: API route definitions for authentication and events.
- **backend/services**: Third-party API integrations (Google OAuth).
- **frontend/src/components**: Reusable UI components (Navbar, CalendarView, etc.).
- **frontend/src/pages**: Page views for homepage, calendar, and others.
- **frontend/src/contexts**: Context providers for authentication state.
- **frontend/src/assets**: Static assets (images, icons, etc.).
- **frontend/src/styles**: Styling files for global and component-specific CSS.

---

## **Contributing**

Contributions are welcome! If you'd like to add new features, fix bugs, or improve the codebase, please follow these steps:

1. **Fork the repository**.
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Commit your changes**: `git commit -m "Add new feature"`
4. **Push to the branch**: `git push origin feature/new-feature`
5. **Create a Pull Request**.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

> **Tutorial Link**: A comprehensive tutorial and walkthrough for this project can be found [here](https://youtu.be/3Y-bAbWuBXQ). This tutorial covers setup, configuration, and usage in detail, along with best practices for managing the Google Calendar API.

