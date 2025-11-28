"use client"; // Ensure it's a Client Component

import { auth } from "@/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import React, { useState, useEffect } from "react";

function Authentication({ children }) {
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure component is mounted on the client before running authentication
  useEffect(() => {
    setIsClient(true);
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("Redirect Sign-in Successful:", result.user);
        }
      })
      .catch((error) => {
        if (error.code !== "auth/popup-closed-by-user") {
          console.error("Redirect Authentication Error:", error);
        }
      });
  }, []);

  const onSignInClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (window.innerWidth <= 768) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("User closed the sign-in popup.");
      } else {
        console.error("Authentication Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering on the server to avoid hydration issues
  if (!isClient) return null;

  return (
    <div
      onClick={onSignInClick}
      className={`cursor-pointer ${loading ? "opacity-50 pointer-events-none" : ""}`}
    >
      {children}
    </div>
  );
}

export default Authentication;
