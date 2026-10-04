/**
 * Tavo SDK API Client
 */

export interface TavoSdkConfig {
  baseUrl?: string;
  enableMockMode?: boolean;
}

export class TavoClient {
  private baseUrl: string;
  private token?: string;

  constructor(config: TavoSdkConfig = {}) {
    this.baseUrl = config.baseUrl ?? 'http://127.0.0.1:4173';
  }

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async fetchListings(params?: Record<string, string | number>) {
    const url = new URL('/api/listings', this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          url.searchParams.set(k, String(v));
        }
      });
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async aiSearch(query: string) {
    const res = await fetch(`${this.baseUrl}/api/listings/ai-search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async askAgent(prompt: string) {
    const res = await fetch(`${this.baseUrl}/api/ai/agent/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async fetchCities(): Promise<string[]> {
    const res = await fetch(`${this.baseUrl}/api/listings/meta/cities`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.cities || [];
  }
}
