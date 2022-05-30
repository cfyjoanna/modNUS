import { Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import React from "react";

function Login() {
  const { signInWithGoogle } = useAuth();

  return(
    <>
      <div className="login-wrapper">
        <h1>Login</h1>
          <Button variant="contained" color="primary" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
      </div>
    </>    
  );
}

export default Login;