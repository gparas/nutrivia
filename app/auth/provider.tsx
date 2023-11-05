'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth } from '@/firebase/auth';
import db from '@/firebase/db';

type AuthContextType = { user: null | object };

const AuthContext = createContext<AuthContextType>({ user: {} });

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<null | object>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const postUser = async (payload: any) => {
    const docRef = doc(db, 'users', payload.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('User already exists!');
      return;
    }

    await setDoc(doc(db, 'users', payload.uid), {
      uid: payload.uid,
      displayName: payload.displayName,
      email: payload.email,
      emailVerified: payload.emailVerified,
      photoURL: payload.photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        setUser(authUser);
        postUser(authUser).then(() => router.push('/'));
      } else {
        setUser(null);
        router.push('/login');
      }
    });
    setLoadingUser(false);
    return () => {
      unsubscribe();
    };
  }, []);

  if (loadingUser) return 'Loading...';
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
