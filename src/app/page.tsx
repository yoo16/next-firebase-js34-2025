import AuthButtons from '@/components/AuthButtons';

export default function Home() {
  // Client only components handle auth state.
  return (
    <section className="space-y-6">
      <AuthButtons />
      <a className="inline-block rounded-lg px-4 py-2 border" href="/app">アプリへ →</a>
    </section>
  );
}