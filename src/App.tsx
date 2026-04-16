import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { SchoolList } from './features/schools/SchoolList';
import { ClassList } from './features/classes/ClassList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SchoolList />,
      },
      {
        path: 'schools/:schoolId',
        element: <ClassList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
