import { View, Text, Modal } from "react-native";
import React from "react";

export default function Loader({ isVisible }) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      style={{
        zIndex: 10,
      }}
      children={
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 100,
              width: 300,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Updating....</Text>
          </View>
        </View>
      }
    />
  );
}
