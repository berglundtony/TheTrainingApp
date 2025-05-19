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
  
