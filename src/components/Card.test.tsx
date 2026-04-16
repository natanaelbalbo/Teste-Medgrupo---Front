import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../components/ui';

describe('Componente: Card', () => {
  it('deve renderizar os elementos filhos corretamente', () => {
    render(
      <Card>
        <div data-testid="test-child">Olá Card</div>
      </Card>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Olá Card')).toBeInTheDocument();
  });
});
