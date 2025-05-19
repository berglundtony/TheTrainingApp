'use client';

import { useEffect } from 'react';
import Login from '@/src/app/components/login/Login'
import { createClient } from '@/src/app/utils/supabase/client'
// import styles from './page.module.css'
import { useRouter } from 'next/navigation';


export default function LoginRoute() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace('/');
      }
    });
  }, [router, supabase]);


  return <Login onLoginSuccess={() => router.replace('/')} />;
}
// export default function LoginPage() {
//   return (
//     <div className={styles.formWrapper}>
//       <h1>Login</h1>
//       <p className={styles.paragraph}>Please log in to access your training program.</p>
//       <form className={styles.form} action="">
//         <div className={styles.inputGroup}>
//           <label htmlFor="email" className={styles.label}>Email:</label>
//           <input id="email" name="email" type="email" placeholder="Email" required />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor="password" className={styles.label}>Password:</label>
//           <input id="password" name="password" type="password" placeholder="Password" required />
//         </div>
//         <div className={styles.buttonWrapper}>
//           <button formAction={login}>Log in</button>
//           <Link href="/create-user" className={styles.createUserLink}>
//             Create account
//           </Link>
//         </div>
//       </form>
//     </div>
  
