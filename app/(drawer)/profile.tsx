import { ImageBackground, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const profile = () => {
    return (
        <ImageBackground
            source={require("@/assets/images/back_def.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.profile}>
                <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="earth" size={100} />
                </View>
                <View style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.email}>johndoe@example.com</Text>
                </View>

            </SafeAreaView>
        </ImageBackground>
    )
}

export default profile

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    profile: {
        flex: 1,
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: 'white',
        marginBottom: 5,
    }
})
