import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    BackHandler
} from "react-native";
import {Avatar, ListItem} from "@rneui/base";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Color, FontFamily} from "../GlobalStyles";
import {useNavigation} from "@react-navigation/native";
import {grab} from "../services/grabscrapper";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const ResultListScroll = ({changeState, isCheap, setCheap}:any)  => {
    const message1 = "Results";
    const message2 = "Cheapest";
    const message3 = "Fastest";
    const [resultText, setResultText] = useState<any>();

    useFocusEffect(() => {
        AsyncStorage.getItem("language").then((value) => {
            switch(value){
                case 'en':
                    setResultText(messages.en["Result_list"]);
                    break;
                case 'ch':
                    setResultText(messages.ch["Result_list"]);
                    break;
                case 'ms':
                    setResultText(messages.ms["Result_list"]);
                    break;
                case 'ta':
                    setResultText(messages.ta["Result_list"]);
                    break;
                default:
                    setResultText(messages.en["Result_list"]);
            }
        })
        }
    );

    const lightArrowLink = require("../assets/arrow-2.png");
    const dimArrowLink = require("../assets/arrow-21.png");
    const lightBorder = require("../assets/borderorange-1.png");
    const dimBorder = require("../assets/border-1.png");
    function handleBackButtonClick() {
        changeState("searchPage")
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    return (
            <View style={styles.resultList}>
                <View style={styles.headerParent}>
                    <View style={styles.header}>
                        <Pressable
                            style={[styles.leftButton,styles.headerChild]}
                            onPress={() => changeState("searchPage")}
                        >
                            <Image
                                style={styles.headerChild}
                                resizeMode="cover"
                                source={require("../assets/arrow-11.png")}
                            />
                        </Pressable>
                        <Text style={[styles.headerChildText,styles.resultText]}>{resultText && resultText[message1]}</Text>
                        <View style = {{marginLeft:"auto",paddingRight:20}}>
                            <Pressable
                                style={[styles.headerChild,styles.image3]}
                                onPress={() => changeState("resultFilter")}
                            >
                                <Image
                                    style={[styles.headerChild,styles.icon]}
                                    resizeMode="cover"
                                    source={require("../assets/image-3.png")}
                                />
                            </Pressable >
                        </View>
                    </View>
                </View>
                <View style={styles.sortingGroup}>
                    <View style = {styles.sortingHeader}>
                        <View style={[styles.groupLayout]}>
                            <Pressable
                                onPress={() => {setCheap(true);
                                }}
                                style = {{flexDirection:"row"}}
                            >
                                <Text style={[isCheap? styles.lightText: styles.dimText, styles.sortingHeaderText]}>
                                {resultText && resultText[message2]}
                                </Text>
                                <Image
                                    style = {styles.sortingHeaderArrow}
                                    source={isCheap ? lightArrowLink : dimArrowLink}
                                />
                            </Pressable >
                        </View>
                        <View style={[styles.groupLayout]}>
                            <Pressable
                                onPress={() => {setCheap(false);}}
                                style = {{flexDirection:"row"}}
                            >
                                <Text style={[isCheap? styles.dimText: styles.lightText, styles.sortingHeaderText]}>
                                {resultText && resultText[message3]}
                                </Text>
                                <Image
                                    style = {styles.sortingHeaderArrow}
                                    source={isCheap ? dimArrowLink : lightArrowLink}
                                />
                            </Pressable >
                        </View>
                    </View>
                    <View style = {{flexDirection:"row"}}>
                        <Image
                            style={styles.border1Icon}
                            source={isCheap ? lightBorder : dimBorder}
                        />
                        <Image
                            style={styles.border1Icon}
                            source={isCheap ? dimBorder : lightBorder}
                        />
                    </View>
                </View>
            </View>

    )
}


const styles = StyleSheet.create({
    lightText: {
        color: "#f9bb00",
    },
    result: {
        width: "100%",
    },
    sortingHeaderArrow: {
        width: "7%",
        height: "100%",
    },
    sortingHeaderText: {
        lineHeight: 20,
        fontSize: 15,
        paddingRight:20
    },
    border1Icon: {
        height: 2,
    },
    groupLayout: {
        height: "100%",
        width: "40%",
        flexDirection:"row",
        justifyContent:"center",
        paddingBottom: 10
    },
    resultList: {
        backgroundColor: Color.textColorsInverse,
        width: "100%",
        flexDirection: "column",
    },
    sortingHeader:{
        flexDirection:"row",
        alignItems:"center",
        paddingTop:20
    },
    leftButton:{
        paddingLeft:20
    },
    headerParent: {
        width: "100%"
    },
    dimText: {
        color: Color.black,
    },
    image3: {
        width: Dimensions.get("window").width * 0.1,
        height: Dimensions.get("window").height * 0.05,
    },
    header: {
        flexDirection: "row"
    },
    icon: {
        height: "100%",
        width: "100%",

    },
    headerChild: {
        paddingTop: 20
    },
    headerChildText:{
        paddingTop: 15,
        paddingLeft: 20,
    },
    resultText: {
        fontSize:22,
        fontWeight: "700",
        color: Color.black,
    },
    sortingGroup: {
        width: "100%",
        alignItems:"center"
    },
});

export default ResultListScroll;