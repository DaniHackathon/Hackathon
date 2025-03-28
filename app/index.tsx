import Button from "@/components/Button";
import { Image, Text, View, StyleSheet } from "react-native";
import { green } from "@/constant/Color"
import RoundedTextInput from "@/components/TextInput";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { useEffect, useRef } from "react";
import MessageBubble from "@/components/Message";
import LottieView from "lottie-react-native";
import TextInput from "@/components/TextInput";

export default function Index() {
    const [loaded, error] = useFonts({
        'Patrick-hand': require('@/assets/fonts/PatrickHand-Regular.ttf'),
    });
    const animation = useRef<LottieView>(null);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.4, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("@/assets/images/")}/>
            </View>
            <View style={styles.form}>
                <TextInput />
                <TextInput />
                <View style={{ justifyContent: "flex-end" }}>
                    <Button onPress={() => { router.push("/(drawer)") }}></Button>
                </View>

            </View>
            <View>
                <Text>or</Text>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontFamily: 'PatrickHand-Regular',
        fontSize: 32,
        color: green,
    },
    content: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    gifContainer: {
        width: '100%',
        height: 200,
        marginBottom: 30,
    },
    gif: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    form: {
        flex: 0.3,
        alignItems: 'center',

    }
});
