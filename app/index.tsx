import Button from "@/components/Button";
import { Image, Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { green } from "@/constant/Color";
import TextInput from "@/components/TextInput";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { AUTH, FIRESTORE } from "@/firebaseConfig";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginScreen() {
    const [loaded, error] = useFonts({
        'Patrick-hand': require('@/assets/fonts/PatrickHand-Regular.ttf'),
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(AUTH, email, password);
            router.replace("/(drawer)");
        } catch (error) {
            Alert.alert("Errore di Login", "email o password sbagliate");
        } finally {
            setLoading(false);
        }
    };


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
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    icon="lock-closed-outline"
                    secureTextEntry
                    containerStyle={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>

                <Button
                    title={loading ? "Loading..." : "Login"}
                    onPress={login}
                    style={styles.loginButton}
                    textStyle={styles.loginButtonText}
                    disabled={loading}
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
                    disabled={loading}
                />
                <Button
                    title="Continue with Apple"
                    icon="logo-apple"
                    style={styles.socialButton}
                    textStyle={styles.socialButtonText}
                    disabled={loading}
                />
            </View>

            {/* Sign Up Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/register")}>
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
        marginRight: 16,
        color: green,
        marginTop: 16,
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
