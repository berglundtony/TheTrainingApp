"use client";

import { useState } from 'react';
import styles from './createuser.module.css';
import { createClient } from 'src/app/utils/supabase/client';

export default function CreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient()

    const handleUser = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Trying to sign up with", email, password);
        setMessage(null);
        setError(null);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            setMessage("User created successfully! Please check your email to confirm.");
            console.log("Signup response:", { data, error });
        }
        catch (err: unknown) {
            console.error("Signup error:", err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error");
            }
        }
    }

    return (
        <div className={styles.formWrapper}>
            <h1>Create a new user</h1>
            <form className={styles.form} onSubmit={handleUser}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input type="text"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.loginBtn}>
                        Create user
                    </button>
                </div>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}