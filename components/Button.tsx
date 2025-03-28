import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { green } from "@/constant/Color";
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
const GreenButton: React.FC = ({ onPress }: any) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Button</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: green,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    text: {
        fontFamily: "PatrickHand-Regular",
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
});
export default GreenButton;
