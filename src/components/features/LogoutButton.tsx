import { handleLogout } from '@/actions/authActions';
import styles from '@/app/(blog)/admin/adminNav.module.css';

export function LogoutButton() {
  return (
    <form action={handleLogout}>
      <button type="submit" className={styles.link}>
        Logout
      </button>
    </form>
  );
}