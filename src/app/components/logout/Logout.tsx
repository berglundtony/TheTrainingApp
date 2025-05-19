import { createClient } from "src/app/utils/supabase/client"; 
import { useRouter } from "next/navigation";
import styles from "./logout.module.css"; 

export default function Logout() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut(); 
        router.push("/login"); 
    };

    return (
        <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
        </button>
    );
}
