import { ImageBackground, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Badge from '@/components/Badge';

const BadgeScreen = () => {
    // Dati dei badge (esempio)
    const badges = [
        { id: 1, name: "Eco Beginner", icon: "leaf", color: "bronze", locked: false },
        { id: 2, name: "Green Warrior", icon: "shield", color: "silver", locked: false },
        { id: 3, name: "Earth Saver", icon: "earth", color: "gold", locked: false },
        { id: 4, name: "Carbon Neutral", icon: "cloud", color: "blue", locked: true },
        { id: 5, name: "Energy Master", icon: "flash", color: "purple", locked: true },
        { id: 6, name: "Recycle King", icon: "reload", color: "green", locked: true },
        { id: 7, name: "Water Guardian", icon: "water", color: "blue", locked: true },
        { id: 8, name: "Eco Ambassador", icon: "ribbon", color: "gold", locked: true },
        { id: 9, name: "Sustainability Hero", icon: "star", color: "diamond", locked: true },
    ];

    // Funzione per dividere i badge in righe da 3
    const chunkArray = (array, size) => {
        return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
            array.slice(i * size, i * size + size)
        );
    };

    const badgeRows = chunkArray(badges, 3);

    return (
        <ImageBackground
            source={require("@/assets/images/back_def.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Your Achievements</Text>

                    {badgeRows.map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((badge) => (
                                <View key={badge.id} style={styles.badgeContainer}>
                                    <Badge
                                        iconSize={40}
                                        iconColor={badge.color}
                                        isLocked={badge.locked}
                                        iconName={badge.icon}
                                    />
                                    <Text style={styles.badgeName}>{badge.name}</Text>
                                    <Text style={styles.badgeStatus}>
                                        {badge.locked ? "Locked" : "Unlocked"}
                                    </Text>
                                </View>
                            ))}

                            {/* Aggiungi placeholder vuoti se la riga non è completa */}
                            {row.length < 3 && Array(3 - row.length).fill().map((_, i) => (
                                <View key={`empty-${i}`} style={styles.emptyBadge} />
                            ))}
                        </View>
                    ))}
                </ScrollView>
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
    scrollContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 20,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    badgeContainer: {
        alignItems: 'center',
        width: '30%',
    },
    badgeName: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
        fontWeight: '500',
    },
    badgeStatus: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        marginTop: 4,
    },
    emptyBadge: {
        width: '30%',
    },
});

export default BadgeScreen;
