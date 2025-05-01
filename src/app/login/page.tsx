import styles from './login.module.css';

export default function Login() {
    return (
        <div className={styles.formWrapper}>
            <h1>Login</h1>
            <p>Please log in to access your training program.</p>
            <form className={styles.form} action="/api/login" method="POST">
                <input type="text" name="username" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <div className={styles.buttonWrapper}>
                    <label className={styles.rememberMe}>Remember me
                        <input type="checkbox" name="remember" id="remember" />
                    </label>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}