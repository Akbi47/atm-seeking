'use client'
import { ReviewPost } from "@/components"
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";

const review = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname()
  
  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
    else {
      if (pathname==='/review') {
        router.push('/review');
      }
    }
  }, [session, router, pathname]);

  return (
    <>
      {session?.user
        ? (<ReviewPost />)
        :
        (
          <p>Loading...</p>
        )
      }
    </>
  )
}

export default review