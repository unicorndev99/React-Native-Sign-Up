import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CommentsScreen = ({ route }) => {
  const [isFocusedComents, setIsFocusedComents] = useState(false);
  const [coments, setComents] = useState("");
  const [commentList, setCommentList] = useState([]);
  const navigation = useNavigation();
  const { userData } = route.params;
  const { cardPhoto } = route.params;
  const handleFocusComents = () => {
    setIsFocusedComents(true);
  };

  const handleBlurComents = () => {
    setIsFocusedComents(false);
  };
  const handleComentsChange = (text) => {
    setComents(text);
  };
  const handleCardComents = () => {
    if (coments) {
      const dateTime = new Date().toLocaleString();

      const newCommentList = [...commentList, `${coments} (${dateTime})`];
      setCommentList(newCommentList);
      console.log(coments);
      console.log(newCommentList);
      console.log(newCommentList.length);
      setComents("");
      navigation.navigate("PostsScreen", {
        countComents: newCommentList.length,
        userData,
      });
    } else {
      console.log("Заповніть коментарі");
    }
  };
  const saveComments = async (commentList) => {
    try {
      await AsyncStorage.setItem("comments", JSON.stringify(commentList));
    } catch (error) {
      console.log("Error saving comments", error);
    }
  };

  const loadComments = async () => {
    try {
      const savedComments = await AsyncStorage.getItem("comments");
      if (savedComments) {
        setCommentList(JSON.parse(savedComments));
      }
    } catch (error) {
      console.log("Error loading comments", error);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const renderCard = () => {
    if (cardPhoto) {
      return (
        <View style={styles.containerСardPhoto}>
          <Image
            style={styles.photoCardItem}
            source={{ uri: cardPhoto.photoCard }}
          />
        </View>
      );
    }
    return null;
  };

  const renderComment = ({ item }) => {
    return (
      <View style={styles.containerComents}>
        <Text style={styles.cardComents}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCard()}
      <FlatList
        data={commentList}
        renderItem={renderComment}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.btnContainer}>
        <TextInput
          placeholder="Коментувати..."
          style={[
            styles.textInput,
            isFocusedComents && styles.textInputFocused,
          ]}
          value={coments}
          onChangeText={handleComentsChange}
          onFocus={handleFocusComents}
          onBlur={handleBlurComents}
        />
        <TouchableOpacity style={styles.btn} onPress={handleCardComents}>
          {/* <Text style={styles.btnText}> */}
          <Image
            style={styles.icon}
            source={require("../assets/images/vector.png")}
          />
          {/* </Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  photoCardItem: {
    width: "100%",
    height: 140,
    // marginTop: 32,
  },
  containerBG: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    height: 88,
    position: "absolute",
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  containerTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 44,
  },
  title: {
    color: "#212121",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 22,
    paddingVertical: 11,
    paddingHorizontal: 49,
  },

  icon: {
    width: 10,
    height: 14,
  },

  containerСardPhoto: {
    gap: 8,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    // left: 24,
    // right: 24,
    // alignItems: "center",
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 13,
    width: 50,
    alignSelf: "center",
    position: "absolute",
    right: 24,
  },

  textInput: {
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    width: "100%",
  },
  textInputFocused: {
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  cardComents: {
    color: "#0c0a0a",
  },
  containerComents: {
    marginTop: 20,
    backgroundColor: "#F6F6F6",
    padding: 16,
    gap: 8,
    width: "80%",
    alignSelf: "center",
    // alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
});

export default CommentsScreen;
