import Character from './character';

class CharactersResults {
    count: number;
    pages: number;
    next?: string
    prev?: string

    characters: Character[];

    constructor (
        count:number,
        pages:number,
        characters: Character[],
        next?:string,
        prev?:string

    ){
        this.count = count;
        this.pages = pages;
        this.next = next;
        this.prev = prev;
        this.characters = characters;
    }
}

export default CharactersResults;