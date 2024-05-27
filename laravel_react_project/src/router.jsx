import {createBrowserRouter} from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Users from './views/users.jsx';
import UserForm from './views/UserForm.jsx';
import Articles from './Components/articles/articles.jsx';
import Category from './Components/articles/category.jsx';
import Supplier from './Components/articles/suppliers.jsx';
import NewArticle from './Components/articles/NewArticle.jsx';
import QuantiteEx from './Components/articles/QuantiteEx.jsx';
import NewSupplier from './Components/articles/NewSupplier.jsx'
import NewCategory from './Components/articles/NewCategory.jsx';
import EditCategory from './Components/articles/EditCategory.jsx';
import EditProfile from './Components/articles/EditProfile.jsx';
import UpdateP from './Components/articles/UpdateP.jsx';
const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/users/new",
          element: <UserForm key="userCreate" />,
        },
        {
          path: "/users/:id",
          element: <UserForm key="userUpdate" />,
        },
        {
          path: "/articles",
          element: <Articles />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/suppliers",
          element: <Supplier />,
        },
        {
          path: "/article/new",
          element: <NewArticle />,
        },
        {
          path: "/QuantiteEx",
          element: <QuantiteEx />,
        },
        {
            path:"/supplier/new",
            element:<NewSupplier/>
        },
        {
            path:"/category/new",
            element:<NewCategory/>
        },
        {
            path:"/category/:id",
            element:<EditCategory/>
        },
        {
            path:"/profile",
            element:<EditProfile/>
        },
        {
            path:"/editP",
            element:<UpdateP/>
        }
      ],
    },

    {
      path: "/",
      element: <GuestLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
export default router;
