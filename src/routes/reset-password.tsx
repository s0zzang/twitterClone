import { FirebaseError } from "firebase/app";
import {
  fetchSignInMethodsForEmail,
  isSignInWithEmailLink,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
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

export default function ResetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") setEmail(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    if (!email) return;

    try {
      sendPasswordResetEmail(auth, email);
      setMessage("비밀번호 변경 이메일이 전송되었습니다.");
    } catch (e) {
      if (e instanceof FirebaseError) {
        // setMessage(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Reset Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          required
        />
        <Input type="submit" value={isLoading ? "Loading ..." : "Send Email"} />
      </Form>
      {message ? <Error>{message}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log In &rarr;</Link>
      </Switcher>
      <GithubBtn />
    </Wrapper>
  );
}
