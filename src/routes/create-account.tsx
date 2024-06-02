import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as React from "react";
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
import { auth } from "../firebase";

const errors = {
  "auth/email-already-in-use": "이미 존재하는 이메일 입니다.",
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") setName(value);
    if (name === "password") setPassword(value);
    if (name === "email") setEmail(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      // create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user); // 생성된 사용자의 정보를 알려줌

      // 사용자 이름 설정
      await updateProfile(credentials.user, {
        displayName: name,
      });

      // 홈페이지로 리다이렉팅
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
      <Title>Join X</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="text"
          value={name}
          name="name"
          placeholder="Name"
          required
        />
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
        <Input
          type="submit"
          value={isLoading ? "Loading ..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log In &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
