import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

  function validateForm() {
    return (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      passwordsMatch()
    );
  }

  function passwordsMatch() {
    return password == passwordConfirm;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email
        })
    };
    fetch('http://sjt75.pythonanywhere.com/v1/users/', requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          localStorage.setItem('user', username);
          location.replace("/");
        }
      )
  }

  return (
    <div className={styles.Login}>
      <Form onSubmit={handleSubmit}>
        <h1>Create an account</h1>
        <Form.Group className={styles.formItem} size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={styles.formItem} size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={styles.formItem} size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={styles.formItem} size="lg" controlId="password_confirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <p>{passwordsMatch() ? "" : "passwords must match"}</p>
        </Form.Group>
        <Button className={styles.formItem} block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <p className={styles.formItem}>
          Already have an account?
          <Link href="/login">
            <a> Login now!</a>
          </Link>
        </p>
      </Form>
    </div>
  );
}