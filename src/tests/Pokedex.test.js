import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(' Teste o componente <Pokedex.js />', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const renderEncounteredPokemon = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
      level: 2,
    });
    expect(renderEncounteredPokemon).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderCharmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(renderCharmander).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderCaterpie = screen.getByRole('img', { name: /caterpie sprite/i });
    expect(renderCaterpie).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderEkans = screen.getByRole('img', { name: /ekans sprite/i });
    expect(renderEkans).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderAlakazam = screen.getByRole('img', { name: /alakazam sprite/i });
    expect(renderAlakazam).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderMew = screen.getByRole('img', { name: /mew sprite/i });
    expect(renderMew).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderRapidash = screen.getByRole('img', { name: /rapidash sprite/i });
    expect(renderRapidash).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderSnorlax = screen.getByRole('img', { name: /snorlax sprite/i });
    expect(renderSnorlax).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderDragonair = screen.getByRole('img', { name: /dragonair sprite/i });
    expect(renderDragonair).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    const renderPikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(renderPikachu).toBeInTheDocument();
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonElectric = screen.getByRole('button', { name: /electric/i });
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    const buttonBug = screen.getByRole('button', { name: /bug/i });
    const buttonPoison = screen.getByRole('button', { name: /poison/i });
    const buttonPsychic = screen.getByRole('button', { name: /psychic/i });
    const buttonNormal = screen.getByRole('button', { name: /normal/i });
    const buttonDragon = screen.getByRole('button', { name: /normal/i });

    expect(buttonAll).toBeInTheDocument();
    expect(buttonElectric).toBeInTheDocument();
    expect(buttonFire).toBeInTheDocument();
    expect(buttonBug).toBeInTheDocument();
    expect(buttonPoison).toBeInTheDocument();
    expect(buttonPsychic).toBeInTheDocument();
    expect(buttonNormal).toBeInTheDocument();
    expect(buttonDragon).toBeInTheDocument();

    userEvent.click(screen.getAllByTestId('pokemon-type-button')[1]);
    const renderImgCharmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(renderImgCharmander).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const buttonPokemonType = screen.getAllByTestId('pokemon-type-button');

    expect(buttonPokemonType).toHaveLength(7);

    userEvent.click(buttonPokemonType[0]);
    const renderImgPikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(renderImgPikachu).toBeInTheDocument();

    userEvent.click(buttonPokemonType[1]);
    const renderImgCharmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(renderImgCharmander).toBeInTheDocument();

    userEvent.click(buttonPokemonType[2]);
    const renderImgCaterpie = screen.getByRole('img', { name: /caterpie sprite/i });
    expect(renderImgCaterpie).toBeInTheDocument();

    userEvent.click(buttonPokemonType[3]);
    const renderImgEkans = screen.getByRole('img', { name: /ekans sprite/i });
    expect(renderImgEkans).toBeInTheDocument();

    userEvent.click(buttonPokemonType[4]);
    const renderImgAlakazam = screen.getByRole('img', { name: /alakazam sprite/i });
    expect(renderImgAlakazam).toBeInTheDocument();

    userEvent.click(buttonPokemonType[5]);
    const renderImgSnorlax = screen.getByRole('img', { name: /snorlax sprite/i });
    expect(renderImgSnorlax).toBeInTheDocument();

    userEvent.click(buttonPokemonType[6]);
    const renderImgDragonair = screen.getByRole('img', { name: /dragonair sprite/i });
    expect(renderImgDragonair).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });

    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    expect(buttonAll).toBeInTheDocument();
  });
});
