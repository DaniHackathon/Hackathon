import { Stack } from "expo-router";

export default function RootLayout() {
    return <Stack>
        <Stack.Screen name="index"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name="register"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name="(drawer)"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name="chat"
            options={{
                headerShown: true,
                headerBackTitle: "..."
            }}
        />
    </Stack>;
}
