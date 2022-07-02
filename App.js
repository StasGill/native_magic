import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from "react-native";
import magicPic from "./assets/magic.jpeg";
import wish from "./wish";
import { Audio } from "expo-av";

const initialState = {
  newWish: "",
  warning: false,
};

export default function App() {
  const [state, setState] = useState({ ...initialState });
  const [sound, setSound] = React.useState();

  const magic = () => {
    playChime();
    Vibration.vibrate();
    if (state.warning) {
      setState({ ...initialState });
      return;
    }
    const random = Math.floor(Math.random() * 161);
    setState({ newWish: [wish[random]], warning: true });
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/background.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  async function playChime() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/chime.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    playSound();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={magicPic}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity onPress={magic} style={styles.button}>
          {state.newWish ? (
            <Text style={styles.text}>{state.newWish}</Text>
          ) : null}
        </TouchableOpacity>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>
            Коснитесь шара что бы получить предсказание!
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 35,
    lineHeight: 54,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    borderRadius: 15,
    paddingHorizontal: 10,
  },

  button: {
    flex: 1,
    justifyContent: "center",
  },
  helpTextContainer: {
    position: "absolute",
    bottom: 100,
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
  },
  helpText: {
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
