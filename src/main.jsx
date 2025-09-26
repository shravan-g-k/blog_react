import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Home from './pages/Home';
import Protected from './components/Protected';
import Login from './pages/Login';
import AllPosts from './pages/AllPosts';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import Signup from './pages/Signup';
import AddPost from './pages/AddPosts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Protected authenticated={false}>
          <Login />
        </Protected>,
      },
      {
        path: "/signup",
        element: <Protected authenticated={false}>
          <Signup />
        </Protected>,
      },
      {
        path: "/all-posts",
        element: <Protected >
          <AllPosts />
        </Protected>,
      },
      {
        path: "/add-post",
        element: <Protected authenticated>
          <AddPost />
        </Protected>,
      },
      {
        path: "/edit-post/:slug",
        element: <Protected authenticated>
          <EditPost />
        </Protected>,
      },
      {
        path: "/post/:slug",
        element: <Protected authenticated>
          <Post />
        </Protected>,
      },



    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
