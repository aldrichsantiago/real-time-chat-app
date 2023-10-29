import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<GetStarted />} />
      <Route path="home" element={<Home />} />
    </Route>
    
  )
);

function App() {

  return <RouterProvider router={router} />
}

export default App
