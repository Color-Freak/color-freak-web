import { ReactNode } from 'react';
import { AdminNav } from './AdminNav'; 

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <AdminNav />
            <main>
                {children}
            </main>
        </div>
    );
}