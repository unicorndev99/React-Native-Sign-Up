import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { requestForegroundPermissionsAsync } from "expo-location";

export const MapScreen = ({ route }) => {
  const { locality } = route.params;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let currentPosition = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      };
      setLocation(coords);

      if (locality) {
        try {
          const geoCode = await Location.geocodeAsync(locality);
          if (geoCode.length > 0) {
            const { latitude, longitude } = geoCode[0];
            setLocation({ latitude, longitude });
          }
        } catch (error) {
          console.log("Error geocoding location:", error);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}>
        {location && (
          <Marker title={locality} coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
