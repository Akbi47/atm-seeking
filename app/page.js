'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session, router]);

  return (
    <div>
      {session?.user ? (
        <h1>Welcome to the Home</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
