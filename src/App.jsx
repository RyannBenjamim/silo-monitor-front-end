import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const isAuthenticated = () => {
  return localStorage.getItem("stored_user") !== null; 
};

const ProtectedHomeRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

const ProtectedLoginRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/home" replace /> : element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLoginRoute element={<Login />} />,
  },
  {
    path: "/home",
    element: <ProtectedHomeRoute element={<Home />} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;