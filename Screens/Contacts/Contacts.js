import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView, StatusBar } from "../../components/UIcomponents";
import { images } from "../../constants";
import { useSelector } from "react-redux";
import useIsFocused from "../../useIsFocused";
import axios from "axios";
import Loader from "../../components/UIcomponents/Loader";
import BackGroundImage from "../BackGroundImage";
export default function Contacts() {
  const userId = useSelector((state) => state.signIn.userId);
  const focued = useIsFocused();
  const [primaryContacts, setPrimaryContacts] = useState([]);
  const [secondaryContacts, setSecondaryContacts] = useState([]);

  const [isLoderOn, setIsLoaderOn] = useState(false);

  async function getPrimaryContact() {
    try {
      const res = await axios.get(
        `https://brandsdyno.com/shadow/api/getPrimary/${userId}`
        // {
        //   userId: userId,
        // }
        // config
      );
      const data = await res.data;
      if (data) {
        setPrimaryContacts(data);
      }
    } catch (error) {
      console.log({ error });
      // Alert.alert("something wrong with primary contacts");
    }
  }

  async function getSecondaryContact() {
    try {
      const res = await axios.get(
        `https://brandsdyno.com/shadow/api/getSecondary/${userId}`
      );
      const data = await res.data;
      if (data) {
        setSecondaryContacts(data);
      }
    } catch (error) {
      console.log({ error });
      // Alert.alert("something wrong with secondary contacts");
    }
  }

  useEffect(() => {
    if (focued) {
      setIsLoaderOn(true);
      getPrimaryContact();
      getSecondaryContact();
      setIsLoaderOn(false);
    }
  }, [focued]);

  return (
    <React.Fragment>
      <StatusBar />
      <ThemedView>
        <ScrollView style={styles.main} nestedScrollEnabled={false}>
        <ImageBackground source={images.bgImage} resizeMode="cover" style={styles.image} >

        <BackGroundImage />
          <View style={styles.logo}>
            <Image
              source={images.logo}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.primaryBox}>
            <Text style={styles.title}>Primary contacts</Text>
            <ScrollView nestedScrollEnabled={true}>

              {primaryContacts?.length > 0 &&
                primaryContacts?.map((item, index) => {
                  return (
                    <View
                      style={{
                        marginVertical: 12,
                        marginLeft: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: "#BFA05E",
                        paddingVertical: 6,
                      }}
                      key={index}
                    >
                      <Text style={{ color: "black" }}>{item?.firstName}</Text>
                      <Text style={{ color: "black" }}>
                        {item?.mobileNumber}
                      </Text>
                    </View>
                  );
                })}

              {/* (
                <FlatList
                  data={primaryContacts}
                  scrollEnabled={true}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          marginVertical: 12,
                          marginLeft: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: "#BFA05E",
                          paddingVertical: 6,
                        }}
                      >
                        <Text style={{ color: "black" }}>
                          {item?.firstName}
                        </Text>
                        <Text style={{ color: "black" }}>
                          {item?.mobileNumber}
                        </Text>
                      </View>
                    );
                  }}
                />
              )} */}
            </ScrollView>
          </View>
          <View style={styles.secondaryBox}>
            <Text style={styles.title}>Secondary contacts</Text>
            <ScrollView nestedScrollEnabled={true}>
              {secondaryContacts?.length > 0 &&
                secondaryContacts?.map((item, index) => {
                  return (
                    <View
                      style={{
                        marginVertical: 12,
                        marginLeft: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: "#BFA05E",
                        paddingVertical: 6,
                      }}
                      key={index}
                    >
                      <Text style={{ color: "black" }}>{item?.firstName}</Text>
                      <Text style={{ color: "black" }}>
                        {item.mobileNumber}
                      </Text>
                    </View>
                  );
                })}

              {/* <FlatList
                  data={secondaryContacts}
                  scrollEnabled={true}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          marginVertical: 12,
                          marginLeft: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: "#BFA05E",
                          paddingVertical: 6,
                        }}
                      >
                        <Text style={{ color: "black" }}>
                          {item?.firstName}
                        </Text>
                        <Text style={{ color: "black" }}>
                          {item.mobileNumber}
                        </Text>
                      </View>
                    );
                  }}
                /> */}
            </ScrollView>
          </View>
          <Loader isVisible={isLoderOn} />
          </ImageBackground>
        </ScrollView>
      </ThemedView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: "gray",
    borderRadius: 90,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: "black",
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#BFA05E",
    paddingVertical: 8,
    maxWidth: "80%",
    marginLeft: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  primaryBox: {
    width: 309,
    height: 306,
    backgroundColor: "#EDE9E9",
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 20,
  },
  secondaryBox: {
    width: 309,
    height: 306,
    backgroundColor: "#EDE9E9",
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
});
