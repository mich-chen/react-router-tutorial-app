import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Root, { 
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import ErrorPage from './error-page';
import Contact, {
  loader as contactLoader,
} from './routes/contact';
import EditContact, {
  action as editAction,
} from './routes/edit';
import { 
  DestroyError,
  action as destroyAction 
} from './routes/destroy';
import Index from './routes/index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true, // tells router when user at parent route's exact path, no other children to render in <Outlet />
        element: <Index /> // like a landing page child component
      },
      {
        path: "contacts/:contactId", // dynamic URL param that can be accessed with params.contactId
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path:"contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <DestroyError />,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
