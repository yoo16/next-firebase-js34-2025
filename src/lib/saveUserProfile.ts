import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase.client";
import { UserProfile } from "@/types/user";

/**
 * Firestore にユーザー情報を保存
 */
export const saveUserToFirestore = async (
    uid: string,
    data: Omit<UserProfile, "uid" | "createdAt" | "updatedAt">
) => {
    // users コレクションの uid ドキュメントを参照
    const ref = doc(db(), "users", uid);
    // データをセット（存在しない場合は作成、存在する場合は更新）
    // merge: true を指定すると、既存のフィールドを保持しつつ更新できる

    // setDoc(データベースの参照, データ, オプション)

    // SQLでいうところの
    // INSERT INTO users (uid, displayName, email, photoURL, name, birthday, profile, createdAt, updatedAt)
    // UPDATE users SET displayName = ..., email = ..., photoURL = ..., name = ..., birthday = ..., profile = ..., updatedAt = ... WHERE uid = ...
    await setDoc(
        ref,
        {
            uid,
            ...data,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
        },
        { merge: true } // 既存データは上書き
    );
};
