import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.authorization);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const ProtectedAdminRoute = ({ children }) => {
  const { user, appLoading } = useSelector((state) => state.authorization);

  if (appLoading == true) {
    return <>Loading</>;
  }

  if (user && user.role == "admin") {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};

export const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.authorization);

  if (user) {
    return <Navigate to="/" />
  }

  return <>{children}</>;
};
