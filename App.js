import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-web';
import { Dimensions } from 'react-native';
import React,{ useState, useEffect } from 'react';
import * as Location from 'expo-location';

const SCREEN_WIDTH = Dimensions.get("window").width;

const getGoogleMapGeocode = async (latitude, longitude)=>{
  const apikey = process.env.EXPO_PUBLIC_API_KEY;

  try{
    const response= await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikey}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch(error){
    console.error("구글 맵 API 호출 실패: "+error);
    return null;
  }
  
}

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState(null);

  const [permitted,setPermitted] = useState(true);

  const locationData = async()=>{
    const {granted} = await Location.requestForegroundPermissionsAsync();

    if(!granted){
      setPermitted(false);
      setErrorMsg("위치에 대한 권한 부여가 거부 되었습니다.");

      return;
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    //console.log("coords:", latitude, longitude);

    const address = await getGoogleMapGeocode(latitude, longitude);
    console.log(address);
    console.log(address.results[4].formatted_address);

    const cityAddress = address.results[4].formatted_address;
    const citySplit = cityAddress.split(" ");
    console.log(citySplit);

    const city = `${citySplit[1]}${citySplit[2]}${citySplit[3]}`
    setCity(city);
    return;
  }

  useEffect(() => {
    locationData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.cityCon}>
        <Text style={styles.city}>{city}</Text>
      </View>
      <View style={styles.regDateCon}>
        <Text style={styles.regDate}>9월 21일, 일, 11:14</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal style={styles.weather}>
      <View style={styles.weatherInner}>
        <View style={styles.day}>
          <Text style={styles.desc}>맑음</Text>
        </View>
        <View style={styles.tempCon}>
          <Text style={styles.temp}>24</Text>
        </View>
      </View>
      <View style={styles.weatherInner}>
        <View style={styles.day}>
          <Text style={styles.desc}>맑음</Text>
        </View>
        <View style={styles.tempCon}>
          <Text style={styles.temp}>24</Text>
        </View>
      </View>
      <View style={styles.weatherInner}>
        <View style={styles.day}>
          <Text style={styles.desc}>맑음</Text>
        </View>
        <View style={styles.tempCon}>
          <Text style={styles.temp}>24</Text>
        </View>
      </View>
      <View style={styles.weatherInner}>
        <View style={styles.day}>
          <Text style={styles.desc}>맑음</Text>
        </View>
        <View style={styles.tempCon}>
          <Text style={styles.temp}>24</Text>
        </View>
      </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffe01a",
  },
  cityCon: {
    flex: 0.3,
  },
  city:{
    flex:1,
    marginTop:50,
    paddingTop:20,
    fontSize:30,
    textAlign:"center",
    fontWeight:"600",
  },
  weatherInner:{
    flex: 3,
    width:SCREEN_WIDTH,
  },
  day:{
    flex:0.2,
    alignItems:"center",
    justifyContent:"center",
  },
  regDateCon:{
    alignItems:"center",
  },
  regDate:{
    paddingTop:10,
    paddingRight:20,
    paddingLeft:20,
    paddingBottom:15,
    backgroundColor:"black",
    color:"white",
    fontWeight:"bold",
    borderRadius:20,
    overflow:"hidden",
  },
  desc:{
    flex:1.5,
    marginTop:20,
    fontSize:25,
    fontWeight:"bold",
  },
  tempCon:{
    flex:0.3,
    alignItems:"center",
    justifyContent:"center", 
  },
  temp:{
    fontSize:120,
  }
});
