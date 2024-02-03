import { View, Text } from "react-native";
import React from "react";
import { ThemedView, StatusBar } from "../../components/UIcomponents";
import useIsFocused from "../../useIsFocused";
export default function UserPlus() {
  const focued = useIsFocused();
  console.log({ focued }, "userPlus");

  return (
    <React.Fragment>
      <StatusBar />
      <ThemedView>
        <View>
          <Text>User Plus</Text>
        </View>
      </ThemedView>
    </React.Fragment>
  );
}
