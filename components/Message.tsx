import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextSkeleton from './Skeleton';


const MessageBubble: React.FC = ({ message, loading }: any) => {
    return (
        <View style={styles.bubble}>
            {loading ? (<Text>Eco AI sta generando...</Text>) : <Text style={styles.text}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        width: "80%",
        height: "100%",
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 12,
        maxWidth: "80%",
        alignSelf: "flex-start", // Per simulare un messaggio inviato
        margin: 10,
        borderBottomRightRadius: 0, // Evita la sovrapposizione con l'apice
    },
    text: {
        fontFamily: "PatrickHand-Regular",
        color: "black",
        fontSize: 16,
    },
    tail: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 10,
        height: 10,
        backgroundColor: "black",
        transform: [{ rotate: "45deg" }], // Ruota per creare l'effetto triangolo
        marginRight: -5,
        marginBottom: -2,
    },
});

export default MessageBubble;
