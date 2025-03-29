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
                    drawerActiveTintColor: green,
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: {
                        marginLeft: -15,
                        fontSize: 14,
                        fontWeight: '500'
                    },
                    drawerItemStyle: {
                        marginVertical: 4,
                        paddingHorizontal: 8,
                    },
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: green,
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            >
                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: 'Profilo',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} style={styles.icon} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} style={styles.icon} />
                        ),
                    }}
                />



                <Drawer.Screen
                    name="badge"
                    options={{
                        drawerLabel: 'Trofei',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="trophy" size={size} color={color} style={styles.icon} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="history"
                    options={{
                        drawerLabel: 'Storico',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="bar-chart" size={size} color={color} style={styles.icon} />
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = {
    icon: {
        marginRight: 8, // Regola questo valore per allineare meglio le icone
    },
};
