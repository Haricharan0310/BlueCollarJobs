import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import "./App.css";
import CreatePost from "./CreatePost";
import Home from "./Home";
import About from "./About";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { FirebaseAuthContext } from "./firebase-auth-context";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, reload user profile to get the photoURL
        user.reload().then(() => {
          setUserProfile(user);
          setIsAuth(true);
        });
      } else {
        // User is signed out
        setIsAuth(false);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      setUserProfile(null);
      window.location.pathname = "/login";
    });
  };

  const authContextValue = {
    user: userProfile,
    signIn: () => {
      // Your sign-in function implementation
      // e.g., auth.signInWithPopup(provider) or auth.signInWithEmailAndPassword(email, password)
    },
    signOut: () => {
      // Your sign-out function implementation
      // e.g., auth.signOut()
    },
    // Add other authentication-related data or functions as needed
  };

  return (
    <FirebaseAuthContext.Provider value={authContextValue}>
      <Router>
        <div className="app">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              
              <li>
                <Link to="/create-post">Create Post</Link>
              </li>
              <li>
      <Link to="/about">About Us</Link>
    </li>
              <li>
                {!isAuth ? (
                  <Link to="/login"> Login </Link>
                ) : (
                  <>
                    {userProfile && userProfile.photoURL && (
                      <img
                        src={userProfile.photoURL}
                        alt="User"
                        className="user-avatar"
                        style={{
                          borderRadius: "50%",
                          
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    )}
                    <button onClick={signUserOut}> Log Out</button>
                  </>
                )}
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            {/* Add more routes for other pages/components */}
          </Routes>
        </div>
      </Router>
    </FirebaseAuthContext.Provider>
  );
}

export default App;
