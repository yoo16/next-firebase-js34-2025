// src/hooks/useUserProfile.ts
'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase.client";
import { doc, onSnapshot } from "firebase/firestore";

export type UserProfile = {
    name: string;
    birthday: string;
    profile: string;
};

export const useUserProfile = (uid: string | null) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid) {
            setProfile(null);
            setLoading(false);
            return;
        }

        const ref = doc(db(), "users", uid);
        const unsubscribe = onSnapshot(ref, (snap) => {
            if (snap.exists()) {
                const data = snap.data() as UserProfile;
                setProfile({
                    name: data.name || "",
                    birthday: data.birthday || "",
                    profile: data.profile || "",
                });
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [uid]);

    return { profile, loading };
};