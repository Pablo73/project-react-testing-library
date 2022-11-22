import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

describe('Testa o componente <FavoritePokemon.js />', () => {
  test('Verifica se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFavorityFound = screen.getByText(/no favorite pokémon found/i);
    expect(notFavorityFound).toBeInTheDocument();
  });

  test('Testa se é renderizado o Pikachu em favoritos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
    userEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));

    renderWithRouter(<FavoritePokemon />);
    const namePikachu = screen.getByText(/pikachu/i);
    const imgPikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    const pikachuType = screen.getByText(/electric/i);
    expect(namePikachu).toBeInTheDocument();
    expect(imgPikachu).toBeInTheDocument();
    expect(pikachuType).toBeInTheDocument();
  });

  test('Testa se é renderizado o Charmander em favoritos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: /fire/i }));
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
    userEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));

    renderWithRouter(<FavoritePokemon />);
    const nameCharmander = screen.getByText(/charmander/i);
    const imgCharmander = screen.getByRole('img', { name: /pikachu sprite/i });
    const charmanderType = screen.getByText(/fire/i);
    expect(nameCharmander).toBeInTheDocument();
    expect(imgCharmander).toBeInTheDocument();
    expect(charmanderType).toBeInTheDocument();
  });
});
