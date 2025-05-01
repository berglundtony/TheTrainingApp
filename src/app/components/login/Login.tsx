"use client";

import { LoginProps } from '@/lib/interfaces';
import styles from './login.module.css';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/supabase';

export default function Login({ onLoginSuccess}: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            // setError('Login failed. Please check your credentials.');
            // return;
            setError("Login failed. Please check your credentials.");
            setLoading(false);
            console.error("Login failed:", error.message);
        } else { 
            setError(null);
            console.log("Login succeeded", data);
            onLoginSuccess();
            console.log("Login succeeded, calling onLoginSuccess");
        }
    }
    return (
        <div className={styles.formWrapper}>
            <h1>Login</h1>
            <p>Please log in to access your training program.</p>
            <form className={styles.form} onSubmit={handleLogin}>
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
                    <label className={styles.rememberMe}>Remember me
                        <input type="checkbox" name="remember" id="remember" />
                    </label>
                    <button type="submit" disabled={loading}>
                       Login
                    </button>
                </div>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    );
}