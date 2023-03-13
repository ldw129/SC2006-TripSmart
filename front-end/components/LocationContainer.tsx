import * as React from "react";
import { useMemo } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily } from "../GlobalStyles";

type LocationContainerType = {
  locationText?: ImageSourcePropType;
  locationType?: string;
  locationCoordinates?: ImageSourcePropType;

  /** Style props */
  iconlyBoldLocationLeft?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};

const LocationContainer = ({
  locationText,
  locationType,
  locationCoordinates,
  iconlyBoldLocationLeft,
}: LocationContainerType) => {
  const categoryLocationEditThemeStyle = useMemo(() => {
    return {
      ...getStyleValue("left", iconlyBoldLocationLeft),
    };
  }, [iconlyBoldLocationLeft]);

  return (
    <View
      style={[
        styles.categorylocationEditTheme,
        styles.autoLayoutHorizontalFlexBox,
        categoryLocationEditThemeStyle,
      ]}
    >
      <View
        style={[
          styles.autoLayoutHorizontal,
          styles.autoLayoutHorizontalFlexBox,
        ]}
      >
        <LinearGradient
          style={[
            styles.categorylocation2Component,
            styles.autoLayoutHorizontal1FlexBox,
          ]}
          locations={[0, 1]}
          colors={["rgba(254, 187, 27, 0.25)", "rgba(255, 199, 64, 0.25)"]}
        >
          <LinearGradient
            style={[
              styles.autoLayoutHorizontal1,
              styles.autoLayoutHorizontal1FlexBox,
            ]}
            locations={[0, 1]}
            colors={["#febb1b", "#ffc740"]}
          >
            <Image
              style={styles.iconlyboldlocation}
              resizeMode="cover"
              source={locationText}
            />
          </LinearGradient>
        </LinearGradient>
        <View style={[styles.autoLayoutVertical, styles.ml18_04]}>
          <Text style={[styles.home, styles.homeFlexBox]}>{locationType}</Text>
          <Text style={[styles.setLocation, styles.mt5_41, styles.homeFlexBox]}>
            Set Location
          </Text>
        </View>
      </View>
      <Image
        style={[styles.iconlyboldedit, styles.ml10_83]}
        resizeMode="cover"
        source={locationCoordinates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mt5_41: {
    marginTop: 5.41,
  },
  ml18_04: {
    marginLeft: 18.04,
  },
  ml10_83: {
    marginLeft: 10.83,
  },
  autoLayoutHorizontalFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  autoLayoutHorizontal1FlexBox: {
    backgroundColor: Color.brandColorsCircleOfTravel1,
    justifyContent: "center",
    padding: 7,
    alignItems: "center",
    flexDirection: "row",
  },
  homeFlexBox: {
    textAlign: "left",
    alignSelf: "stretch",
  },
  iconlyboldlocation: {
    width: 18,
    height: 18,
  },
  autoLayoutHorizontal1: {
    borderRadius: 902,
  },
  categorylocation2Component: {
    borderRadius: 90,
  },
  home: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "700",
    fontFamily: FontFamily.bodyLargeBold,
    color: Color.greyscale900,
  },
  setLocation: {
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 17,
    fontWeight: "500",
    fontFamily: FontFamily.urbanistMedium,
    color: Color.greyscale700,
  },
  autoLayoutVertical: {
    flex: 1,
  },
  autoLayoutHorizontal: {
    flex: 1,
  },
  iconlyboldedit: {
    width: 22,
    height: 22,
    display: "none",
  },
  categorylocationEditTheme: {
    position: "absolute",
    top: 138,
    left: 14,
    width: 152,
    height: 47,
  },
});

export default LocationContainer;
