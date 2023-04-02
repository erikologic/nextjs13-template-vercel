"use client"

import { useAuth } from 'reactfire';

export default function Signout() {
  const auth = useAuth();
  
  auth.signOut();

  return undefined;
}
