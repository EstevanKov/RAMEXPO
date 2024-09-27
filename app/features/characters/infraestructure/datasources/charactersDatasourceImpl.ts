import CharactersDatasource from "../../domain/datasources/charactersDatasource";
import CharactersResults from "../../domain/entities/charactersResults";
import Character from "../../domain/entities/character";
import CharacterLocation from "../../domain/entities/location";
import LastSeenCharacter from "../../domain/entities/lastepisodeseen";

class CharactersDatasourceImp extends CharactersDatasource {
    getCharacters(page: number): Promise<CharactersResults> {
        return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((response) => response.json())
            .then((response) => {
                const characterPromises = response.results.map((item: any) => {
                    const episodePromises = item.episode.map((ep: string) => 
                        fetch(ep).then(res => res.json())
                    );

                    return Promise.all(episodePromises).then(episodes => {
                        const lastEpisodeName = episodes.length > 0 ? episodes[episodes.length - 1].name : "Desconocido";

                        return new Character(
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
                            new LastSeenCharacter([lastEpisodeName]), 
                            item.url,     
                            item.created   
                        );
                    });
                });

               
                return Promise.all(characterPromises).then(characters => {
                    return new CharactersResults(
                        response.info.count,
                        response.info.pages,
                        characters,
                        response.info.next,
                        response.info.prev
                    );
                });
            });
    }
}

export default CharactersDatasourceImp;
