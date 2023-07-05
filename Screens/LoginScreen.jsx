import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const { width, height } = Dimensions.get("window");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };

  const handleBlurEmail = () => {
    setIsFocusedEmail(false);
  };

  const handleFocusPass = () => {
    setIsFocusedPass(true);
  };

  const handleBlurPass = () => {
    setIsFocusedPass(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisible) => !prevVisible);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleRegistration = () => {
    const userData = {
      email,
      password,
    };
    if (email && password) {
      setIsLoggedIn(true);
      navigation.navigate("PostsScreen", { userData });
    } else {
      console.log("Не введено логін або пароль");
    }
    console.log(userData);
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.image, { width, height }]}
        source={require("../assets/images/photoBG.png")}></ImageBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[styles.inner, isKeyboardVisible && styles.innerKeyboard]}>
            <Text style={styles.title}>Увійти</Text>
            <TextInput
              placeholder="Адреса електронної пошти"
              style={[
                styles.textInput,
                isFocusedEmail && styles.textInputFocused,
              ]}
              value={email}
              onChangeText={handleEmailChange}
              onFocus={handleFocusEmail}
              onBlur={handleBlurEmail}
            />
            <View style={styles.passwordInputContainer}>
              <TextInput
                placeholder="Пароль"
                style={[
                  styles.textInput,
                  isFocusedPass && styles.textInputFocused,
                  styles.passwordInput,
                ]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={handlePasswordChange}
                onFocus={handleFocusPass}
                onBlur={handleBlurPass}
              />
              <TouchableOpacity
                style={styles.passContainer}
                onPress={togglePasswordVisibility}>
                <Text
                  name={isPasswordVisible ? "eye" : "eyeo"}
                  style={styles.passText}>
                  Показати
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={handleRegistration}>
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.futerContainer}>
              <Text style={styles.futer}>Немає акаунту? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}>
                <Text style={styles.futerLink}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    gap: 16,
  },
  innerKeyboard: {
    bottom: -130,
  },
  title: {
    fontSize: 30,
    marginBottom: 32,
    fontWeight: "500",
    lineHeight: 35,
    textAlign: "center",
  },
  textInput: {
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  textInputFocused: {
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  btnContainer: {
    marginTop: 12,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 12,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
  futerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  futer: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  futerLink: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    textDecorationLine: "underline",
  },
  passwordInputContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 40,
  },
  passContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  passText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontWeight: "400",
  },
});
