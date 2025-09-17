import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let app: FirebaseApp;

export const getFirebaseApp = () => {
  if (!getApps().length) {
    console.log('initializeApp');
    // ブラウザコンソールに出るので危険
    // 確認したらコメントアウト推奨
    // console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    // console.log(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
    // console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    // console.log(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
    // console.log(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
    // console.log(process.env.NEXT_PUBLIC_FIREBASE_APP_ID);

    app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    });
  }
  return app!;
};

export const auth = () => getAuth(getFirebaseApp());
export const db = () => getFirestore(getFirebaseApp());