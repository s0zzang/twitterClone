import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubBtn from "../components/github-btn";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "password") setPassword(value);
    if (name === "email") setEmail(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log Into X</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          required
        />
        <Input
          onChange={onChange}
          type="password"
          value={password}
          name="password"
          placeholder="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading ..." : "Log In"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
      <Switcher>
        Foggot Your Password?{" "}
        <Link to="/reset-password">Click Here &rarr;</Link>
      </Switcher>
      <GithubBtn />
    </Wrapper>
  );
}
