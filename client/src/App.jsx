import { Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ADDTASK_ROUTE, ADMIN_ROUTE, AUTH_ROUTE, IN_TASKS, MAIN_ROUTE, PROFILE_ROUTE, TASK_ROUTE, USER_TASKS } from './utils/consts'
import MainPage from './MainPage'
import Auth from './pages/Auth'
import Tasks from './pages/Tasks'
import AddTask from './pages/AddTask'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import AboutUser from './components/AboutUser'
import UserTasks from './components/UserTasks'
import InTasks from './components/InTasks'
import AdminTasks from './pages/AdminTasks'


const router = createBrowserRouter([
  {
    path: MAIN_ROUTE,
    element: <MainPage />,
    children: [
        {
            path: AUTH_ROUTE,
            element: <Auth />
        },
        {
            path: MAIN_ROUTE,
            element: <Auth />
        },
        {
            path: PROFILE_ROUTE,
            element: <Navigate to={MAIN_ROUTE} />
        },
        {
          path: TASK_ROUTE,
          element: <Navigate to={MAIN_ROUTE} />
        },
        {
          path: ADDTASK_ROUTE,
          element: <Navigate to={MAIN_ROUTE} />
        },
        {
            path: ADMIN_ROUTE,
            element: <Navigate to={MAIN_ROUTE} />
        }
      ]
  }
])

const userRoutes = createBrowserRouter ([
    {
        path: MAIN_ROUTE,
        element: <MainPage />,
        children: [
            {
                path: TASK_ROUTE,
                element: <Tasks />
            },
            {
              path: ADDTASK_ROUTE,
              element: <AddTask />
            },
            {
                path: PROFILE_ROUTE,
                element: <Profile />,
                children: [
                    {
                        path: PROFILE_ROUTE,
                        element: <AboutUser />
                    },
                    {
                        path: USER_TASKS,
                        element: <UserTasks />
                    },
                    {
                        path: IN_TASKS,
                        element: <InTasks />
                    }
                ]
            },
            {
                path: MAIN_ROUTE,
                element: <Navigate to={TASK_ROUTE} />
            }
        ]
    }
])

const adminRoutes = createBrowserRouter ([
    {
        path: MAIN_ROUTE,
        element: <MainPage />,
        children: [
            {
                path: MAIN_ROUTE,
                element: <Admin />
            },
            {
                path: ADMIN_ROUTE,
                element: <AdminTasks />
            }
        ]
    }
])

function App() {

    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.role)
  
    console.log(token);
  
  
    return (
      token ? role === "ADMIN" ? <RouterProvider router={adminRoutes} /> : <RouterProvider router={userRoutes} /> :
      <RouterProvider router={router} />
    )
  }
  
  export default App