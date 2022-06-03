import { Navigate, useNavigate } from "react-router-dom";
import { getLoggedUser } from "../http-utils/customer-requests";

export function AuthenticatedRoute({ children }) {
  const navigate = useNavigate();
  const user = getLoggedUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
