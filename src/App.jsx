import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "./features/auth/authSlice";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();

  const { user, appLoading, isAuthenticated } = useSelector(
    (state) => state.authorization
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setIsAuthenticated());
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <ToastContainer />
    </>
  );
}

export default App;
