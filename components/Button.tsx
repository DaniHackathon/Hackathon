import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { green } from "@/constant/Color";
const GreenButton: React.FC = ({ onPress, title }: any) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
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
        margin: 10,
        backgroundColor: green,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    text: {
        fontFamily: 'Patrick-hand',
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
});
export default GreenButton;
