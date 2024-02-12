import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Pressable,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import {
  ThemedView,
  StatusBar,
  TextInputWithLabel,
  BorderRoundedButton,
} from "../../components/UIcomponents";
import useIsFocused from "../../useIsFocused";
import { PermissionStatus } from "expo-contacts";
import { images } from "../../constants";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../components/UIcomponents/Loader";
import BackGroundImage from "../BackGroundImage";
export default function AddContacts() {
  const focued = useIsFocused();

  const [contacts, setContacts] = useState([]);
  const userId = useSelector((state) => state.signIn.userId);
  const [isLoaderOn, setIsLoaderOn] = useState(false);

  const [didYouGotAllContacts, setDidYouGotAllContacts] = useState(false);

  const [isSelectedModeOn, setIsSelectedModeOn] = useState(false);
  const [isSecondaryModalOn, setIsSecondaryModalOn] = useState(false);

  const [primaryUnSelectedContacts, setPrimaryUnSelectedContacts] = useState(
    []
  );
  const [secondaryUnSelectedContacts, setSecondaryUnselectedContacts] =
    useState([]);

  const [isContactIdAvailable, setIsContactIdAvailable] = useState(false);
  const [selectedContacts_p, setSelectedContacts_p] = useState([]);
  const [selectedContacts_s, setSelectedContacts_s] = useState([]);

  // From api
  const [primaryContacts, setPrimaryContacts] = useState([]);
  const [secondaryContacts, setSecondaryContacts] = useState([]);

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  // From api>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function getContactsfromApi() {
    try {
      const res = await axios.get(
        `https://brandsdyno.com/shadow/api/getContacts/${userId}`
      );
      const data = await res.data;
      console.log({ res }, "API");
      if (data) {
        setContacts(data);
      }
      if (res?.status == 400) {
        console.log("400 CAME");
      }
    } catch (error) {
      console.log({ error }, "k");
    }
  }
  async function getPrimaryContact() {
    try {
      const res = await axios.get(
        `https://brandsdyno.com/shadow/api/getPrimary/${userId}`
      );
      const data = await res.data;
      if (data) {
        setSelectedContacts_p(data);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function getSecondaryContact() {
    try {
      const res = await axios.get(
        `https://brandsdyno.com/shadow/api/getSecondary/${userId}`
      );
      const data = await res.data;
      if (data) {
        setSelectedContacts_s(data);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  // const storeContactsId = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("contactId", value);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  // const getContactsId = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("contactId");
  //     if (value !== null || value !== "") {
  //       setIsContactIdAvailable(true);
  //     }else{

  //     }
  //   } catch (e) {}
  // };

  useEffect(() => {
    if (focued) {
      getContactsfromApi();
      getPrimaryContact();
      getSecondaryContact();
    }
  }, [focued]);

  // Primary contacts select handler
  function contactSelectHandler(item) {
    let checkIsExist = selectedContacts_p?.find(
      (each) => each.contactId == item.contactId
    );
    if (checkIsExist) {
      let afterRemove = selectedContacts_p.filter(
        (each) => each.contactId !== item.contactId
      );

      setSelectedContacts_p(afterRemove);
    } else {
      setSelectedContacts_p((prv) => [...prv, item]);
    }
  }

  // Secondary contacts select handler
  function getSecondaryContactsHandler(item) {
    let checkIsExist = selectedContacts_s?.find(
      (each) => each.contactId == item.contactId
    );
    if (checkIsExist) {
      let afterRemove = selectedContacts_s?.filter(
        (each) => each.contactId !== item.contactId
      );
      setSelectedContacts_s(afterRemove);
    } else {
      setSelectedContacts_s((prv) => [...prv, item]);
    }
  }

  // sending data to backend
  async function sendPrimaryContactToBackend() {
    setIsSelectedModeOn(false);
    try {
      setIsLoaderOn(true);
      let ids = [];
      selectedContacts_p?.forEach((each) => {
        ids.push(each.contactId);
      });
      const res = await axios.post(
        "https://brandsdyno.com/shadow/api/addPrimary",
        {
          userId: userId,
          contactId: ids,
        }
      );
      const data = await res.data;
      if (data) {
        setIsLoaderOn(false);
        Alert.alert("Primary contacts Updated Successfully");
      }
    } catch (error) {
      setIsLoaderOn(false);
      Alert.alert("something wrong");
      console.log({ error }, "GGG");
    }
  }
  // sending secondary contacts data to backend
  async function sendSecondaryContactToBackend() {
    setIsSecondaryModalOn(false);
    try {
      setIsLoaderOn(true);
      let ids = [];
      selectedContacts_s?.forEach((each) => {
        ids.push(each.contactId);
      });
      const res = await axios.post(
        "https://brandsdyno.com/shadow/api/addSecondary",
        {
          userId: userId,
          contactId: ids,
        }
      );
      const data = await res.data;
      if (data) {
        setIsLoaderOn(false);
        Alert.alert("Secondary contacts Updated Successfully");
      }
    } catch (error) {
      setIsLoaderOn(false);
      console.log({ error }, "GGG");
    }
  }

  async function addContact() {
    let checkIsthisNumberExists = contacts?.find((each) =>
      each?.mobileNumber.includes(mobileNumber)
    );
    if (checkIsthisNumberExists) {
      Alert.alert("Given moblie number already exist");
    } else {
      if (name?.length > 1 && mobileNumber?.length === 12) {
        console.log(name, `+${mobileNumber}`);
        try {
          const res = await axios.post(
            "https://brandsdyno.com/shadow/api/addContacts",
            {
              userId: userId,
              contacts: [
                {
                  firstName: name ?? "",
                  lastName: "" ?? "",
                  mobileNumber: `+${mobileNumber}` ?? "",
                },
              ],
            }
          );
          if (res) {
            console.log({ res });
            Alert.alert("Mobile Number Added to contacts Successfully");
            setName("");
            setMobileNumber("");
          }
        } catch (error) {
          console.log({ error }, "KLUUU");
          Alert.alert("Something wrong while adding");
        }
      } else {
        Alert.alert(
          "Mobile number should enter with 91 and total number should be 12 digits"
        );
      }
    }
  }

  return (
    <React.Fragment>
      <StatusBar />
      <ThemedView>
        <ScrollView style={styles.main} nestedScrollEnabled={false}>
        <ImageBackground source={images.bgImage} resizeMode="cover" style={styles.image} >

          <View style={styles.logo}>
            <Image
              source={images.logo}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.primaryBox}>
            <Text style={styles.title}>Primary contacts</Text>
            {/* {selectedContacts_p?.length <= 0 ? ( */}
            {selectedContacts_p?.length <= 10 && (
              <TouchableOpacity
                style={{
                  marginHorizontal: 12,
                  marginVertical: 12,
                }}
                onPress={() => setIsSelectedModeOn(true)}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: "Inter",
                    textAlign: "center",
                  }}
                >
                  Click here to Add Primary Contacts +
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.secondaryBox}>
            <Text style={styles.title}>Secondary contacts</Text>
            {/* {selectedContacts_s?.length <= 0 ? ( */}
            {selectedContacts_s?.length < 99 && (
              <TouchableOpacity
                style={{
                  marginHorizontal: 12,
                  marginVertical: 20,
                }}
                onPress={() => setIsSecondaryModalOn(true)}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: "Inter",
                    textAlign: "center",
                  }}
                >
                  Click here to Add Secondry Contacts +
                </Text>
              </TouchableOpacity>
            )}
            {/* ) : ( */}

            {/* )} */}
          </View>

          <View style={styles.addNumberForm}>
            <View
              style={{
                backgroundColor: "#E9E3E3",
                paddingVertical: 12,
                paddingHorizontal: 24,
                marginTop: 30,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "800",
                }}
              >
                Add Number
              </Text>
            </View>
            <View
              style={{
                width: "80%",
              }}
            >
              <TextInputWithLabel
                label={""}
                inputStyle={[styles.inputStyles, { marginBottom: 6 }]}
                labelStyle={[styles.labelStyles, { marginBottom: 0 }]}
                value={name}
                onChangeText={(e) => {
                  setName(e);
                }}
                editBtn={false}
                editable={true}
                placeholder={"Enter name"}
                containerStyle={{
                  marginBottom: 0,
                }}
              />
              <TextInputWithLabel
                label={""}
                inputStyle={[styles.inputStyles]}
                labelStyle={[styles.labelStyles, { marginBottom: 0 }]}
                value={mobileNumber}
                onChangeText={(e) => {
                  setMobileNumber(e);
                }}
                editBtn={false}
                editable={true}
                placeholder={"Enter number"}
                containerStyle={{
                  marginBottom: 30,
                }}
              />

              <BorderRoundedButton
                label={"Add"}
                labelStyle={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "white",
                }}
                buttonStyle={{
                  backgroundColor: "#BFA05E",
                  width: 189,
                  alignSelf: "center",
                  marginBottom: 40,
                  marginTop: 0,
                }}
                onPress={addContact}
              />
            </View>
          </View>
          </ImageBackground>
        </ScrollView>

        {/* Primary */}
        <Modal
          visible={isSelectedModeOn}
          children={
            <View
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  backgroundColor: "green",
                  width: 80,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  // opacity: selectedContacts_p?.length > 0 ? 1 : 0.3,
                }}
                onPress={(e) => {
                  e.stopPropagation();
                  sendPrimaryContactToBackend();
                }}
                // disabled={selectedContacts_p?.length > 0 ? false : true}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Enter
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 100,
                  top: 10,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  width: 80,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                onPress={(e) => {
                  e.stopPropagation();
                  sendPrimaryContactToBackend();
                  setIsSelectedModeOn(false);
                }}
                // disabled={selectedContacts_p?.length > 0 ? false : true}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity> */}

              {contacts?.length > 0 && (
                <FlatList
                  data={contacts}
                  renderItem={({ item,index }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          marginVertical: 12,
                          borderBottomWidth: 0.3,
                          paddingVertical: 8,
                          paddingHorizontal: 8,
                        }}
                        onPress={(e) => {
                          e.stopPropagation();
                          contactSelectHandler(item);
                        }}
                        key={index}
                      >
                        <Text
                          style={{
                            color: selectedContacts_p.find(
                              (each) => each.contactId == item.contactId
                            )
                              ? "green"
                              : "black",
                          }}
                        >
                          {item.firstName} {item.lastName} -{" "}
                          {item?.mobileNumber ?? "Null"}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item,index) => `${index}`}
                  style={{
                    paddingTop: 30,
                  }}
                />
              )}
            </View>
          }
        />
        {/* Secondary */}
        <Modal
          visible={isSecondaryModalOn}
          children={
            <View
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  backgroundColor: "green",
                  width: 80,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  // opacity: selectedContacts_s?.length > 0 ? 1 : 0.3,
                }}
                onPress={(e) => {
                  e.stopPropagation();
                  sendSecondaryContactToBackend();
                }}
                // disabled={selectedContacts_s?.length > 0 ? false : true}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Enter
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 100,
                  top: 10,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  width: 80,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                onPress={(e) => {
                  e.stopPropagation();
                  sendSecondaryContactToBackend();
                  setIsSecondaryModalOn(false);
                }}
                // disabled={selectedContacts_p?.length > 0 ? false : true}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity> */}

              {contacts?.length > 0 && (
                <FlatList
                  data={contacts}
                  renderItem={({ item,index }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          marginVertical: 12,
                          borderBottomWidth: 0.3,
                          paddingVertical: 8,
                          paddingHorizontal: 8,
                        }}
                        onPress={(e) => {
                          e.stopPropagation();
                          getSecondaryContactsHandler(item);
                        }}
                        key={index}
                      >
                        <Text
                          style={{
                            color: selectedContacts_s?.find(
                              (each) => each.contactId == item.contactId
                            )
                              ? "green"
                              : "black",
                          }}
                        >
                          {item.firstName} {item.lastName} -{" "}
                          {item?.mobileNumber ?? "Null"}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item,index) => `${index}`}
                  style={{
                    paddingTop: 30,
                  }}
                />
              )}
            </View>
          }
        />
        {/* Loader */}
        <Loader isVisible={isLoaderOn} />
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
  primaryBox: {
    width: 309,
    height: 138,
    backgroundColor: "#E9E3E3",
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  secondaryBox: {
    width: 309,
    height: 138,
    backgroundColor: "#E9E3E3",
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  addNumberForm: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyles: {
    borderWidth: 0,
    borderRadius: 100,
    backgroundColor: "#EDE9E9",
    color: "black",
    height: 44,
    paddingLeft: 12,
    fontSize: 16,
  },
  labelStyles: {
    fontSize: 24,
    fontWeight: "800",
    fontFamily: "Inter",
  },
});
