import { Image, StyleSheet, Text, View } from "react-native"
import Character from "../../../domain/entities/character"

interface Props {
  character: Character,
}

export default function CharacterCard ({
    character,
  } : Props) {
    
    return (
      <View>
        <Image 
          source={{
            uri: character.image
          }}
          style={styles.image}
        />

        <View>
          <Text>{character.name}</Text>

          <Text>"Género - Status"</Text>
          <View>
            <Text>{character.gender}</Text>
            <Text>{character.status}</Text>
          </View>
        </View>
      </View>
    )

  }

  // generar los estilos
  const styles = StyleSheet.create({

    image: {
      width: 60,
      height: 60,
    }
  })