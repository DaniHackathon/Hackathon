import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const CustomDrawer = (props: any) => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#1E1E1E', '#121212']}
            style={styles.container}
        >
            <DrawerContentScrollView {...props}>
                {/* Header con avatar */}
                <View style={styles.userSection}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.userName}>Marco Rossi</Text>
                    <Text style={styles.userEmail}>marco@example.com</Text>
                </View>

                {/* Sezione menu principale */}
                <View style={styles.menuSection}>
                    <DrawerItem
                        label="Home"
                        onPress={() => router.push('/')}
                        icon={({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        )}
                        labelStyle={styles.label}
                        style={styles.item}
                    />
                    <DrawerItem
                        label="Profilo"
                        onPress={() => router.push('/profile')}
                        icon={({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        )}
                        labelStyle={styles.label}
                        style={styles.item}
                    />
                </View>

                {/* Divisore */}
                <View style={styles.divider} />

                {/* Sezione secondaria */}
                <View style={styles.menuSection}>
                    <DrawerItem
                        label="Impostazioni"
                        onPress={() => router.push('/settings')}
                        icon={({ color, size }) => (
                            <Ionicons name="settings" size={size} color={color} />
                        )}
                        labelStyle={styles.label}
                        style={styles.item}
                    />
                    <DrawerItem
                        label="Logout"
                        onPress={() => router.push('/login')}
                        icon={({ color, size }) => (
                            <MaterialIcons name="logout" size={size} color={color} />
                        )}
                        labelStyle={[styles.label, styles.logoutLabel]}
                        style={styles.item}
                    />
                </View>
            </DrawerContentScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Versione 1.0.0</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userSection: {
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    userEmail: {
        color: 'gray',
        fontSize: 14,
    },
    menuSection: {
        marginTop: 10,
    },
    item: {
        marginVertical: 2,
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginLeft: -15,
    },
    logoutLabel: {
        color: '#FF3B30',
    },
    divider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 15,
        marginHorizontal: 15,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    footerText: {
        color: 'gray',
        textAlign: 'center',
        fontSize: 12,
    },
});

export default CustomDrawer;
