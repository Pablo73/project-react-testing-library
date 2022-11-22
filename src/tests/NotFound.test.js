import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Verifica se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(textNotFound).toBeInTheDocument();
  });

  test('Verifica se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imgNotFound).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
