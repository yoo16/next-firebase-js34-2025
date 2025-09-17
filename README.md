# Next.js + Firebase (Auth + Firestore) — Minimal Starter

## Firebase Console
1. Firebase のアカウント作成
https://firebase.google.com/?hl=ja

1. Firebase Console で新規プロジェクト作成
https://console.firebase.google.com/

3. 「Authentication」→「サインイン方法」→ Googleログイン を有効化
4. 「Firestore Database」を作成
5. 「Webアプリを追加」して firebaseConfig を取得

## 1. Next.js プロジェクト作成
```bash
npx create-next-app next-firebase
```

```bash
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use src/ directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … No
```


```bash
npm install firebase
npm install -g firebase-tools
```

```bash
firebase login
firebase init
```

```
next-firebase-starter/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx                # Landing: shows Sign in or link to /app
│  └─ app/
│     └─ page.tsx             # Protected Todo App (client-side guard)
├─ components/
│  ├─ AuthButtons.tsx         # Google/Email sign in/out
│  ├─ TodoForm.tsx            # Add todos
│  └─ TodoList.tsx            # List + toggle + delete
├─ hooks/
│  └─ useAuth.ts              # React hook around Firebase Auth state
├─ lib/
│  └─ firebase.client.ts      # Client SDK init (Auth, Firestore)
├─ public/
│  └─ favicon.ico
├─ .env.local.example         # Copy -> .env.local
├─ package.json
├─ postcss.config.js
├─ tailwind.config.ts
├─ tsconfig.json
└─ next.config.ts
```

## 2) Frebase Setup

1. Create a Firebase project → Enable **Authentication** (Google & Email/Password) and **Firestore (in test mode)**.
2. Create a **Web app** in Firebase console and copy the config.
3. Rename `.env.local.example` → `.env.local` and fill values.
4. Install & run:

---
## 3) Environment Variables

**.env.local.example**
```bash
# Firebase client config (safe for client)
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

> ⚠️ These are public client keys; still keep them in `.env.local` and do not commit.