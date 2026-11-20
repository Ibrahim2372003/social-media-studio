import { useQuery } from '@tanstack/react-query';
import { fetchHealth } from './api';

export function App() {
  const health = useQuery({ queryKey: ['health'], queryFn: fetchHealth, retry: false });

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Social Media Studio</h1>
      <p className="mt-2 text-slate-600">Phase 1 foundation. No product features yet.</p>

      <section aria-labelledby="api-status" className="mt-8 rounded-lg border border-slate-200 p-4">
        <h2 id="api-status" className="font-medium">
          API status
        </h2>
        <p role="status" className="mt-2">
          {health.isPending && 'Checking…'}
          {health.isError && 'API unreachable. Is it running on port 3000?'}
          {health.isSuccess && `API is ${health.data.status}.`}
        </p>
      </section>
    </main>
  );
}
