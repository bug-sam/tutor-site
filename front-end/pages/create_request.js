import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/TutorRequest.module.css";

export default function Login() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, [])

  const router = useRouter();

  function validateForm() {
    return title.length > 0 && description.length > 0
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          description: description,
          creator: user
        })
    };
    fetch('https://sjt75.pythonanywhere.com/v1/tutor_requests/', requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          router.push("/tutor_requests")
        }
      )
  }

  if (!user) {
    return (
      <p>
        You must
        <Link href="/login">
          <a> login </a>
        </Link>
        before you can use this page.
      </p>
    )
  }

  return (
    <div className={styles.TutorRequest}>
      <Form onSubmit={handleSubmit}>
        <h1>Create a tutor request</h1>
        <Form.Group className={styles.formItem} size="lg" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={styles.formItem} size="lg" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button className={styles.formItem} block size="lg" type="submit" disabled={!validateForm()}>
          Create
        </Button>
      </Form>
    </div>
  );
}