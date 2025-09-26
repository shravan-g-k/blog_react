import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Protected({
  children,
  authenticated = true,
}) {

  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authenticated && authStatus !== authenticated) {
      navigate("/login");
    } else if (!authenticated && authStatus !== authenticated) {
      navigate("/");
    }
    setIsLoading(false);
  }, [authStatus, authenticated, navigate]);
  return (
    <div>
      {isLoading ? <div>Loading...</div> : children}
    </div>
  )
}

export default Protected
