import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import firebaseApp from '../../config/firebase';
import { FC, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons'; 

const showMessage = (message: string) => {
  Alert.alert("Mi app", message);
}

const LoginScreen = () => {
  const [email, setEmail] = useState('');//admin@admin.com
  const [password, setPassword] = useState('');//adminadmin

  const onLogin = () => {
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email.toLocaleLowerCase(), password)
      .then((userCredential) => {
        console.log("Usuario autenticado");
        showMessage("Usuario autenticado");
      })
      .catch((error) => {
        console.log(error.message);
        showMessage(`Error al iniciar sesión: ${error.message}`);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa tus datos</Text>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="gray" />
        <TextInput
          placeholder="Correo Electronico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9" 
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="gray" />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          placeholderTextColor="#A9A9A9" 
        />
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Acceder</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 15,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
