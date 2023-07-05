import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";

export const CreatePostsScreen = ({ route }) => {
  const { userData } = route.params;
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [name, setName] = useState("");
  const [isFocusedLocality, setIsFocusedLocality] = useState(false);
  const [locality, setLocality] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [photoCard, setPhotoCard] = useState(null);
  const navigation = useNavigation();
  // підключення камери
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // __________________________

  const handleFocusName = () => {
    setIsFocusedName(true);
  };

  const handleBlurName = () => {
    setIsFocusedName(false);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleFocusLocality = () => {
    setIsFocusedLocality(true);
  };

  const handleBlurLocality = () => {
    setIsFocusedLocality(false);
  };

  const handleLocalityChange = (text) => {
    setLocality(text);
  };

  const handleCardPhoto = () => {
    const cardPhoto = {
      photoCard: photoCard,
      name,
      locality,
    };
    if (photoCard && name && locality) {
      // setIsLoggedIn(true);
      navigation.navigate("PostsScreen", {
        userData: userData,
        cardPhoto: cardPhoto,
      });
      console.log(userData);
      console.log(cardPhoto);
    } else if (!photoCard && !name && !locality) {
      console.log("Заповніть всі поля та додайте фото");
    }
    setPhotoCard(null);
    setName("");
    setLocality("");
  };

  const handleSelectPhoto = async () => {
    // Запит на доступ до фото
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoCard(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={[styles.camera, photoCard && styles.cameraHiden]}
        type={type}
        ref={setCameraRef}>
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
                setPhotoCard(uri); // фіксуємо фото в контейнері камери
              }
            }}>
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      {photoCard ? (
        <View>
          <Image style={styles.photoCard} source={{ uri: photoCard }} />
          <TouchableOpacity onPress={handleSelectPhoto}>
            <Text
              style={[
                styles.placeholderPhoto,
                photoCard && styles.placeholderHiden,
              ]}>
              Завантажте фото
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleSelectPhoto}>
          <Text
            style={[
              styles.placeholderPhoto,
              photoCard && styles.placeholderHiden,
            ]}>
            Завантажте фото
          </Text>
        </TouchableOpacity>
      )}
      <TextInput
        placeholder="Назва..."
        style={[styles.textInput, isFocusedName && styles.textInputFocused]}
        value={name}
        onChangeText={handleNameChange}
        onFocus={handleFocusName}
        onBlur={handleBlurName}
      />
      <View
        style={[
          styles.containerMap,
          isFocusedLocality && styles.containerMapFocused,
        ]}>
        <Image
          style={styles.icon}
          source={require("../assets/images/map-pin.png")}
        />
        <TextInput
          placeholder="Місцевість ..."
          style={[styles.locationInput]}
          value={locality}
          onChangeText={handleLocalityChange}
          onFocus={handleFocusLocality}
          onBlur={handleBlurLocality}
        />
      </View>
      <View style={styles.btnContainerAddPhoto}>
        <TouchableOpacity style={styles.btnAddPhoto} onPress={handleCardPhoto}>
          <Text style={styles.btnText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        {/* <TouchableOpacity style={styles.btn} onPress={() => null}>
          <Image
            style={styles.btnImage}
            source={require("../assets/images/trash.png")}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 16,
  },
  camera: { flex: 1 },
  cameraHiden: { display: "none" },

  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },
  button: { alignSelf: "center" },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  photoCard: {
    width: "100%",
    height: 240,
    marginTop: 32,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderPhoto: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 35,
    textAlign: "left",
    color: "#BDBDBD",
  },
  placeholderHiden: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 35,
    textAlign: "left",
    opacity: 0,
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
  locationInput: {
    // flex: 1,
  },
  containerMap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },
  containerMapFocused: {
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  btnContainerAddPhoto: {
    marginTop: 32,
  },
  btnAddPhoto: {
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
});

export default CreatePostsScreen;
