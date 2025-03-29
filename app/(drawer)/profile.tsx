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
                <View style={[styles.overlay, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={green} />
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require("@/assets/images/back_def.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.appTitle}>Il mio Profilo</Text>
                    </View>

                    {/* Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={60} color={green} />
                            </View>
                        </View>

                        <Text style={styles.name}>{userData.name}</Text>
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
                        </View>
                    </View>

                    {/* Menu Section */}
                    <View style={styles.menuSection}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.menuItem}>
                                <View style={styles.menuIcon}>
                                    <Ionicons name={item.icon} size={24} color={green} />
                                </View>
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
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 16,
    },
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 40,
        alignItems: 'center',
        marginBottom: 20,
    },
    appTitle: {
        fontFamily: "Patrick-hand",
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        marginBottom: 15,
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
        fontFamily: "Patrick-hand",
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    email: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 20,
    },
    statItem: {
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 15,
        width: '40%',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: 'white',
    },
    menuSection: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 15,
        marginHorizontal: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },
    menuIcon: {
        width: 30,
        alignItems: 'center',
    },
    menuText: {
        flex: 1,
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
        fontFamily: "Patrick-hand",
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontFamily: "Patrick-hand",
    },
});

export default ProfileScreen;
