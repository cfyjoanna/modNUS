import { app, db } from '../config/firebaseConfig';
import React, { useState, useEffect, useContext, createContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return auth
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return auth
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const details = getAdditionalUserInfo(result);
        if(details.isNewUser) {
          setDoc(doc(db, "users", result.user.uid),
            {coremcs: [0, 0, 0], ues: [0, 0, 0], y1s1: [], y1s1modtypes: [], y1s2: [], y1s2modtypes: [],
              ges: [] })
        }
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInWithGoogle
  };
}