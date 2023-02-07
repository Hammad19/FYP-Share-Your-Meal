import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { enableLatestRenderer } from "react-native-maps";
import React from "react";
import { useEffect } from "react";
import { Alert, PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
//import { request, PERMISSIONS } from "react-native-permissions";
import { Colors, Images } from "../content";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
const GoogleMapScreen = () => {
  const [coordinate, setCoordinate] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });


  const [marginBottom, setMarginBottom] = React.useState({
    marginBottom: 1,
  });
  useEffect(() => {
    rKT66iavTEivxLdKzeT1Hqi5c38JT6hYgk();
  }, []);
// async function rKT66iavTEivxLdKzeT1Hqi5c38JT6hYgk() { 
//   var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//   if (response === 'granted') {
//       Geolocation.getCurrentPosition(
//       ({ coords }) => {
//         setLocation(coords);
//  },
//       (error) => {
//         Alert.alert(error.message.toString());
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   }
// }

const rKT66iavTEivxLdKzeT1Hqi5c38JT6hYgk = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'App Location Permission',
        message:
          'ShareYourMeal App needs access to your Location ' +
          'For the sake of google Map.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        ( coords ) => {
          setCoordinate({ longitude: coords.longitude, latitude: coords.latitude });
          console.log('Location', coords);
        },
        (error) => {
          Alert.alert(error.message.toString());
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      console.log('You can use the Location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};


  enableLatestRenderer();
  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styles.map,{marginBottom: marginBottom.marginBottom}]}
          region={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
         showsMyLocationButton={true}
         // onMapReady={() => {setMarginBottom({ marginBottom: 0 })}}
          onRegionChangeComplete={(region) => {
            console.log("region", region);
            setCoordinate({
              longitude: region.longitude,
              latitude: region.latitude,
            });
          }}
          onMapReady={() => { setMarginBottom({ marginBottom: 0 }) }}
        >
          <Marker
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            // draggable={true}
            // onDragStart={(e) => console.log('onDragStart', e.nativeEvent.coordinate)}
            // onDragEnd={(e) => setCoordinate({longitude: e.nativeEvent.coordinate.longitude, longitude: e.nativeEvent.coordinate.longitude})}
          />
        </MapView>
      </View>
    </>
  );
};

export default GoogleMapScreen;