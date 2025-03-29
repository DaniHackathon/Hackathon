import Button from "@/components/Button";
import { Image, Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { green } from "@/constant/Color";
import TextInput from "@/components/TextInput";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { useEffect, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [loaded, error] = useFonts({
        'Patrick-hand': require('@/assets/fonts/PatrickHand-Regular.ttf'),
    });
    const animation = useRef(null);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo Header */}
            <View style={styles.logoContainer}>
                <Image
                    source={require("@/assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>eCO2Bytes</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Email"
                    icon="mail-outline"
                    containerStyle={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    icon="lock-closed-outline"
                    secureTextEntry
                    containerStyle={styles.input}
                />

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>

                <Button
                    title="LOGIN"
                    onPress={() => router.push("/(drawer)")}
                    style={styles.loginButton}
                    textStyle={styles.loginButtonText}
                />
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
                <Button
                    title="Continue with Google"
                    icon="logo-google"
                    style={styles.socialButton}
                    textStyle={styles.socialButtonText}
                />
                <Button
                    title="Continue with Apple"
                    icon="logo-apple"
                    style={styles.socialButton}
                    textStyle={styles.socialButtonText}
                />
            </View>

            {/* Sign Up Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
    },
    logoContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    title: {
        fontFamily: 'Patrick-hand',
        fontSize: 32,
        color: green,
        marginBottom: 8,
    },
    formContainer: {
        flex: 0.4,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: green,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: green,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#9E9E9E',
        fontSize: 14,
    },
    socialContainer: {
        flex: 0.2,
        justifyContent: 'center',
    },
    socialButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        height: 50,
        borderRadius: 8,
        marginBottom: 12,
    },
    socialButtonText: {
        color: '#333',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    footerText: {
        color: '#9E9E9E',
    },
    signUpText: {
        color: green,
        fontWeight: 'bold',
    },
});
