import { useState, useEffect } from "react";
import TutorRequestCard from '../components/tutor_request/TutorRequestCard'
import styles from '../styles/TutorRequests.module.css'


export default function TutorRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/v1/tutor_requests/")
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
    )
  }
}
