import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "./features/auth/authSlice";
function App() {
  const dispatch = useDispatch();

  const { user, appLoading, isAuthenticated } = useSelector(
    (state) => state.authorization
  );
  console.log(user);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setIsAuthenticated());
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
