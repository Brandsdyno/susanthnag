import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
const pixelDensity = PixelRatio.get();

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size)=>
  (width / guidelineBaseWidth) * size;
const verticalScale = (size) =>
  (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor * pixelDensity;

export {horizontalScale, verticalScale, moderateScale, height, width};

// Functions Usage::
// 1. verticalScale: height, marginTop, marginBottom, marginVertical, line-height, paddingTop, paddingBottom, paddingVertical, likewise.
// 2. horizontal Scale: width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal, likewise.
// 3. moderateScale: font-size, borderRadius, likewise.

// Functions Usage::
// 1. verticalScale : height, marginTop, marginBotton, marginVertical, line-height, paddingTop, paddingBotton, paddingVertical, likewise.
// 2. horizontal Scale :  width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal, likewise.
// 3. moderateScale : font-size, borderRadius, likewise.
