import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByText(/pikachu/i);
    const typePokemon = screen.getByTestId('pokemon-type');
    const measuredPokemon = screen.getByText(/average weight: 6\.0 kg/i);
    const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon.innerHTML).toBe('Electric');
    expect(measuredPokemon).toBeInTheDocument();
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });

    expect(linkDetails).toBeInTheDocument();
  });

  test('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    const textPokemon = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');
    expect(textPokemon).toBeInTheDocument();
  });

  test('Testa se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: /fire/i }));

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/4');
  });

  test('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: /fire/i }));

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));

    const imgStart = screen.getByRole('img', { name: /charmander is marked as favorite/i });

    expect(imgStart).toBeInTheDocument();
    expect(imgStart).toHaveAttribute('src', '/star-icon.svg');
    expect(imgStart).toHaveAttribute('alt', 'Charmander is marked as favorite');
  });
});
