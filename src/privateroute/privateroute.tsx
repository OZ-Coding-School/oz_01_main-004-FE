import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const isToken = !!localStorage.getItem("refresh");
  const currentLocation = useLocation();
  return isToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ redirectedFrom: currentLocation }} />
  );
}
