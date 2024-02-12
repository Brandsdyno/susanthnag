import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView, StatusBar } from "../../components/UIcomponents";
import { images } from "../../constants";
import { height } from "../../constants/metrics";
import useIsFocused from "../../useIsFocused";
import * as Location from "expo-location";
import { getLocationStaticImage } from "../../helpers";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSignInData } from "../../Store/Slices/SignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from "expo-contacts";
import BackGroundImage from "../BackGroundImage";
// import * as Geocoding from "expo-geocoding";

export default function Home({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [locationImage, setLocationImage] = useState(null);
  const focused = useIsFocused();

  const [contacts, setContacts] = useState([]);

  const dispatch = useDispatch();

  console.log({ focused }, "HOME");

  const userId = useSelector((state) => state.signIn.userId);

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        dispatch(setSignInData({ userId: value, status: "success" }));
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (focused) {
      if (userId == "") {
        getUserId();
      }
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        try {
          const res = await axios.get(
            `https://brandsdyno.com/shadow/api/getContacts/${userId}`
          );
          const data = await res.data;
          if (data?.length <= 0) {
            (async () => {
              let contacts = [];
              const { status } = await Contacts.requestPermissionsAsync();
              if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                  fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
                });
                console.log(data[10], "L");
                for (let i = 0; i < data?.length; i++) {
                  contacts.push({
                    firstName: data[i]?.firstName ?? "",
                    lastName: data[i]?.lastName ?? "",
                    mobileNumber: data[i]?.phoneNumbers?.[0]?.number ?? "",
                  });
                }
                try {
                  console.log("UUUUUUUUUUUUUUUUUUU");
                  const res = await axios.post(
                    "https://brandsdyno.com/shadow/api/addContacts",
                    {
                      userId: userId,
                      contacts: contacts,
                    }
                  );
                  console.log({ res }, "HHHHHH");
                } catch (error) {
                  console.log({ error }, "KLUUU");
                }
              }
            })();
          }
        } catch (error) {
          console.log({ error }, "k");
          (async () => {
            let contacts = [];
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
              const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
              });
              console.log(data[10], "L");
              for (let i = 0; i < data?.length; i++) {
                contacts.push({
                  firstName: data[i]?.firstName ?? "",
                  lastName: data[i]?.lastName ?? "",
                  mobileNumber: data[i]?.phoneNumbers?.[0]?.number ?? "",
                });
              }
              try {
                console.log("UUUUUUUUUUUUUUUUUUU");
                const res = await axios.post(
                  "https://brandsdyno.com/shadow/api/addContacts",
                  {
                    userId: userId,
                    contacts: contacts,
                  }
                );
                console.log({ res }, "HHHHHH");
              } catch (error) {
                console.log({ error }, "KLUUU");
              }
            }
          })();
        }
      })();
    }
  }, [focused]);

  // let Apikey = `AIzaSyDXiHUq3ozEsO67HvJw-F2rt8UOfmOBYN8`;

  async function locationHandler() {
    let location = await Location.getCurrentPositionAsync({});
    // console.log({ location });

    // let url = `https://www.google.com/maps?q=${location?.coords?.latitude},${location?.coords?.longitude}`;

    // const supported = await Linking.canOpenURL(url);

    // if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    // await Linking.openURL(url);
    // } else {
    //   Alert.alert(`Don't know how to open this URL: ${url}`);

    // }

    if (location) {
      console.log("YES ENTERED");
      let image = getLocationStaticImage(
        location?.coords?.latitude,
        location?.coords?.longitude
      );
      try {
        const res = await axios.post(
          "https://brandsdyno.com/shadow/api/sendLocation",
          {
            userId: userId,
            lat: location?.coords?.latitude,
            lon: location?.coords?.longitude,
          }
        );
        const data = await res.data;
        console.log(data, "kkkk");
        if (data) {
          Alert.alert(data?.msg);
        }
      }catch(error) {
        Alert.alert("Somthing went wrong OR you should add primary contacts");
        console.log({ error });
      }
    } else {
      Alert.alert("Location not detected");
    }

    // async function getContactsfromApi() {
    //   try {
    //     const res = await axios.get(
    //       `https://brandsdyno.com/shadow/api/getContacts/${userId}`
    //     );
    //     const data = await res.data;
    //     console.log({ res }, "API");
    //     if (data) {
    //       setContacts(data);
    //     }
    //   } catch (error) {
    //     console.log({ error }, "k");
    //   }
    // }

    // async function getUserContacts() {
    //   console.log("AHHHHHHHHH");
    // }

    // if (image) {
    // setLocationImage(image);

    // }
    // https://cmschamps.com/shadow/api/sendLocation

    // const reverseGeocode = async () => {
    //   if (location) {
    //     try {
    //       // Reverse geocode coordinates to address
    //       // const locationAddress = await Location.reverseGeocodeAsync({
    //       //   latitude: location.latitude,
    //       //   longitude: location.longitude,
    //       // });

    //       setAddress(locationAddress);
    //     } catch (error) {
    //       console.error("Error reverse geocoding:", error);
    //     }
    //   }
    // };

    // reverseGeocode();
  }
  locationHandler()

  useEffect(() => {}, [focused]);

  return (
    <React.Fragment>
      <StatusBar />
      <ThemedView>
        <View style={styles.main}>
          <ScrollView>
          <ImageBackground source={images.bgImage} resizeMode="cover" style={styles.image} >
            <View style={styles.logo}>
              <Image
                source={images.logo}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            <View style={styles.btns}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                <Text style={styles.btn_name}>Profile Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate("AddContacts");
                }}
              >
                <Text style={styles.btn_name}>Add Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate("Contacts");
                }}
              >
                <Text style={styles.btn_name}>View Contacts</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginTop: 30,
                marginRight: 30,
                width: 100,
                height: 100,
                overflow: "hidden",
              }}
              // onPress={locationHandler}
            >
              <Image
                source={images.shadowHelp}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </TouchableOpacity>
            </ImageBackground>
          </ScrollView>
        </View>
      </ThemedView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    height: height,
  },
  logo: {
    width: 188,
    height: 188,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  btns: {
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    minWidth: 244,
    minHeight: 68,
    backgroundColor: "#BFA05E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 109,
  },
  btn_name: {
    color: "white",
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "400",
  },
});
