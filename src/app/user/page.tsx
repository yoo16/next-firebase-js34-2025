'use client';

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserProfile() {
    // Firebase Auth のユーザー情報
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    // Firestoreからプロフィール情報を取得
    const { profile, loading: profileLoading } = useUserProfile(user?.uid || null);

    // 未ログインならトップページへリダイレクト
    useEffect(() => {
        if (!authLoading && !user) {
            router.replace("/");
        }
    }, [user, authLoading, router]);

    // ローディング状態
    if (authLoading || profileLoading) {
        return <p className="text-gray-500 text-sm">読み込み中...</p>;
    }

    if (!user) {
        return <p className="text-red-500 text-sm">ログインしてください</p>;
    }

    return (
        <div className="p-4 border border-gray-500 rounded shadow-md">
            {/* プロフィール編集リンク */}
            <div className="flex justify-end mb-2">
                <Link
                    href="/user/edit"
                    className="p-2 rounded bg-sky-500 text-white text-sm hover:underline inline-block"
                >
                    プロフィール編集
                </Link>
            </div>

            {/* Firestoreの氏名があれば優先表示 */}
            <h2 className="font-bold text-lg">
                {profile?.name || user.displayName || "未設定"}
            </h2>
            <div className="text-sm text-gray-800 my-1">
                <label className="font-bold mr-2">Email</label>
                <span>{user.email}</span>
            </div>

            {/* Firestoreの生年月日 */}
            {profile?.birthday && (
                <div className="text-sm text-gray-800 my-1">
                    <label className="font-bold mr-2">生年月日</label>
                    <span>{profile.birthday}</span>
                </div>
            )}

            {/* Firestoreの自己紹介 */}
            {profile?.profile && (
                <div className="text-sm text-gray-800 my-1 whitespace-pre-line">
                    {profile.profile}
                </div>
            )}
        </div>
    );
}