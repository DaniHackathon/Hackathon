import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const RoundedTextInput: React.FC = () => {
    return (
        <TextInput
            style={styles.input}
            placeholder="Scrivi qui..."
            placeholderTextColor="gray"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        color: "black",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "gray",
        width: "80%",
        margin: 10,
    },
});

export default RoundedTextInput;
