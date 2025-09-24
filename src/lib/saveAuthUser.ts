import { saveUserToFirestore } from "@/lib/saveUserProfile";
import { User } from "firebase/auth";

/**
 * Firebase Auth の User オブジェクトを Firestore に保存
 */
export const saveAuthUser = async (user: User) => {
    await saveUserToFirestore(user.uid, {
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        // アプリ固有プロフィール → 初期値を設定
        name: "",
        birthday: "",
        profile: "",
    });
};