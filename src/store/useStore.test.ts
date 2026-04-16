import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStore } from './useStore';

global.fetch = vi.fn();

describe('Store: useStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.setState({ schools: [], classes: [], isLoading: false, error: null });
  });

  it('deve buscar escolas com sucesso', async () => {
    const mockSchools = [{ id: '1', name: 'Escola Teste', address: 'Rua 1', classCount: 0 }];
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockSchools,
    });

    await useStore.getState().fetchSchools();

    expect(useStore.getState().schools).toEqual(mockSchools);
    expect(useStore.getState().isLoading).toBe(false);
  });

  it('deve lidar com erro ao buscar escolas', async () => {
    (fetch as any).mockRejectedValue(new Error('Network error'));

    await useStore.getState().fetchSchools();

    expect(useStore.getState().error).toBe('Erro ao buscar escolas');
    expect(useStore.getState().isLoading).toBe(false);
  });
});
