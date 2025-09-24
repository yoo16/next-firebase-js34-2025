'use client';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase.client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

// Firestore に保存するデータ型
type TodoData = {
    text: string;
    done: boolean;
    uid: string;
    createdAt: Date;
};

// アプリで扱う型（id 付き）
type Todo = TodoData & { id: string };

export default function TodoList() {
    const { user } = useAuth();
    const [todos, setTodos] = useState<Todo[]>([]);

    // 初回読み込み時にデモ用データをセット
    // useEffect(() => {
    //     setTodos([
    //         { id: '1', text: 'デモ用のタスク1', done: false, uid: 'uid', createdAt: new Date() },
    //         { id: '2', text: 'デモ用のタスク2', done: true, uid: 'uid', createdAt: new Date() },
    //     ]);
    // }, []);

    useEffect(() => {
        if (!user) return;

        // TODOをuidで絞り込み、作成日の降順で並び替え

        // SQLでやるなら
        // SELECT * FROM todos WHERE uid = ? ORDER BY createdAt DESC;

        // NoSQL（Firestore）でやるなら
        // query(コレクション, 条件, 並び順)
        const q = query(
            collection(db(), 'todos'),
            where('uid', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        // クエリーを実行して、リアルタイムでデータを受け取る
        const unsub = onSnapshot(q, (snap) => {
            const list: Todo[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as TodoData),
            }));
            // とってきたデータをセット
            setTodos(list);
        });

        return () => unsub();
    }, [user]);

    const toggle = async (t: Todo) => {
        // id で指定したドキュメントの done を反転させる
        // done を反転（true → false / false → true）させて保存
        // updateDoc(ドキュメント参照, 更新データ)
        // doc(データベース, コレクション名, ドキュメントID)

        // SQLでやるなら
        // UPDATE todos SET done = true/false WHERE id = ?;
        await updateDoc(doc(db(), 'todos', t.id), { done: !t.done });
    };

    const remove = async (t: Todo) => {
        // deleteDoc(ドキュメント参照)
        // doc(データベース, コレクション名, ドキュメントID)

        // SQLでやるなら
        // DELETE FROM todos WHERE id = ?;
        await deleteDoc(doc(db(), 'todos', t.id));
    };

    if (!user) {
        return (
            <p className="px-3 py-2 text-sm text-neutral-500">
                ログインするとタスクを確認できます
            </p>
        );
    }

    return (
        <ul className="divide-y rounded border border-gray-300">
            {todos.length === 0 && (
                <li className="px-3 py-2 text-sm text-neutral-500">
                    まだ何もありません
                </li>
            )}

            {todos.map((t) => (
                <li
                    key={t.id}
                    className="flex items-center justify-between px-3 py-2 text-gray-500 border-b border-gray-300 last:border-0"
                >
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={t.done}
                            onChange={() => toggle(t)}
                        />
                        <span className={t.done ? 'line-through opacity-60' : ''}>
                            {t.text}
                        </span>
                    </label>
                    <button
                        onClick={() => remove(t)}
                        className="text-sm text-red-600 hover:underline"
                    >
                        削除
                    </button>
                </li>
            ))}
        </ul>
    );
}