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
    const ref = doc(db(), "users", uid);
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
