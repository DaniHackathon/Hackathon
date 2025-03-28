import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Assicurati di avere installato @expo/vector-icons

const SendButton: React.FC = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SendButton;
