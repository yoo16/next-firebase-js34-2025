import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Next.js + Firebase Starter',
  description: 'Auth + Firestore example using App Router',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="max-w-2xl mx-auto p-4">
        <header className="flex items-center justify-between py-4">
          <h1 className="text-xl font-semibold">Next.js + Firebase</h1>
          <Link className="text-sm underline" href="/">Home</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}