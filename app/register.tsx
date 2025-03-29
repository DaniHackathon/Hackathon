import Button from "@/components/Button";
import { Image, Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { green } from "@/constant/Color";
import TextInput from "@/components/TextInput";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { AUTH, FIRESTORE } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
    const [loaded, error] = useFonts({
        'Patrick-hand': require('@/assets/fonts/PatrickHand-Regular.ttf'),
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const register = async () => {
        if (!email || !password || !confirmPassword || !username) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords don't match");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);

            // Salva informazioni aggiuntive in Firestore
            await setDoc(doc(FIRESTORE, "users", userCredential.user.uid), {
                username,
                email,
            });
            router.replace("/(drawer)");
        } catch (error) {
            Alert.alert("Registration Error", error.message);
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
                <Text style={styles.subtitle}>Create your account</Text>
            </View>

            {/* Registration Form */}
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Username"
                    icon="person-outline"
                    containerStyle={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
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
                <TextInput
                    placeholder="Confirm Password"
                    icon="lock-closed-outline"
                    secureTextEntry
                    containerStyle={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <Button
                    title={loading ? "CREATING ACCOUNT..." : "REGISTER"}
                    onPress={register}
                    style={styles.registerButton}
                    textStyle={styles.registerButtonText}
                    disabled={loading}
                />
            </View>

            {/* Login Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/")}>
                    <Text style={styles.loginText}>Login</Text>
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
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 12,
    },
    title: {
        fontFamily: 'Patrick-hand',
        fontSize: 32,
        color: green,
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: 'Patrick-hand',
        fontSize: 18,
        color: '#666',
    },
    formContainer: {
        alignItems: "center",
        flex: 0.6,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 16,
    },
    registerButton: {
        backgroundColor: green,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    footerText: {
        color: '#9E9E9E',
    },
    loginText: {
        color: green,
        fontWeight: 'bold',
    },
});
