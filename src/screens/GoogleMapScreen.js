import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { enableLatestRenderer } from "react-native-maps";
import React from "react";
import { useEffect } from "react";
import { Alert, PermissionsAndroid } from "react-native";
import { Display } from "../utils";
import Geocoder from "react-native-geocoding";
import { Colors, Images } from "../content";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { addLocation } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { navigateToCustomTabNavigator } from "../utils/authservice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import * as Location from "expo-location";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    //zIndex: 2,
    //flex: 1,
  },
  searchContainer: {
    zIndex: 0,
    flex: 1,
    padding: 10,
    paddingTop: Display.setHeight(5),
    //backgroundColor: Colors.DEFAULT_GREEN,
    backgroundColor: "transparent",
    //marginTop: 30,
    width: Display.setWidth(100),
    // height: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 100,
    // zIndex: -2,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    width: Display.setWidth(80),
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Poppins_700Bold",
  },
});
const GoogleMapScreen = ({ navigation }) => {
  const toast = useToast();
  const [address, setAddress] = React.useState("");
  const state = useSelector((state) => state);
  const [coordinate, setCoordinate] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const dispatch = useDispatch();

  const sendLocation = () => {
    const requestBody = {
      user_id: state.auth.user.id,
      coord: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
      location_name: address,
    };

    console.log(requestBody);
    dispatch(addLocation(requestBody)).then((res) => {
      if (res.payload.success) {
        console.log(res.payload.success, "success");

        toast.show(res.payload.message, {
          type: "success",
          placement: "top",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
        navigation.navigate("HomeScreen");
      }
    });
  };

  useEffect(() => {
    if (address !== "") {
      sendLocation();
    }
  }, [address]);

  const [marginBottom, setMarginBottom] = React.useState({
    marginBottom: 1,
  });
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "App Location Permission",
          message:
            "ShareYourMeal App needs access to your Location " +
            "For the sake of google Map.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const grantedFurther =
          await Location.requestForegroundPermissionsAsync();
        if (grantedFurther.granted) {
          console.log("You can use the Location");
          console.log(grantedFurther);
          const location = await Location.getCurrentPositionAsync({});
          setCoordinate({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          });
        }
        console.log("You can use the Location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getUserLocation = () => {
    Geocoder.init("AIzaSyD7yeIwcSVjo56iT0chVGt7mzgD58hln3E"); // use a valid API key

    Geocoder.from(coordinate.latitude, coordinate.longitude)
      .then((json) => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
        console.log(addressComponent);
      })
      .catch((error) => console.warn(error));
  };

  const fetchCoordinates = async (data, detail) => {
    try {
      const placeId = detail.place_id;
      const apiKey = "AIzaSyD7yeIwcSVjo56iT0chVGt7mzgD58hln3E"; // Replace with your actual API key

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`
      );

      console.log(response);
      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinate({
          latitude: lat,
          longitude: lng,
        });
      } else {
        console.log("Error occurred while retrieving coordinates.");
      }
    } catch (error) {
      console.log("Error occurred while making the API request:", error);
    }
  };

  enableLatestRenderer();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            styles={{ zindex: 1 }}
            placeholder="Search"
            query={{
              key: "AIzaSyD7yeIwcSVjo56iT0chVGt7mzgD58hln3E",
              language: "en", // language of the results
            }}
            onPress={(data, details = null) => {
              console.log(details, "detail");

              fetchCoordinates(data, details);
            }}
            onFail={(error) => console.error(error)}
            // requestUrl={{
            //   url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
            //   useOnPlatform: "web",
            // }} // this in only required for use on the web. See https://git.io/JflFv more for details.
          />
        </View>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[styles.map]}
          region={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsMyLocationButton={true}
          showsUserLocation={true}
          // onMapReady={() => {setMarginBottom({ marginBottom: 0 })}}
          onRegionChangeComplete={(region) => {
            console.log("region", region);
            setCoordinate({
              longitude: region.longitude,
              latitude: region.latitude,
            });
          }}
          onMapReady={() => {
            setMarginBottom({ marginBottom: 0 });
          }}>
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
        <TouchableOpacity onPress={getUserLocation} style={styles.signinButton}>
          <Text style={styles.signinButtonText}>Confirrm</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default GoogleMapScreen;
