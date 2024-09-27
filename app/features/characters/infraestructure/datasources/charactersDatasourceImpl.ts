import CharactersDatasource from "../../domain/datasources/charactersDatasource";
import CharactersResults from "../../domain/entities/charactersResults";
import Character from "../../domain/entities/character";
import CharacterLocation from "../../domain/entities/location";
import lastSeenCharacter from "../../domain/entities/lastepisodeseen";

class CharactersDatasourceImp extends CharactersDatasource {
    getCharacters(page: number): Promise<CharactersResults> {
        return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((response) => response.json())
            .then((response) => {
                const characters = response.results.map((item: any) => new Character(
                    item.id,
                    item.name,
                    item.status,
                    item.species,  
                    item.type,     
                    item.gender,
                    new CharacterLocation(
                        item.origin.name, 
                        item.origin.url
                    ),
                    new CharacterLocation(
                        item.location.name,
                        item.location.url,
                    ),
                    item.image,
                    new lastSeenCharacter(
                        item.episode.name,
                    ),
                    item.url,     
                    item.created   
                ));

                return new CharactersResults(
                    response.info.count,
                    response.info.pages,
                    characters,
                    response.info.next,
                    response.info.prev
                );
            });
    }
}

export default CharactersDatasourceImp;
