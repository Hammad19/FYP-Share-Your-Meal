import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {enableLatestRenderer} from 'react-native-maps';
import React from 'react';
import { Colors, Images } from "../content";
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
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
  enableLatestRenderer();
  return(
    <>
    <View style={styles.container}>
    <MapView
     provider= {PROVIDER_DEFAULT} // remove if not using Google Maps
      style={styles.map}
      region={{
        latitude: coordinate.latitude,
        longitude : coordinate.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      onRegionChange={(region) =>{
        console.log("region", region);
        setCoordinate({longitude: region.longitude, latitude: region.latitude});
      }}


    > 
    <Marker coordinate={{
      latitude: coordinate.latitude,
      longitude : coordinate.longitude,
    }}
    // draggable={true}
    // onDragStart={(e) => console.log('onDragStart', e.nativeEvent.coordinate)}
    // onDragEnd={(e) => setCoordinate({longitude: e.nativeEvent.coordinate.longitude, longitude: e.nativeEvent.coordinate.longitude})}
    />  
    </MapView>
      </View>
      </>
  );
     
}

export default GoogleMapScreen;
   
;