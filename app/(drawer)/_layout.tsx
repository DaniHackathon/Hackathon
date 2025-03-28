import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerShown: true,
                    drawerActiveTintColor: '#007AFF',
                    drawerLabelStyle: { marginLeft: -20 },
                }}
            >
                {/* Pagine principali (ogni file nella cartella `app` avrà il suo drawer item) */}
                <Drawer.Screen

                    name="index" // Corrisponde a `app/index.tsx`
                    options={{
                        headerShown: false,
                        drawerLabel: 'Home',
                        title: 'Home',
                        drawerIcon: ({ color, size }: any) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />

            </Drawer>
        </GestureHandlerRootView>
    );
}
