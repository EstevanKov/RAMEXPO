import CharactersResults from "../entities/charactersResults";

abstract class CharactersDatasource {
    abstract getCharacters(
        page: number,

    ): Promise<CharactersResults>;
}

export default CharactersDatasource;