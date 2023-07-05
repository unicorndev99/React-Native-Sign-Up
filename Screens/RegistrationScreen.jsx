import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import KeyboardComponent from "./KeyboardComponent";

export const RegistrationScreen = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.image, { width, height }]}
        source={require("../assets/images/photoBG.png")}></ImageBackground>
      <KeyboardComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
