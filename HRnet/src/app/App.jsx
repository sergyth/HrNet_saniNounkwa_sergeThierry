import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EmployeeList from '../pages/EmployeeList'
import CreateEmployee from '../pages/CreateEmployee'
import ErrorPage from '../pages/ErrorPage'
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CreateEmployee />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'employee-list',
      element: <EmployeeList />,
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
