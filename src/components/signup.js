import { auth } from "../fireBase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [show, setShow] = useState("");
  const nav = useNavigate();

  const signUp = async () => {
    if (password !== password2) {
      setShow("Both password fields must be identical");
      return;
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Successful sign-in
          const user = userCredential.user;
          nav("/Home");
          console.log("Successful sign-in:", user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            setShow("The password is too short!");
          } else {
            setShow(errorMessage);
          }
        });
    }
  };
  return (
    <div className={"background2"} style={{ verticalAlign: "middle",textAlign: "center", marginTop: "10%"}}>
      <h1>Welcome to Book Manager!</h1>
      <p>
        Here in Book Manager you can to add, search, update and delete all the
        books you wish in your own personal virtual library. Create an account
        and manage your books right now, please sign up!
      </p>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <p> </p>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p> </p>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword2(e.target.value)}
      />
      <p> </p>
      <button onClick={signUp}> Sign Up</button>
      {show ? (
        <>
          <p> </p>
          <b>{show}</b>
        </>
      ) : (
        <p> </p>
      )}
      <p> </p>
      <p>If you already have an account, please sign in!</p>
      <button>
        <Link to={"/"}>Sign In</Link>
      </button>
    </div>
  );
}
