// implementar la UI para personajes
//   pero no exportarlo como screen

import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { CharactersProvider, useCharactersState } from "../providers/charactersProvider";
import { useEffect } from "react";
import CharacterCard from "./components/characterCard";

const CharactersView = () => {

  //consumir el estado
  const {
    loading,
    characters,

    getCharacters,
  } = useCharactersState();

  /**
   * Genera las tarjetas de personajes
   * @returns 
   */
  const renderCharacters = () => (
    characters.map((character, index) => (
      <CharacterCard 
        key={character.id}
        character={character}
      />
    ))
  );

  // al cargar la pantalla, cargar la lista de personajes
  useEffect(() => {
    getCharacters(1);
  }, []);

  // si está cargando, mostrar el spinner
  if (loading) {
    return (
      <View
        style={styles.spinnerContainer}
      >
        <ActivityIndicator 
          size={"large"}
          color={"darkblue"}
        />
      </View>
    );
  }

  // generar la UI
  return (
    <ScrollView>
      {renderCharacters()}
    </ScrollView>
  );
} // fin CharactersView

// envolver la UI con el CharactersProvider
//    y ese si lo exportamos como screen

const CharactersScreen = () =>  (
  <CharactersProvider>
    <CharactersView />
  </CharactersProvider>
);

export default CharactersScreen;

const styles = StyleSheet.create({
  spinnerContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
});
