import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/User.module.css'

export default function User() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const { uid } = router.query;
    if (uid) {
      fetch("http://sjt75.pythonanywhere.com/v1/users/" + uid + "/")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            result.loggedIn = localStorage.getItem('user') == result.username;
            setUser(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [router]);

  function handleSubmit() {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    fetch('http://sjt75.pythonanywhere.com/v1/users/' + user.username + "/", requestOptions)
        .then(res => res.json())
        .then(data => setEditing(false));
  }

  function setUsername(username) {
    setUser({
      username: username,
      bio: user.bio,
      email: user.email,
      loggedIn: user.loggedIn
    })
  }
  function setBio(bio) {
    setUser({
      username: user.username,
      bio: bio,
      email: user.email,
      loggedIn: user.loggedIn
    })
  }
  function setEmail(email) {
    setUser({
      username: user.username,
      bio: user.bio,
      email: email,
      loggedIn: user.loggedIn
    })
  }

  var editButton = (
    <Button className={styles.formItem} block size="lg" onClick={() => setEditing(true)}>
      Edit
    </Button>
  )

  var submitButton = (
    <Button className={styles.formItem} block size="lg" onClick={() => handleSubmit()}>
      Save
    </Button>
  )

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={styles.User}>
        <Form onSubmit={handleSubmit}>
          <h1>User Page</h1>
          <Form.Group className={styles.formItem} size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              plaintext={true}
              readOnly={true}
              value={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formItem} size="lg" controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              plaintext={!editing}
              readOnly={!editing}
              value={user.bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formItem} size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              plaintext={!editing}
              readOnly={!editing}
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          {user.loggedIn ? editButton : ""}
          {editing ? submitButton : ""}
        </Form>
      </div>
    )
  }
}