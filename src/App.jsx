import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const isAuthenticated = () => {
  return localStorage.getItem("stored_user") !== null; 
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;