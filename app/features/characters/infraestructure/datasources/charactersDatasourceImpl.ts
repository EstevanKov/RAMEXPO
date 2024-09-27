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
                    // Obtener los nombres de los episodios
                    const episodePromises = item.episode.map((ep: string) => 
                        fetch(ep).then(res => res.json())
                    );

                    return Promise.all(episodePromises).then(episodes => {
                        // Extraer solo el nombre del último episodio visto
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
                            new LastSeenCharacter([lastEpisodeName]), // Aquí se guarda el nombre
                            item.url,     
                            item.created   
                        );
                    });
                });

                // Esperar a que se resuelvan todas las promesas
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
