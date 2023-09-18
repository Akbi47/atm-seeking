'use client'
import { Toast } from "@/components"
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";

const base = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname()
  
  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
    else {
      if (pathname==='/base') {
        router.push('/base');
      }
    }
  }, [session, router, pathname]);

  return (
    <>
      {session?.user
        ? (<Toast />)
        :
        (
          <p>Loading...</p>
        )
      }
    </>
  )
}

export default base