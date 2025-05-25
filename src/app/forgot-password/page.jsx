import ForgotForm from "../components/forgot-form/ForgotForm";
import styles from "./page.module.css";

export default function ForgotPassword() {
  return (
    <main id={styles.forgotPassword}>
      <ForgotForm />
    </main>
  );
}
