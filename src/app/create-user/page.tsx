"use client";

import { useState } from 'react';
import styles from './createuser.module.css';
import { supabase } from '@/lib/supabase/supabase';

export default function CreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        console.log("Signup response:", { data, error });
        if (error) {
            setError("User creation failed: " + error.message);

        } else {
            setMessage("User created successfully! Please check your email to confirm.");
        }
 
    }

    return (
        <div className={styles.formWrapper}>
            <h1>Create a new user</h1>
            <form className={styles.form} onSubmit={handleUser}>
                <input type="text"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
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