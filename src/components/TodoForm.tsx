'use client';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase.client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function TodoForm() {
    const [text, setText] = useState('');
    const { user } = useAuth();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !text.trim()) return;
        // addDoc(コレクション, ドキュメントデータ)
        await addDoc(collection(db(), 'todos'), {
            uid: user.uid,
            text: text.trim(),
            done: false,
            createdAt: serverTimestamp(),
        });
        // もし SQLデータベースだったら
        // INSERT INTO todos (uid, text, done, createdAt) VALUES (...);
        // SQLデータベースに接続
        // SQLを実行
        // 接続を閉じる
        setText('');
    };

    return (
        <form onSubmit={submit} className="flex gap-2">
            <input
                className="border border-gray-300 px-3 py-2 rounded grow"
                placeholder="やること"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="rounded-lg px-4 py-2 border border-gray-300" type="submit">追加</button>
        </form>
    );
}