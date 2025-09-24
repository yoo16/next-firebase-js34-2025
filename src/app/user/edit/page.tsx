'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { saveUserToFirestore } from "@/lib/saveUserProfile";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function ProfileForm() {
    // Auth情報からuidを取得
    const { user, loading: authLoading } = useAuth();
    // Firestoreからプロフィール情報を取得
    const { profile, loading: profileLoading } = useUserProfile(user?.uid || null);

    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [bio, setBio] = useState("");
    const [msg, setMsg] = useState("");

    // Firestoreから取得したデータをフォームにセット
    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setBirthday(profile.birthday);
            setBio(profile.profile);
        }
    }, [profile]);

    const handleSave = async () => {
        if (!user) {
            setMsg("ログインしてください");
            return;
        }

        try {
            // プロフィール情報
            const data = {
                displayName: user.displayName || "",
                email: user.email || "",
                photoURL: user.photoURL || "",
                name,
                birthday,
                profile: bio,
            }
            // プロフィール情報保存
            await saveUserToFirestore(user.uid, data);
            setMsg("プロフィールを保存しました");
        } catch (error) {
            console.error(error);
            setMsg("保存に失敗しました");
        }
    };

    if (authLoading || profileLoading) {
        return <p className="text-gray-500 text-sm">読み込み中...</p>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-lg font-bold mb-4">プロフィール編集</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">氏名</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">生年月日</label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">自己紹介</label>
                    <textarea
                        className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600"
                >
                    保存
                </button>

                {msg && <p className="text-center text-sm text-gray-700">{msg}</p>}
            </div>
        </div>
    );
}