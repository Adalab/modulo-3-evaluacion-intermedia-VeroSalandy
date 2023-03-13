// Fichero src/components/App.js
import '../styles/App.scss';
import { useState } from 'react';
import phrases from '../data/phrases.json';

function App() {
  //variables de estado
  const [data, setData] = useState(phrases);
  const [search, setSearch] = useState('');
  const [character, setCharacter] = useState('');
  const [newPhrase, setNewPhrase] = useState({
    // objeto para recoger los datos del input y (guardar/) anadir  aqui en variable de estado, nueva frase
    quote: '',
    character: '',
  });

  //funciones HANDLE
  const handleFilter = (ev) => {
    setSearch(ev.target.value);
  };
  const handleCharacter = (ev) => {
    setCharacter(ev.target.value);
  };

  const handleNewPhrase = (ev) => {
    setNewPhrase({ ...newPhrase, [ev.target.name]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setData([...data, newPhrase]);
    setNewPhrase({
      quote: '',
      character: '',
    });
  };
  //funcion para pintar HTML/filtrar (por frase y por persinaje)
  const renderList = () => {
    return data
      .filter((eachPhrase) => {
        return eachPhrase.quote
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      })

      .filter((eachPhrase) => {
        return eachPhrase.character
          .toLocaleLowerCase()
          .includes(character.toLocaleLowerCase());
      })
      .map((eachPhrase, index) => (
        <li key={index} className="phrases__item">
          <p className="phrases__quote-character">
            <label className="phrases__label"></label>
            {eachPhrase.quote} - {eachPhrase.character}
          </p>
        </li>
      ));
  };

  return (
    <div className="page">
      {/* header */}
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>
        <form>
          <label className="label-text" htmlFor="search">
            filtrar por la frase:
          </label>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            placeholder=""
            onChange={handleFilter}
            value={search}
          />
          <label className="label-text" htmlFor="character">
            filtrar por personaje:
          </label>
          <select
            className="header__search"
            name="character"
            id="character"
            onChange={handleCharacter}
            value={character}
          >
            <option value="">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>
        </form>
      </header>

      <main>
        {/* phrases list */}
        <ul className="phrases__list">{renderList()}</ul>

        {/* new phrases contact */}
        <form className="new-phrase__form">
          <h2 className="new-phrase__title">Añadir una nueva frase</h2>
          <input
            className="new-phrase__input"
            type="text"
            name="quote"
            id="quote"
            placeholder="Frase"
            onChange={handleNewPhrase}
            value={newPhrase.quote}
          />
          <input
            className="new-phrase__input"
            type="text"
            name="character"
            id="character"
            placeholder="Personaje"
            onChange={handleNewPhrase}
            value={newPhrase.character}
          />
          <input
            className="new-phrase__btn"
            type="submit"
            value="Añadir una nueva frase"
            onClick={handleClick}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
