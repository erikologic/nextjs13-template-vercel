"use client"

import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useUser } from "reactfire";

function AuthWrapper({ children }) {
  const { data: user, status } = useUser();
  const router = useRouter();
  const path = usePathname();

  console.log("App", { user, v: user?.emailVerified, status })
  if (user && user.emailVerified) return router.push('/profile');
  if (user && !user.emailVerified && path !== '/validate-email') return router.push('/validate-email');

  return children;
};

function Loading() {
  return <span>Loading...</span>
}


export default function CheckUser({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </Suspense>
  );
};