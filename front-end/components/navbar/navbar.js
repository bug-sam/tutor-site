import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, [])

  const router = useRouter();

  function logout() {
    localStorage.removeItem('user');
    location.replace("/");
  }

  const nonLoggedIn = (
    <li className={styles.navitem}>
      <Link href="/login">
        <a className={styles.navlink}>
          Login
        </a>
      </Link>
    </li>
  )

  const loggedIn = (
    <>
      <li className={styles.navitem}>
        <Link href={"/user/" + user}>
          <a className={styles.navlink}>
            {user}
          </a>
        </Link>
      </li>
      <li className={styles.navitem}>
        <Link href="/tutor_requests" >
          <a className={styles.navlink}>
            Tutor Requests
          </a>
        </Link>
      </li>
      <li className={styles.navitem_right}>
        <a className={styles.navlink} onClick={() => logout()}>
          logout
        </a>
      </li>
    </>
  )

  return (
    <div id="navbar" className={styles.navbar}>
      <ul className={styles.navlist}>
        <li className={styles.navitem}>
          <Link href="/">
            <a className={styles.navlink}>
              FindMyTutor
            </a>
          </Link>
        </li>
        {user ? loggedIn : nonLoggedIn}
      </ul>
    </div>
  );
}