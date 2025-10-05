import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from '@pages/Home'
import TestRunner from '@pages/TestRunner'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/test/:id', element: <TestRunner /> }
    ]
  }
])

export default router
