import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import App from './App.jsx';
import Home from './components/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';
import Resume from './pages/Resume.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Use App as the main layout component
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/projects',
        element: <Projects/>,
      },
      {
        path: '/resume',
        element: <Resume/>,
      },
      {
        path: '/contact',
        element: <Contact/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

console.log('React app rendered successfully!');
