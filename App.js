import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { store } from "./Store/store.js";
import { Provider } from "react-redux";
import { useSelector} from "react-redux";
import { setSignInData } from "./Store/Slices/SignIn/index.js";
// import { PersistGate } from "redux-persist/integration/react";

import { RootNavigation } from "./Navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <>
      <SafeAreaProvider style={{ flex: 1 }}>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
            {/* </PersistGate> */}
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
