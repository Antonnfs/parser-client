import { create } from "zustand";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
   Unsubscribe,
} from "firebase/auth";
import { auth } from "../firebase";

export interface StateUser {
   uid: string;
   email: string;
}

export interface UserStore {
   user: StateUser | null;
   loading: boolean;
   error: string;
   signUp: (email: string, password: string) => Promise<void>;
   signIn: (email: string, password: string) => Promise<void>;
   authListener: () => Unsubscribe;
   signOut: () => Promise<void>;
   googleSignIn: () => Promise<void>;
}

export const useUser = create<UserStore>((set, getState) => ({
   user: null,
   loading: false,
   error: "",
   signUp: async (email, password) => {
      set({ loading: true, error: "" });
      try {
         const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );
         const { uid } = credential?.user;
         set({ user: { uid, email }, loading: false });
      } catch (error: any) {
         set({
            error: error?.message || "SignUp error",
            loading: false,
         });
      }
   },
   signIn: async (email, password) => {
      set({ loading: true, error: "" });
      try {
         const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
         );
         const { uid } = credential?.user;
         set({ user: { uid, email }, loading: false });
      } catch (error: any) {
         set({
            error: error?.message || "SignIn error",
            loading: false,
         });
      }
   },
   signOut: async () => {
      set({ loading: true, error: "" });
      try {
         await signOut(auth);
         set({ user: null, loading: false });
      } catch (error: any) {
         set({
            error: error?.message || "SignOut error",
            loading: false,
         });
      }
   },
   authListener: () => {
      const signOut = getState().signOut;
      return onAuthStateChanged(auth, async (user) => {
         if (user) {
            const email = user?.email!;
            const uid = user?.uid!;
            set({ user: { uid, email } });
         } else signOut();
      });
   },
   googleSignIn: async () => {},
}));
