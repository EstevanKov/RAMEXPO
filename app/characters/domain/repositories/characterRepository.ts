import CharactersResults from "../entities/charactersResults";

abstract class CharactersRepository {

    abstract getCharacters(
        page:number
    ): Promise<CharactersResults>
}

export default CharactersRepository;