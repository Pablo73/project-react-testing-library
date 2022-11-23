import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const DetailsPokemon = '/pokemon/25';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />, DetailsPokemon);

    const namePokemon = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(namePokemon).toBeInTheDocument();

    const linkDetails = screen.queryByText('href', DetailsPokemon);
    expect(linkDetails).not.toBeInTheDocument();

    const renderSumary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(renderSumary).toBeInTheDocument();

    const renderGameLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(renderGameLocation).toBeInTheDocument();

    const renderDetails = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(renderDetails).toBeInTheDocument();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />, DetailsPokemon);

    const renderLocation = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(renderLocation).toBeInTheDocument();

    const renderImgLocation = screen.queryAllByAltText('Pikachu location');
    expect(renderImgLocation).toHaveLength(2);
    expect(renderImgLocation[0]).toBeInTheDocument();
    expect(renderImgLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(renderImgLocation[0]).toHaveAttribute('alt', 'Pikachu location');

    const renderNameLocation = screen.getByText(/kanto viridian forest/i);
    expect(renderNameLocation).toBeInTheDocument();
  });

  test('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />, DetailsPokemon);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const renderPokemonFavorit = screen.getByText(/pokémon favoritado\?/i);

    expect(checkbox).toBeInTheDocument();
    expect(renderPokemonFavorit).toBeInTheDocument();

    userEvent.click(checkbox);

    act(() => {
      history.push('/favorites');
    });

    const renderImgPikachu = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(renderImgPikachu).toBeInTheDocument();

    act(() => {
      history.push(DetailsPokemon);
    });

    userEvent.click(checkbox);

    act(() => {
      history.push('/favorites');
    });

    expect(renderImgPikachu).not.toBeInTheDocument();
  });
});
