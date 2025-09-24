export type UserData = {
    uid: string;           // Firebase Auth の UID
    displayName: string;   // Googleアカウントの表示名
    email: string;         // メールアドレス
    photoURL: string;      // プロフィール画像URL
    createdAt: Date;       // 作成日時（serverTimestamp を Date に変換）
    updatedAt: Date;       // 更新日時
};

export type UserProfile = {
    uid: string;

    // Firebase Auth 由来
    displayName: string;
    email: string;
    photoURL: string;

    // アプリ固有プロフィール
    name: string;
    birthday: string;
    profile: string;

    createdAt: Date | null;   // Firestore Timestamp をそのまま使うなら Timestamp 型でもOK
    updatedAt: Date | null;
};