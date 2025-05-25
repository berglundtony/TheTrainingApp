"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { forgotPassword } from "@/utils/api-client";
import { isApiError } from "@/utils/type-guards";
import { successForgotPasswordSent } from "@/constants";

import styles from "./page.module.css";

export default function ForgotForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailsent, setEmailsent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const result = await forgotPassword(email);

    if (isApiError(result)) {
      setErrorMessage(result.message || unexpectedError);
    } else {
      setEmailsent(true);
      setErrorMessage(successForgotPasswordSent);
    }
  };

  return (
    <>
      <button
        className={styles.backBtn}
        onClick={() => router.push("/login")}
      ></button>
      <div className={styles.contentContainer}>
        {/* {errorMessage && <p className=".error">{errorMessage}</p>} */}
        {!emailsent && <div className={styles.iconDiv}></div>}
        {emailsent && <div className={styles.iconDiv2}></div>}
        {!emailsent ? (
          <>
            <h1 className={styles.header}>Glömt lösenord?</h1>
            <div className={styles.textDiv}>
              Ange e-postadressen du använde för att registrera dig och vi
              skickar en länk för att återställa ditt lösenord
            </div>
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
              <label htmlFor="email" className={styles.label}>
                E-post
              </label>
              <div className={styles.inputGroup}>
                <input
                  id="email"
                  name="email"
                  className={styles.input}
                  type="email"
                  required
                  placeholder="email@email.com"
                  aria-label="email"
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>
                  Skicka Länk
                </button>
              </div>
              <div className={styles.buttons}>
                <Link href="/login" className="button">
                  Logga in
                </Link>
                <Link href="/signup">Skapa konto</Link>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className={styles.textDiv}>Skickat till E-post"</h1>
            <div className={styles.textDiv}>
              Vi har skickat en länk till din e-postadress. Klicka på länken i
              e-postmeddelandet för att återställa ditt lösenord.
            </div>
            <br />
            <div className="input-container">
              <div className={styles.buttons}>
                <Link href="/login" className="button">
                  Login
                </Link>
                <Link href="/signup">Skapa konto</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
