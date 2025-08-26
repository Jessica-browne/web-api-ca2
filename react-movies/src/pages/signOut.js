import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignOut = (props) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  return context.isAuthenticated ? (
    <p>
      Are you sure you want to sign out, {context.userName}? <button onClick={() => context.signout()}>Sign out</button>
    </p>
  ) : (
    <p>
      You are not logged in{" "}
      <button onClick={() => navigate('/login')}>Login</button>
    </p>
  );
};

export default SignOut;
