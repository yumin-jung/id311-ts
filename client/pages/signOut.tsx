import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SignOut() {
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem('isUser', JSON.stringify(false))
        router.push('/');
    }, []);
}