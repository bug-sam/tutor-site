import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: password,
      })
    }
    fetch('http://localhost:8000/v1/users/' + username + "/check/", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.ok) {
            localStorage.setItem('user', username);
            location.replace("/");
          }
          else {
            alert("username or password was incorrect");
          }
        }
      )
  }

  return (
    <div className={styles.Login}>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group className={styles.formItem} size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Button className={styles.formItem} block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <p className={styles.formItem}>
          Don't have an account?
          <Link href="/create_account">
            <a> Create one now!</a>
          </Link>
        </p>
      </Form>
    </div>
  );
}