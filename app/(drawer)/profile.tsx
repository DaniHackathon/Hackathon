import { ImageBackground, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { green } from '@/constant/Color';
import { AUTH, FIRESTORE } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ProfileScreen = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        joinDate: "",
        loading: true
    });
    const [authUser, setAuthUser] = useState(null);

    const menuItems = [
        { icon: "settings", label: "Impostazioni" },
        { icon: "notifications", label: "Notifiche" },
        { icon: "help-circle", label: "Aiuto" },
        { icon: "log-out", label: "Logout" }
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(AUTH, async (user) => {
            if (user) {
                setAuthUser(user);
                // Recupera i dati aggiuntivi da Firestore
                try {
                    const userDoc = await getDoc(doc(FIRESTORE, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserData({
                            name: userDoc.data().username || user.displayName || "Utente",
                            email: user.email,
                            joinDate: new Date(user.metadata.creationTime).toLocaleDateString(),
                            loading: false
                        });
                    } else {
                        // Se non esiste il documento, usa i dati di base
                        setUserData({
                            name: user.displayName || "Utente",
                            email: user.email,
                            joinDate: new Date(user.metadata.creationTime).toLocaleDateString(),
                            loading: false
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUserData(prev => ({ ...prev, loading: false }));
                }
            } else {
                setUserData({
                    name: "",
                    email: "",
                    joinDate: "",
                    loading: false
                });
            }
        });

        return () => unsubscribe();
    }, []);

    if (userData.loading) {
        return (
            <ImageBackground
                source={require("@/assets/images/back_def.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={green} />
                </SafeAreaView>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require("@/assets/images/back_def.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                </View>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={60} color={green} />
                        </View>
                    </View>
                    <Text style={styles.email}>{userData.email}</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>78</Text>
                            <Text style={styles.statLabel}>Carbon Score</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>5</Text>
                            <Text style={styles.statLabel}>Achievements</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>23</Text>
                            <Text style={styles.statLabel}>Friends</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Section */}
                <View style={styles.menuSection}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <Ionicons name={item.icon} size={24} color="white" />
                            <Text style={styles.menuText}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Member since {userData.joinDate}</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 20,
        alignItems: 'flex-end',
    },
    editButton: {
        backgroundColor: green,
        padding: 8,
        borderRadius: 20,
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: green,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    email: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
    },
    menuSection: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },
    menuText: {
        flex: 1,
        fontSize: 18,
        color: 'white',
        marginLeft: 15,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
});

export default ProfileScreen;
