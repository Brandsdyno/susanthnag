import React, { useLayoutEffect, useEffect, useState,View,Text } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { useSelector } from "react-redux";
import Authenticate from "../Screens/Authenticate/Authenticate";
import OTPVerificationScreen from "../Screens/Authenticate/OTPVerificationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileEditScreen from "../Screens/Profile/ProfileEditScreen";

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const userIdFromState = useSelector((state) => state.signIn.userId);

  const [userId, setUserId] = useState("");

  async function deleteUserId() {
    await AsyncStorage.removeItem("userId");
  }

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        setUserId(value);
      }
    } catch (e) {}
  };
  useEffect(() => {
    getUserId();
    return () => {
      // deleteUserId();
      console.log("");
    };
  }, [userId, userIdFromState]);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
          },
        }}
      >
        {userIdFromState ? (
          <>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
              
            }}
          />
          <Stack.Screen
              name="ProfileEditScreen"
              component={ProfileEditScreen}
              options={{
                headerShown: true,
              }}
            />
         
         
            </>
        ) : (
          <>
            <Stack.Screen
              name="Authenticate"
              component={Authenticate}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OTPVerificationScreen"
              component={OTPVerificationScreen}
              options={{
                headerShown: false,
              }}
            />

           
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
