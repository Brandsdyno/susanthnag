import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../constants/metrics";

const TextInputWithLabel = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  labelStyle = null,
  inputStyle = null,
  containerStyle,
  editBtn,
  onClickOfEditBtn = null,
  editable = true,
  numberOfLines = 1,
  secureTextInput = false,
  type= "default"
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: "white" }, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={"#4D4D4D"}
        editable={editable}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextInput}
        keyboardType={type}
      />
      {editBtn && !editable ? (
        <TouchableOpacity style={styles.edit} onPress={onClickOfEditBtn}>
          <Text>Edit</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginBottom: verticalScale(16),
    position: "relative",
  },
  label: {
    marginBottom: verticalScale(8),
  },
  input: {
    height: verticalScale(40),
    textAlign: "left",
    // paddingVertical: verticalScale(8),
    // paddingLeft: -horizontalScale(4),
  },
  edit: {
    position: "absolute",
    right: 12,
    bottom: 10,
  },
});

export default TextInputWithLabel;
