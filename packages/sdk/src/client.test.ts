import { describe, it, expect } from 'vitest';
import { TavoClient, createNucleus } from './index';

describe('@tavo/sdk', () => {
  it('instantiates TavoClient with default baseURL', () => {
    const client = new TavoClient();
    expect(client).toBeDefined();
  });

  it('allows setting auth tokens', () => {
    const client = new TavoClient({ baseUrl: 'http://localhost:4173' });
    client.setToken('test-jwt-token');
    expect(client).toBeInstanceOf(TavoClient);
  });

  it('exports createNucleus from Synapse state manager', () => {
    expect(typeof createNucleus).toBe('function');
    interface TestState {
      counter: number;
    }
    const nucleus = createNucleus<TestState>((set, get) => ({
      counter: 0,
    }));

    expect(nucleus.get().counter).toBe(0);
    nucleus.set({ counter: 5 });
    expect(nucleus.get().counter).toBe(5);
  });
});
