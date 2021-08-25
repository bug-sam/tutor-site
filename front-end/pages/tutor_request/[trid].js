import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/User.module.css'

export default function TutorRequest() {
	const [error, setError] = useState(null);
  const [tutorRequest, setTutorRequest] = useState({});
	const [editing, setEditing] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const { trid } = router.query
    if (trid) {
      fetch("https://sjt75.pythonanywhere.com/v1/tutor_requests/" + trid + "/")
        .then(res => res.json())
        .then(
          (result) => {
            setTutorRequest(result);
            result.loggedIn = localStorage.getItem('user') == result.creator;
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [router])

  function handleSubmit() {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutorRequest)
    };
    fetch('https://sjt75.pythonanywhere.com/v1/tutor_requests/' + tutorRequest.id + "/", requestOptions)
        .then(res => res.json())
        .then(data => setEditing(false));
  }

  function setTitle(title) {
    setTutorRequest({
      id: tutorRequest.id,
      title: title,
      description: tutorRequest.description,
      creator: tutorRequest.creator,
      loggedIn: tutorRequest.loggedIn
    })
  }

  function setDescription(description) {
    setTutorRequest({
      id: tutorRequest.id,
      title: tutorRequest.title,
      description: description,
      creator: tutorRequest.creator,
      loggedIn: tutorRequest.loggedIn
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
	} else{
		return (
      <div className={styles.TutorRequest}>
        <Form onSubmit={handleSubmit}>
          <h1>Tutor Request Page</h1>
          <Form.Group className={styles.formItem} size="lg" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              plaintext={!editing}
              readOnly={!editing}
              value={tutorRequest.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className={styles.formItem} size="lg" controlId="bio">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              plaintext={!editing}
              readOnly={!editing}
              value={tutorRequest.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <p className={styles.formItem}>
            Created by
            <Link href={"/user/" + tutorRequest.creator}>
              <a> {tutorRequest.creator}</a>
            </Link>
          </p>
          {tutorRequest.loggedIn ? editButton : ""}
          {editing ? submitButton : ""}
        </Form>
      </div>
    )
  }
}

