import Link from "next/link";
import Card from "react-bootstrap/Card";
import styles from "./TutorRequestCard.module.css";

export default function TutorRequestCard(props) {
  return (
    <Card className={styles.requestCard}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.body}
        </Card.Text>
        <Link href={"/tutor_request/" + props.id}>
          <Card.Link>Get a better view</Card.Link>
        </Link>
      </Card.Body>
    </Card>
  )
}
