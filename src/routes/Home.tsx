import { auth } from "../firebase";

export default function Home() {
  const logOut = () => auth.signOut();
  return (
    <h1>
      Home <button onClick={logOut}>LogOut</button>
    </h1>
  );
}
