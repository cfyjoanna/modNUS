import { Button } from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";
import React from "react";

function Login() {
    const { signInWithGoogle } = useAuth();

    return(
        <>
            <h1>Login</h1>
            <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                Sign In With Google
            </Button>
        </>
        
    );
}

export default Login;