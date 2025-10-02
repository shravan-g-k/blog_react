import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../backend/auth/auth";
import { login } from "../store/authSlice";
function Protected({ children, authenticated = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      
      const currentUser =  await authService.getCurrentUser().then((user) => {
        return user;
      });
      if (currentUser) {
        dispatch(login({ userData: currentUser }));
      }
      
      if (authenticated && authStatus !== authenticated) {
        navigate("/login");
      } else if (!authenticated && authStatus !== authenticated) {
        navigate("/");
      }
      setIsLoading(false);
    };
    load();
  }, [authStatus, authenticated, navigate]);
  return <div>{isLoading ? <div>Loading...</div> : children}</div>;
}

export default Protected;
