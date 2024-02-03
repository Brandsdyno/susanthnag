import { StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens";
import { icons } from "../constants";
import { Profile, Contacts, UserPlus, AddContacts } from "../Screens";
const Tab = createBottomTabNavigator();
export function EmptyComponent() {
  return null;
}

const BottomTabNavigator = () => {
  // const { isDarkMode, colors, icons } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        // tabBarActiveBackgroundColor: isDarkMode ? "dark" : "white",
        // tabBarInactiveBackgroundColor: isDarkMode ? "dark" : "white",
        tabBarStyle: { borderTopColor: "#CCCCCC", borderTopWidth: 1 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? icons.home : icons.home;
          } else if (route.name === "Profile") {
            iconName = focused ? icons.profile : icons.profile;
          } else if (route.name === "Contacts") {
            iconName = focused ? icons.call : icons.call;
          } else if (route.name === "AddContacts") {
            iconName = focused ? icons.userPlus : icons.userPlus;
          }
          return (
            <Image source={iconName} resizeMode="cover" style={styles.icon} />
          );
        },
      })}
      // tabBarOptions={{
      //   style: {
      //     backgroundColor: "red",
      //   },
      // }}
      // sceneContainerStyle={{
      //   backgroundColor: "#BFA05E",
      // }}
      tabBarStyle={{
        backgroundColor: "#BFA05E",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          // title : '',
          // headerShown : true
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
        }}
      />

      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{}}
        // listeners={({ navigation }) => ({
        //   tabPress: (event) => {
        //     event.preventDefault();
        //     navigation.navigate("UploadPosts");
        //   },
        // })}
      />

      <Tab.Screen
        name="AddContacts"
        component={AddContacts}
        options={{
          tabBarLabel: "Add contacts",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
