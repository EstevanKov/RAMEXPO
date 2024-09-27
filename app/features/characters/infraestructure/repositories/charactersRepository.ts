import CharactersResults from '../../domain/entities/charactersResults';
import CharactersRepository from '../../domain/repositories/characterRepository';
import CharactersDatasource from '../datasources/charactersDatasourceImpl';

class CharactersRepositoryImp extends CharactersRepository{

    datasource: CharactersDatasource;

constructor(datasource:CharactersDatasource){
    super();
    this.datasource = datasource;
}

getCharacters(page: number): Promise<CharactersResults> {
    return this.datasource.getCharacters(page);
}

}

export default CharactersRepositoryImp;