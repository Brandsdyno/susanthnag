import {StatusBar as RNStatusBar, StatusBarProps} from 'react-native';
import React from 'react';
// import {useTheme} from '../../contexts/ThemeProvider';



const StatusBar = ({
  themeColor = 'black', // can change colors
  ...props
}) => {
  // const {isDarkMode, colors} = useTheme();

  // const statusBarColor =
  //   themeColor || (isDarkMode ? colors.black : colors.white);

   const statusBarColor = themeColor

  return (
    <RNStatusBar
      backgroundColor={statusBarColor}
      // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      {...props}
    />
  );
};

export default StatusBar;
