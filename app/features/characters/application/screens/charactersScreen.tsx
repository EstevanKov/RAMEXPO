import { ActivityIndicator, ScrollView, StyleSheet, View, useWindowDimensions, Platform } from "react-native";
import { CharactersProvider, useCharactersState } from "../providers/charactersProvider";
import { useEffect } from "react";
import CharacterCard from "./components/characterCard";

const CharactersView = () => {
  const { loading, characters, getCharacters } = useCharactersState();
  const { width } = useWindowDimensions(); // obtener el ancho de la pantalla

  useEffect(() => {
    getCharacters(1);
  }, []);

  // Ajuste del número de columnas dependiendo del ancho de la pantalla
  const isLargeScreen = width > 1024; // Pantallas grandes como escritorio
  const isTablet = width > 768 && width <= 1024; // Pantallas medianas (tablets)
  const numColumns = isLargeScreen ? 3 : isTablet ? 2 : 1; // 3 columnas en escritorio, 2 en tablet, 1 en móvil

  const renderCharacters = () => (
    <View style={[styles.gridContainer, { flexDirection: numColumns > 1 ? "row" : "column" }]}>
      {characters.map((character) => (
        <View
          key={character.id}
          style={[styles.cardWrapper, { width: isLargeScreen ? "30%" : isTablet ? "45%" : "100%" }]}>
          <CharacterCard character={character} />
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={"large"} color={"darkblue"} />
      </View>
    );
  }

  return <ScrollView>{renderCharacters()}</ScrollView>;
};

const CharactersScreen = () => (
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
  },
  gridContainer: {
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#2c2c2c", // Fondo gris oscuro
    paddingTop: Platform.OS === 'android' ? 40 : 20, // Aumenta el padding superior para dispositivos móviles
  },
  cardWrapper: {
    marginBottom: 20, // Espacio entre las tarjetas
  },
});
