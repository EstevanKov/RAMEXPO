import CharactersDatasource from "../../domain/datasources/charactersDatasource";
import CharactersResults from "../../domain/entities/charactersResults";
import Character from "../../domain/entities/character";
import CharacterLocation from "../../domain/entities/location";

class CharactersDatasourceImp extends CharactersDatasource {
    getCharacters(page: number): Promise<CharactersResults> {
        return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            .then((esponse) => esponse.json())
            .then((response) => {
                const characters = response.results.map((item: any) => new Character(
                    item.id,
                    item.name,
                    item.status,
                    item.gender,
                    item.image,
                    new CharacterLocation(
                        item.location.name,
                        item.location.url,
                    )
                ));

                return new CharactersResults(
                    response.info.count,
                    response.info.pages,
                    characters,
                    response.info.next,
                    response.info.prev
                )
            })
    }



}
export default CharactersDatasourceImp;
