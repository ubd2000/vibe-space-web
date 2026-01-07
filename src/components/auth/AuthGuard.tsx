'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/auth.service';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Paths that require login
        const protectedPrefixes = ['/buyer', '/creator', '/admin'];
        const isProtected = protectedPrefixes.some(prefix => pathname.startsWith(prefix));

        if (isProtected) {
            const user = authService.getCurrentUser();
            if (!user) {
                // If not logged in, redirect to login
                // We can save the return url to redirect back after login
                router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
                setAuthorized(false);
            } else {
                setAuthorized(true);
            }
        } else {
            // Not a protected route, allow access
            setAuthorized(true);
        }
    }, [pathname, router]);

    // Simple loading or null while checking
    if (!authorized && ['/buyer', '/creator', '/admin'].some(prefix => pathname.startsWith(prefix))) {
        return null;
    }

    return <>{children}</>;
}
