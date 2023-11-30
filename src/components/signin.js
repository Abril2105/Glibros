import { auth } from "../fireBase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState("");
  const nav = useNavigate();

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successful sign-in
        const user = userCredential.user;
        nav("/Home");
        console.log("Successful sign-in:", user);
      })
      .catch((error) => {
        // Sign-in error
        console.error("Sign-in error:", error.message);
        setShow("Fail to sign in. Please try again!");
      });
  };
  return (
    <div>
      <h1>Welcome to Book Manager!</h1>
      <p>
        Welcome! Here in Book Manager you can to add, search, update and delete
        books in your own personal virtual library. Manage your books rignt now,
        please sign in!
      </p>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <p> </p>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p> </p>
      <button onClick={signIn}> Sign In</button>
      {show ? (
        <>
          <p> </p>
          <b>{show}</b>
        </>
      ) : (
        <p> </p>
      )}
      <p> </p>
      <p>If you don't have an account yet, please sign up!</p>
      <button>
        <Link to={"/SignUp"}>Sign Up</Link>
      </button>
    </div>
  );
}
