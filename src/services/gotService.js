export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
    throw new Error(`Could not fetch ${url}` +
      `, received ${res.status}`);
    }
    return await res.json();
  }

  getData = async ({name, id, page=1}) => {
    if (id) {
      const res = await this.getResource(`/${name}/${id}/`);
      switch (name) {
        case 'books':
          return this._transformBook(res);
        case 'characters':
          return this._transformCharacter(res);
        case 'houses':
          return this._transformHouse(res);
        default: 
        console.error('Something goes wrong');
      }
    }
    else {
      const res = await this.getResource(`/${name}?page=${page}&pageSize=10`);
      switch (name) {
        case 'books':
          return res.map(this._transformBook);
        case 'characters':
          return res.map(this._transformCharacter);
        case 'houses':
          return res.map(this._transformHouse);
        default: 
        console.error('Something goes wrong');
      }
    }
  }

  _transformCharacter(char) {
    return {
      name: char.name || 'no data ;(',
      gender: char.gender || 'no data ;(',
      born: char.born || 'no data ;(',
      died: char.died || 'no data ;(',
      culture: char.culture || 'no data ;(',
    }
  }

  _transformHouse(house) {
    return {
      name: house.name || 'no data ;(',
      region: house.region || 'no data ;(',
      words: house.words || 'no data ;(',
      titles: house.titles || 'no data ;(',
      overlord: house.overlord || 'no data ;(',
      ancestralWeapons: house.ancestralWeapons || 'no data ;(',
    }
  }

  _transformBook(book) {
    return {
      name: book.name || 'no data ;(',
      numberOfPages: book.numberOfPages || 'no data ;(',
      publisher: book.publisher || 'no data ;(',
      released: book.released || 'no data ;(',
      culture: book.culture || 'no data ;(',
    }
  }
}