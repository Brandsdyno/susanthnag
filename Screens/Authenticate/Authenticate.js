import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { images } from "../../constants";
import {
  ThemedView,
  StatusBar,
  TextInputWithLabel,
  BorderRoundedButton,
} from "../../components/UIcomponents";
import Loader from "../../components/UIcomponents/Loader";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setSignInData } from "../../Store/Slices/SignIn";
export default function Authenticate({}) {
  const { width, height } = useWindowDimensions();
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoaderOn, setIsLoaderOn] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  async function sendOtpHandler() {
    console.log(`+91${mobileNumber}`);
    if (mobileNumber?.length === 10) {
      try {
        setIsLoaderOn(true);
        const res = await axios.post(
          "https://brandsdyno.com/shadow/api/login",
          {
            mobileNumber: `+91${mobileNumber}`,
          }
        );
        const data = await res.data;
        console.log({ data });
        if (data?.msg) {
          navigation.navigate("OTPVerificationScreen", {
            mobileNum: mobileNumber,
          });
        }
      } catch (error) {
        Alert.alert("something wrong");
      }
    } else {
      Alert.alert("Enter valid Number");
    }
  }

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        dispatch(setSignInData({ userId: value, status: "success" }));
      }
    } catch (e) {}
  };

  useLayoutEffect(() => {
    getUserId();
  }, []);

  return (
    <>
      <StatusBar />
      <ThemedView>
        <ScrollView style={[styles.main, { height: height }]}>
          <View style={styles.logo}>
            <Image
              source={images.logo}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View style={styles.s_img}>
            <Image source={images.signupImg} />
          </View>
          <View style={styles.form}>
            <TextInputWithLabel
              label={"Enter Your Mobile Number"}
              inputStyle={{
                borderBottomWidth: 2,
                borderBottomColor: "#BFA05E",
                backgroundColor: "transparent",
                paddingLeft: 10,
                fontSize: 18,
                textAlign: "center",
              }}
              placeholder={"Enter mobile number"}
              value={mobileNumber}
              onChangeText={(e) => {
                setMobileNumber(e);
              }}
              labelStyle={{
                fontSize: 20,
                fontWeight: 400,
                textAlign: "center",
              }}
              type="numeric"
            />

            <View
              style={{
                marginTop: 50,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                By Continuing you may receive an SMS for Verification
              </Text>
              <BorderRoundedButton
                label={"Log In/Sign Up"}
                buttonStyle={{
                  backgroundColor: "#BFA05E",
                  border: 0,
                }}
                labelStyle={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: "700",
                  fontFamily: "Inter",
                }}
                onPress={sendOtpHandler}
              />
            </View>
          </View>
          {/* <Loader isVisible={true}/> */}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    // flexDirection : 'column',
    gap: 30,
    // justifyContent : 'center'
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 90,
    alignSelf: "center",
    marginVertical: 20,
  },
  s_img: {
    alignSelf: "center",
    marginVertical: 20,
  },
  form: {
    width: "100%",
    alignSelf: "center",
    marginTop: 30,
    paddingHorizontal: 30,
  },
});
