import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

function ProtectedRoute({ component: Component, role, props }) {
  const location = useLocation();
  const { loggedInUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loggedInUser.user._id) {
    if (role && loggedInUser.user.role !== role) {
      return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }
    return <Component props={props} />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
}

export default ProtectedRoute;
