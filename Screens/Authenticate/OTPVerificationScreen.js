import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { images } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ThemedView,
  StatusBar,
  TextInputWithLabel,
  BorderRoundedButton,
} from "../../components/UIcomponents";
import axios from "axios";
import { setSignInData } from "../../Store/Slices/SignIn";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function OTPVerificationScreen({ route}) {
  const { width, height } = useWindowDimensions();
  // const [mobileNumber, setMobileNumber] = useState("");

  const { mobileNum } = route.params;

  const navigation = useNavigation()

  const dispatch = useDispatch();

  console.log({ mobileNum });

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  // const ref5 = useRef(null);
  // const ref6 = useRef(null);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  // const [otp5, setOtp5] = useState("");
  // const [otp6, setOtp6] = useState("");

  const storeUserId = async (value) => {
    try {
      await AsyncStorage.setItem("userId", value);
      dispatch(setSignInData({ userId:value, status: "success" }));
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    if (otp1 !== "") {
      ref2.current.focus();
    }
    if (otp2 !== "") {
      ref3.current.focus();
    }
    if (otp3 !== "") {
      ref4.current.focus();
    }
    // if (otp4 !== "") {
    //   ref5.current.focus();
    // }
    // if (otp5 !== "") {
    //   ref6.current.focus();
    // }
  }, [otp1, otp2, otp3, otp4]);

  async function otpSubmitHandler() {
    console.log(`+91${mobileNum}`);
    if (otp1 !== "" && otp2 !== "" && otp3 !== "" && otp4 !== "") {
      // navigation.navigate("Home");
      let otp = `${otp1}${otp2}${otp3}${otp4}`;

      try {
        // setIsLoaderOn(true);
        const res = await axios.post(
          "https://brandsdyno.com/shadow/api/validateOTP",
          {
            mobileNumber: `+91${mobileNum}`,
            otp: otp,
          }
        );
        const data = await res.data;
        console.log({ data },"k");
        if (data?.userId) {
          storeUserId(data?.userId);
          navigation.navigate("BottomTabNavigator")
        } else {
          dispatch(setSignInData({ userId: "", status: "failed" }));
        }
      } catch (error) {
        // setIsLoaderOn(false);
        // storeUserId('2');
        Alert.alert("Somthing wrong please try again by resend otp")
        console.log({ error });
        // Alert.alert("something wrong");
      }
    } else {
      Alert.alert("Please Enter Otp");
    }
  }
  async function reSendOtpHandler() {
    try {
      const res = await axios.post("https://brandsdyno.com/shadow/api/login", {
        mobileNumber: `+91${mobileNum}`,
      });
      const data = await res.data;
      if (data?.msg) {
        Alert.alert(`SMS Sent Successfully`);
      }
    } catch (error) {
      console.log({ error });
      Alert.alert("something wrong");
    }
  }
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
            <Image source={images.otpImg} />
          </View>
          <View style={styles.form}>
            <View style={styles.inputWithBtn}>
              <View style={styles.otpBoxes}>
                <View style={styles.otpBox}>
                  <TextInput
                    style={styles.otp}
                    keyboardType="number-pad"
                    value={otp1}
                    maxLength={1}
                    onChangeText={(e) => {
                      setOtp1(e);
                    }}
                    ref={ref1}
                  />
                </View>
                <View style={styles.otpBox}>
                  <TextInput
                    style={styles.otp}
                    keyboardType="number-pad"
                    value={otp2}
                    maxLength={1}
                    onChangeText={(e) => {
                      setOtp2(e);
                    }}
                    ref={ref2}
                  />
                </View>
                <View style={styles.otpBox}>
                  <TextInput
                    style={styles.otp}
                    keyboardType="number-pad"
                    value={otp3}
                    maxLength={1}
                    onChangeText={(e) => {
                      setOtp3(e);
                    }}
                    ref={ref3}
                  />
                </View>
                <View style={styles.otpBox}>
                  <TextInput
                    style={styles.otp}
                    keyboardType="number-pad"
                    value={otp4}
                    maxLength={1}
                    onChangeText={(e) => {
                      setOtp4(e);
                    }}
                    ref={ref4}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 50,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BorderRoundedButton
                label={"VERIFY"}
                buttonStyle={{
                  backgroundColor: "#5CC760",
                  border: 0,
                  width: 163,
                }}
                labelStyle={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: "700",
                  fontFamily: "Inter",
                }}
                onPress={otpSubmitHandler}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  alignSelf: "center",
                }}
              >
                Didn’t Receive the code?{" "}
                <TouchableOpacity
                  onPress={reSendOtpHandler}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      alignSelf: "center",
                      color: "blue",
                    }}
                  >
                    Resend
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
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
  inputWithBtn: {
    width: "100%",
    flexDirection: "column",
  },
  otpBoxes: {
    width: "100%",
    flexDirection: "row",

    gap: 12,
    justifyContent: "center",
  },
  otpBox: {
    width: 35,
    height: 35,
    backgroundColor: "#BFA05E",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
