'use client';
import { auth } from '@/lib/firebase.client';
import { saveAuthUser } from '@/lib/saveAuthUser';
import { GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function AuthButtons() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState<string>('');

  const loginGoogle = async () => {
    setMsg('Google Login');
    try {
      // Googleでログインで結果を受け取る
      const result = await signInWithPopup(auth(), new GoogleAuthProvider());
      // Firestoreにユーザー情報を保存
      await saveAuthUser(result.user);

    } catch (e: any) {
      setMsg(e.message);
    }
  };

  const loginEmail = async () => {
    setMsg('Email Login');
    // try {
    //   await signInWithEmailAndPassword(auth(), email, pw);
    // } catch (e: any) {
    //   setMsg(e.message);
    // }
  };

  const registerEmail = async () => {
    setMsg('Email Register');
    // try {
    //   await createUserWithEmailAndPassword(auth(), email, pw);
    // } catch (e: any) {
    //   setMsg(e.message);
    // }
  };

  const logout = async () => {
    setMsg('Logout');
    try {
      await signOut(auth());
    } catch (e: any) {
      setMsg(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg space-y-6">
      {/* タイトル */}
      <h2 className="text-xl font-bold text-center">Firebase 認証デモ</h2>

      {/* Google ログイン */}
      <div className="text-center">
        <button
          onClick={loginGoogle}
          className="w-full rounded-lg px-4 py-2 bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
        >
          Googleでサインイン
        </button>
      </div>

      {/* メールログイン */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3">
          <input
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="メールアドレス"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="パスワード"
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
        </div>

        <div className="flex gap-2 justify-between">
          <button
            onClick={loginEmail}
            className="flex-1 rounded-lg px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            メールでログイン
          </button>
          <button
            onClick={registerEmail}
            className="flex-1 rounded-lg px-3 py-2 bg-green-500 text-white hover:bg-green-600 transition"
          >
            新規登録
          </button>
        </div>
      </div>

      {/* ログアウト */}
      <div className="text-center">
        <button
          onClick={logout}
          className="w-full rounded-lg px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          ログアウト
        </button>
      </div>

      {/* メッセージ */}
      {msg && <p className="text-center text-sm text-red-600">{msg}</p>}
    </div>
  );
}