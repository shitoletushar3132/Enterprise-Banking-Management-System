import { apiClient } from './api-client';

export interface HealthStatus {
  status: 'ok' | 'degraded';
  service: string;
  version: string;
  uptimeSeconds: number;
  checks: {
    mongodb: 'up' | 'down';
  };
  timestamp: string;
}

interface ApiSuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

export async function fetchHealth(): Promise<HealthStatus> {
  const response = await apiClient.get<ApiSuccessEnvelope<HealthStatus>>('/health');
  return response.data.data;
}
