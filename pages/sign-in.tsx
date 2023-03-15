import { Loading } from '@/components/loading';
import { SuspenseWithPerf, useAuth, useSigninCheck } from 'reactfire';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { RedirectToHome } from '@/components/redirect-to-home';
import { AuthWrapper } from '@/components/auth-wrapper';

const googleAuthProvider = new GoogleAuthProvider();

type SignInState = undefined | 'auth/user-not-found' | 'auth/wrong-password';

export function Signin() {
  const auth = useAuth();
  const [signInState, setSignInState] = useState<SignInState>();

  function handleFormSubmit(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        // if (password.includes('typo')) debugger;
        if (err?.code) setSignInState(err?.code)
      })
  }

  return (
    <main>
      <h1>Sign in</h1>
      <section>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" required /><br /><br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required /><br /><br />
          <button type="submit">Login</button>
        </form>
      </section>
      <section>
        <button onClick={() => signInWithPopup(auth, googleAuthProvider)}>Sign in with Google</button>
      </section>
      {signInState && (
        <section>
          <dialog open>
            <p>Invalid email or password</p>
          </dialog>
        </section>
      )}
    </main>
  );
}

export default function Login() {
  return (
    <SuspenseWithPerf traceId={'firebase-user-wait'} fallback={<Loading />}>
      <AuthWrapper fallback={<Signin />}>
        <RedirectToHome />
      </AuthWrapper>
    </SuspenseWithPerf>
  );
};