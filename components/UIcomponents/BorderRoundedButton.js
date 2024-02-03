import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../constants/metrics";

const BorderRoundedButton = ({
  label,
  filled,
  disabled = false,
  onPress,
  buttonStyle = null,
  labelStyle = "",
  buttonWidth = "",
  ...props
}) => {
  const buttonBgStyle = filled ? styles.filledButton : styles.outlineButton;
  const textLabelStyle = filled
    ? styles.filledButtonText
    : styles.outlineButtonText;

  const screenWidth = Dimensions.get("window").width;
  const responsiveWidth = screenWidth * 0.8;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: buttonWidth ?? responsiveWidth },
        buttonBgStyle,
        buttonStyle,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          styles.buttonText,
          textLabelStyle,
          labelStyle,
          disabled && styles.disabledButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: verticalScale(44),
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  filledButton: {
    backgroundColor: "#023C40",
  },
  outlineButton: {
    // borderWidth: 1,
    borderColor: "#023C40",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: moderateScale(16),
  },
  filledButtonText: {
    color: "white",
  },
  outlineButtonText: {
    color: "black",
  },
  disabledButton: {
    backgroundColor: "#023C40",
    opacity: 0.6,
  },
  disabledButtonText: {
    color: "white",
  },
});

export default BorderRoundedButton;
