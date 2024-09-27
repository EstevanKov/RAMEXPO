// manejo de estado para la UI de personajes

import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Character from "../../domain/entities/character";
import CharactersResults from "../../domain/entities/charactersResults";
import CharactersRepositoryImp from "../../infraestructure/repositories/charactersRepository";
import CharactersDatasourceImp from "../../infraestructure/datasources/charactersDatasourceImpl";

// definir la estructura que tendrá mi context
interface ContextDefinition {
  // definición de la estructura del estado
  loading: boolean,
  page: number,
  totalPages: number,
  count: number,
  characters: Character[],

  // acciones que tendrá mi context
  getCharacters: (page: number) => void;
}

// crear el objeto context de React
const CharactersContext = createContext({} as ContextDefinition );

// estructura del state
// debe coincidir con la estructura del context
// no lleva acciones
// el state representa los valores
interface CharactersState {
  loading: boolean,
  page: number,
  totalPages: number,
  count: number,
  characters: Character[],
}

// definir los tipos de acciones que podrá ejecutar el context / provider
type CharactersActionType = 
    { type: 'Set Loading', payload: boolean }
  | { type: 'Set Data', payload: CharactersResults };


// inicializar el state
const initialState : CharactersState = {
  loading: true,
  page: 0,
  count: 0,
  totalPages: 0,
  characters: [],
}


// definición del reducer
// se encargará de manipular el state con base en
// las acciones y datos recibidos (payload)
function charactersReducer(
  state: CharactersState, 
  action: CharactersActionType
) {
    // manipular el estado con base en las acciones
    switch (action.type) {
      case 'Set Loading':
        return { ...state, loading: action.payload };
        
      case 'Set Data':
        return {
          ...state,
          //page: action.payload.page,
          count: action.payload.count,
          totalPages: action.payload.pages,
          characters: action.payload.characters,
          loading: false,
          // otras manipulaciones de estado
        };
    
      default:
        return state;
    } // switch
} // reducer

// implementar el proveedor de estado para Characters
type Props = {
  children?: ReactNode
}

const CharactersProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer( charactersReducer, initialState );

  // acciones
  const getCharacters = async (page: number) => {
    // instancia del repositorio
    const repository = new CharactersRepositoryImp(
      new CharactersDatasourceImp()
    );

    // cambiar el state a loading
    dispatch({
      type: 'Set Loading',
      payload: true,
    });

    // llamar al repositorio y obtener el resultado
    const apiResult = await repository.getCharacters(page);

    // mandar a establecer los datos en el estado
    dispatch({
      type: 'Set Data',
      payload: apiResult,
    });
  } // getCharacters

  // retornar la estructura del provider
  return(
    <CharactersContext.Provider value={{
      ...state,

      getCharacters,
    }}>
      {children}
    </CharactersContext.Provider>
  )
};

// para usar el provider y el state
// lo ideal es generar una función hook
function useCharactersState() {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error("useCharactersState debe ser usado " +
     " con un CharactersProvider");
  }

  return context;
}

export { CharactersProvider, useCharactersState };
