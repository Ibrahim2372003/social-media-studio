export interface HealthResponse {
  status: 'ok';
  uptimeSeconds: number;
  timestamp: string;
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch('/api/health');
  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`);
  }
  return (await res.json()) as HealthResponse;
}
