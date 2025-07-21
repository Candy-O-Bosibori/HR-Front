import { useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from 'jwt-decode';

const AuthWrapper = ({ children, role, Sidebar }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const decodedToken = token ? jwtDecode(token) : null;
  const userRole = decodedToken && decodedToken.sub ? decodedToken.sub.role : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && role) {
        navigate("/signin");
    }
    if (isAuthenticated && role && role !== userRole) {
        navigate("/signin");
    }
  }, [isAuthenticated, navigate, role, userRole]);

  return (
    <div>
      {Sidebar && <Sidebar />}
      {children}
    </div>
  );
};

export default AuthWrapper;