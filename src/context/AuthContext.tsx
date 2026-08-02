
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const ensureUserProfile = async (u: User) => {
  const ref = doc(db, 'users', u.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: u.email,
      displayName: u.displayName || '',
      phone: '',
      createdAt: serverTimestamp(),
    });
  }
};
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (u) => {
    setUser(u);
    setLoading(false);
    if (u) {
      try {
        await ensureUserProfile(u);
      } catch (err) {
        console.error('Profile check failed:', err);
      }
    }
  });
  return unsubscribe;
}, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
 const signup = async (email: string, password: string) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  try {
    await ensureUserProfile(cred.user);
  } catch (err) {
    console.error('Profile creation failed, will retry on next auth check:', err);
  }
};
 const loginWithGoogle = async () => {
    return await signInWithPopup(auth, new GoogleAuthProvider());
  };
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}