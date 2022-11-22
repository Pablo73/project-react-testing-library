import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <App.js />', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /about/i });
    expect(homeLink).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(homeLink).toBeInTheDocument();
  });

  test('Verifica se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /home/i }));

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Verifica se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /about/i }));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Verifica se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Verifica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    renderWithRouter(<App />, 'URL desconhecida');
    const textNotFound = screen.getByRole('heading', { name: /page requested not found/i });
    const imgNotFound = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(textNotFound).toBeInTheDocument();
    expect(imgNotFound).toBeInTheDocument();
  });
});
