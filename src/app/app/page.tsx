'use client';
import { useAuth } from '@/hooks/useAuth';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import Link from 'next/link';

export default function AppPage() {
    // const { user, loading } = useAuth();

    // if (loading) return <p>Loading...</p>;
    // if (!user) return (
    //     <div className="space-y-3">
    //         <p>このページはログインが必要です。</p>
    //         <Link href="/" className="underline">トップへ戻る</Link>
    //     </div>
    // );

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold">Todo</h2>
            <TodoForm />
            <TodoList />
        </section>
    );
}