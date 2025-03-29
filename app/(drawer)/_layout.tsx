import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { green } from '@/constant/Color';
import { router } from 'expo-router';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    drawerActiveTintColor: green, // Usa il tuo colore verde
                    drawerLabelStyle: { marginLeft: -20 },
                    headerTransparent: true, // Header completamente trasparente
                    headerTitle: '', // Nessun titolo
                    headerTintColor: green, // Colore delle icone
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0, // Rimuove ombra su Android
                        shadowOpacity: 0, // Rimuove ombra su iOS
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                marginRight: 15,
                                backgroundColor: 'rgba(255,255,255,0.3)', // Leggera trasparenza
                                borderRadius: 20,
                                padding: 5
                            }}
                            onPress={() => router.push("/profile")}
                        >
                            <Ionicons name="person" size={24} color={green} />
                        </TouchableOpacity>
                    ),
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        drawerIcon: ({ color, size }: any) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                        // Sovrascrive le impostazioni globali se necessario
                    }}
                />

                {/* Altre schermate */}
                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: 'Profile',
                        drawerIcon: ({ color, size }: any) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="badge"
                    options={{
                        drawerLabel: 'Badge',
                        drawerIcon: ({ color, size }: any) => (
                            <Ionicons name="trophy" size={size} color={color} />
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
