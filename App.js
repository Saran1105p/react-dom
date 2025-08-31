import React from 'react';
import {
  createHashRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  NavLink
} from "react-router-dom";

// --- Helper Components ---

// A simple card component for consistent styling
const Card = ({ children, title }) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-t-4 border-indigo-500">
    <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        {title}
      </span>
    </h1>
    <div className="text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

// --- Page Components ---

// 1. Home Page Component
const HomePage = () => (
  <Card title="Welcome Home!">
    <p>This is the main landing page of our application.</p>
    <p>
      Client-side routing, powered by React Router, lets you navigate between different
      components without the browser needing to request a new HTML page from the server.
      This makes the user experience incredibly fast and smooth, just like a native desktop or mobile app.
    </p>
    <p>Click on the links in the navigation bar above to see it in action!</p>
  </Card>
);

// 2. About Page Component
const AboutPage = () => (
  <Card title="About Us">
    <p>We are a passionate team of developers dedicated to creating amazing web experiences.</p>
    <p>This example demonstrates the fundamental concepts of `react-router-dom`, including:</p>
    <ul className="list-disc list-inside space-y-2 marker:text-indigo-500">
      <li><code className="bg-indigo-100 text-indigo-800 font-mono p-1 rounded-md">createHashRouter</code>: To define the application's routes for compatibility.</li>
      <li><code className="bg-indigo-100 text-indigo-800 font-mono p-1 rounded-md">RouterProvider</code>: To make the router available to the entire app.</li>
      <li><code className="bg-indigo-100 text-indigo-800 font-mono p-1 rounded-md">Link / NavLink</code>: To create navigation links.</li>
      <li><code className="bg-indigo-100 text-indigo-800 font-mono p-1 rounded-md">Outlet</code>: To render the content of the currently active route.</li>
    </ul>
  </Card>
);

// 3. Contact Page Component
const ContactPage = () => (
  <Card title="Contact Us">
    <p>Have questions? We'd love to hear from you.</p>
    <form className="mt-4 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm" />
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105">
          Send Message
        </button>
      </div>
    </form>
  </Card>
);

// 4. Not Found Page Component (for invalid URLs)
const NotFoundPage = () => (
  <Card title="404 - Page Not Found">
    <p>Oops! The page you're looking for doesn't exist.</p>
    <p>
       You can return to the homepage by clicking the link below.
    </p>
    <div className="mt-6 text-center">
       <Link to="/" className="inline-block px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Go to Homepage
       </Link>
    </div>
  </Card>
);


// --- Layout Component ---
// This component defines the shared structure of your app, like the navigation bar.
// The <Outlet /> component will render the specific page component for the current route.
const AppLayout = () => {
  // `NavLink` is a special version of `Link` that knows whether or not it is "active".
  // This is useful for styling the currently selected link.
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? 'text-white font-bold bg-black bg-opacity-20 px-3 py-2 rounded-md'
      : 'text-indigo-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md';
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <ul className="flex justify-center space-x-6 text-lg">
            <li><NavLink to="/" className={getNavLinkClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={getNavLinkClass}>About</NavLink></li>
            <li><NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* The magic happens here! The correct page component will be rendered inside the Outlet */}
        <Outlet />
      </main>
    </div>
  );
};


// --- Router Configuration ---
// Here we define all the possible routes for our application.
const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />, // The AppLayout is the parent for all these routes
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        // This is the catch-all route for any URL that doesn't match the ones above.
        path: "*",
        element: <NotFoundPage />,
      }
    ],
  },
]);


// --- Main App Component ---
// This is the root component of your application.
// It uses the RouterProvider to make the routing configuration available to the rest of the app.
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;


