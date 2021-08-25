import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import TutorRequestCard from '../components/tutor_request/TutorRequestCard'
import styles from '../styles/TutorRequests.module.css'


export default function TutorRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://sjt75.pythonanywhere.com/v1/tutor_requests/")
      .then(res => res.json())
      .then(
        (result) => {
          setRequests(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Link href="/create_request">
          <Button>Create New Request</Button>
        </Link>
        <div className={styles.requests}>
          {requests.map((request) => {
            return (
              <TutorRequestCard
                key={request.id}
                id={request.id}
                title={request.title}
                body={request.description}
              ></TutorRequestCard>
            )
          })}
        </div>
      </>
    )
  }
}
