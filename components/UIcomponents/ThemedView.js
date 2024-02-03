import React from "react";
import { View, ViewProps, ActivityIndicator, StyleSheet } from "react-native";
// import {useTheme} from '../../contexts/ThemeProvider';

// interface ThemedViewProps extends ViewProps {
//   forceBgColor?: string;
//   marginHorizontal?: number;
//   marginTop?: number;
//   loading?: boolean;
// }

const ThemedView = ({
  marginHorizontal = 12, // Default marginHorizontal
  marginTop = 18, // Default marginTop
  loading = false, // Default to false if not provided
  forceBgColor = "",
  style,
  children,
  ...props
}) => {
  // const {isDarkMode, colors} = useTheme();
  // const backgroundColor =
  //   forceBgColor || (isDarkMode ? colors.black : colors.white);

  return (
    <View style={[{ flex: 1 }, style]} {...props}>
      <View style={{ marginHorizontal, marginTop, flex: 1 }}>
        {children}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator
              size="large"
              // color={isDarkMode ? colors.white : colors.black}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ThemedView;
