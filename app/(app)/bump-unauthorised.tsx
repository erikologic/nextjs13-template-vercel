"use client"

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useSigninCheck } from "reactfire";

function AuthWrapper({ children }) {
  const router = useRouter();
  const { data: {user}, status} = useSigninCheck();
  
  console.log ("App", {user, v: user?.emailVerified, status})
  if (!user || !user.emailVerified) return router.push('/sign-in');

  return children;
};

function Loading() { 
  return <span>Loading...</span> 
}


export default function BumpUnauthorised({ children }) {
  return (
    <Suspense fallback={<Loading/>}>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </Suspense>
  );
};