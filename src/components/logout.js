import { auth } from "../fireBase/config";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function LogOut() {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={logOut}>
        <Link to={"/"}>Log Out</Link>
      </button>
    </div>
  );
}
