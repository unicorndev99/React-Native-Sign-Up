import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const PostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userData } = route.params;
  const { cardPhoto } = route.params;
  const { countComents } = route.params;
  const renderCard = () => {
    if (cardPhoto) {
      return (
        <View style={styles.containerСardPhoto}>
          <Image
            style={styles.photoCardItem}
            source={{ uri: cardPhoto.photoCard }}
          />

          <View style={styles.cardName}>
            <Text style={styles.cardLogin}>{cardPhoto.name}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CommentsScreen", {
                  userData,
                  cardPhoto,
                })
              }>
              <Image
                style={styles.icon}
                source={require("../assets/images/shape.png")}
              />
              <Text>`${countComents}`</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconLocation}
              onPress={() =>
                navigation.navigate("MapScreen", {
                  locality: cardPhoto.locality,
                })
              }>
              <Image
                style={styles.icon}
                source={require("../assets/images/map-pin.png")}
              />
              <Text style={styles.cardLocation}>{cardPhoto.locality}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBG}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Публікації</Text>
        </View>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Image
              style={styles.icon}
              source={require("../assets/images/log-out.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerCard}>
        {userData && userData.photo ? (
          <Image style={styles.cardPhoto} source={{ uri: userData.photo }} />
        ) : (
          <Image
            style={styles.cardPhoto}
            source={require("../assets/images/user-avatar.png")}
          />
        )}
        <View>
          <Text style={styles.cardLogin}>{userData.login}</Text>
          <Text style={styles.cardEmail}>{userData.email}</Text>
        </View>
      </View>
      {renderCard()}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "PostsScreen",
              { userData, cardPhoto },
              console.log(userData)
            )
          }>
          <Image
            style={styles.image}
            source={require("../assets/images/grid.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate(
              "CreatePostsScreen",
              { userData, cardPhoto },
              console.log(userData)
            )
          }>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileScreen", { userData, cardPhoto })
          }>
          <Image
            style={styles.image}
            source={require("../assets/images/user.png")}
          />
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
  photoCard: {
    width: "100%",
    height: 240,
    marginTop: 32,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
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
  containerIcon: {
    alignItems: "flex-end",
    marginRight: 16,
    marginTop: 44,
  },
  icon: {
    width: 24,
    height: 24,
  },

  containerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 100,
    height: 60,
    backgroundColor: "#FFFFFF",
  },
  containerСardPhoto: {
    gap: 8,
    marginTop: 50,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  iconContainer: {
    gap: 8,
    flexDirection: "row",

    justifyContent: "space-between",
  },
  iconLocation: {
    gap: 4,
    flexDirection: "row",
  },
  cardContent: {
    gap: 8,
  },
  cardLogin: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
  },
  cardEmail: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
  },
  cardName: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19,
  },
  cardLocation: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  cardPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 89,
    right: 89,
    alignItems: "center",
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 13,
    width: 70,
    alignSelf: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});

export default PostsScreen;
