import { Image, StyleSheet, Text, View } from "react-native";
import Character from "../../../domain/entities/character";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: character.image,
        }}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{character.name}</Text>

        <View style={styles.infoDetails}>
          <Text style={styles.label}>Género:</Text>
          <Text style={styles.text}>{character.gender}</Text>
        </View>

        <View style={styles.infoDetails}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.text}>{character.status}</Text>
        </View>

        <View style={styles.infoDetails}>
          <Text style={styles.label}>Especie:</Text>
          <Text style={styles.text}>{character.species}</Text>
        </View>

        <View style={styles.infoDetails}>
          <Text style={styles.label}>Ubicación:</Text>
          <Text style={styles.text}>{character.location.name}</Text>
        </View>

        <View style={styles.infoDetails}>
          <Text style={styles.label}>Origen:</Text>
          <Text style={styles.text}>{character.origin.name}</Text>
        </View>

        <View style={styles.infoDetails}>
          <Text style={styles.label}>Último Episodio Visto:</Text>
          <Text style={styles.text}>
            {character.episodes.names.length > 0 ? character.episodes.names[0] : "Desconocido"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    flexShrink: 0,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    fontSize: 14,
  },
});
