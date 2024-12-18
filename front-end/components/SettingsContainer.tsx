import * as React from "react";
import { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import en from '../locales/en.json';
import ch from '../locales/ch.json';
import ms from '../locales/ms.json';
import ta from '../locales/ta.json';

const messages = {
  en,
  ch,
  ms,
  ta
};

const SettingsContainer = ({selectedButton}) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const message1 = "Map";
  const message2 = "History";
  const message3 = "Settings";
  const [resultText, setResultText] = useState<any>()

  useFocusEffect(() => {
    AsyncStorage.getItem("language").then((value) => {
      switch(value){
        case 'en':
          setResultText(messages.en["Navigation_bar"]);
          break;
        case 'ch':
          setResultText(messages.ch["Navigation_bar"]);
          break;
        case 'ms':
          setResultText(messages.ms["Navigation_bar"]);
          break;
        case 'ta':
          setResultText(messages.ta["Navigation_bar"]);
          break;
        default:
          setResultText(messages.en["Navigation_bar"]);
      }
    })
    }
);

  const mapName = "ResultList";
  const historyName = "History";
  const settingsName = "Settings";

  const storeMap = async (text: React.SetStateAction<string>) => {
    try {
      await AsyncStorage.setItem("@storage_Map", "Map");
    } catch (e) {
      // saving error
    }
  }

  const storeHistory = async (text: React.SetStateAction<string>) => {
    try {
      await AsyncStorage.setItem("@storage_History", "History");
    } catch (e) {
      // saving error
    }
  }

  const storeSettings = async (text: React.SetStateAction<string>) => {
    try {
      await AsyncStorage.setItem("@storage_Settings", "Settings");
    } catch (e) {
      // saving error
    }
  }

  // const getMap = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@storage_Map");
  //     if (value == "Map") {
  //       //
  //     } else {
  //       //
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // const getHistory = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@storage_History");
  //     if (value == "History") {
  //       //
  //     } else {
  //       //
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // const getSettings = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@storage_Settings");
  //     if (value == "Settings") {
  //       //
  //     } else {
  //       //
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  return (
    <View style={styles.bottomNavigation}>
      <View style={styles.frameParent}>
        <Pressable
          style={[styles.iconsSpaceBlock, selectedButton === "Map" && styles.iconsParent]}
          onPress={() => {
            storeMap("Map")
            navigation.navigate(mapName)
            }
          }
        >
          <View style={[styles.icons, styles.iconsFlexBox]}>
            <Image
              style={styles.mapIcon}
              resizeMode="cover"
              source={require("../assets/map.png")}
            />
          </View>
          <Text style={[styles.planlg, styles.mt8_35, styles.planlgTypo]}>
            {resultText && resultText[message1]}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.iconsSpaceBlock, selectedButton === "History" && styles.iconsParent]}
          onPress={() => {
            storeHistory("History")
            navigation.navigate(historyName)
            }
          }
        >
          <View style={[styles.icons, styles.iconsFlexBox]}>
            <Image
              style={styles.mapIcon}
              resizeMode="cover"
              source={require("../assets/ticket.png")}
            />
          </View>
          <Text style={[styles.billetter, styles.mt8_35, styles.planlgTypo]}>
          {resultText && resultText[message2]}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.iconsSpaceBlock, selectedButton === "Settings" && styles.iconsParent]}
          onPress={() => {
            storeSettings("Settings")
            navigation.navigate(settingsName)
            }
          }
        >
          <View style={[styles.icons, styles.iconsFlexBox]}>
            <Image
              style={styles.mapIcon}
              resizeMode="cover"
              source={require("../assets/cog-wheel2.png")}
            />
          </View>
          <Text style={[styles.billetter, styles.mt8_35, styles.planlgTypo]}>
          {resultText && resultText[message3]}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mt8_35: {
    marginTop: "30%",
  },
  iconsSpaceBlock: {
    padding: 8,
    width: 74,
    alignItems: "center",
  },
  iconsFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  planlgTypo: {
    textAlign: "center",
    lineHeight: 12,
    fontSize: 10,
  },
  mapIcon: {
    flex: 1,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    width: "100%",
    alignSelf: "stretch",
  },
  icons: {
    width: "50%",
    height: 20,
    flexDirection: "row",
  },
  planlg: {
    color: Color.brandColorsNightPurple,
  },
  iconsParent: {
    backgroundColor: Color.brandColorsCrayolaYellow,
  },
  billetter: {
    color: Color.textColorsLight,
  },
  iconsContainer: {
    display: "none",
  },
  frameParent: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  frameChild: {
    width: 89,
    height: 0,
    display: "none",
  },
  bottomNavigationInner: {
    paddingLeft: 17,
    alignSelf: "stretch",
  },
  bottomNavigation: {
    left: 3,
    width: "100%",
    paddingLeft: 8,
    paddingRight: 17,
    alignItems: "center",
    backgroundColor: Color.textColorsInverse,
  },
});

export default SettingsContainer;
