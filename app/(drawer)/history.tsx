import { ImageBackground, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { green } from '@/constant/Color';
import { AUTH, FIRESTORE } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const HistoryScreen = () => {
    const [loading, setLoading] = useState(true);
    const [carbonData, setCarbonData] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(AUTH, async (user) => {
            if (user) {
                try {
                    // Recupera i dati dell'utente
                    const userDoc = await getDoc(doc(FIRESTORE, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserName(userDoc.data().username || 'User');
                    }

                    // Simula il recupero dei dati storici (sostituisci con i tuoi dati reali)
                    const mockData = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        values: [65, 59, 80, 81, 56, 72]
                    };

                    setCarbonData(mockData);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setLoading(false);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
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
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Carbon Footprint History</Text>
                        <Text style={styles.subtitle}>{userName}'s monthly impact</Text>
                    </View>

                    <View style={styles.chartContainer}>
                        <LineChart
                            data={{
                                labels: carbonData.labels,
                                datasets: [
                                    {
                                        data: carbonData.values,
                                        color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`,
                                        strokeWidth: 2
                                    }
                                ],
                                legend: ["CO2 Emissions (kg)"]
                            }}
                            width={Dimensions.get('window').width - 40}
                            height={220}
                            chartConfig={{
                                backgroundGradientFrom: "#1e2923",
                                backgroundGradientTo: "#08130d",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                    stroke: green
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Ionicons name="trending-up" size={24} color="#FF6B6B" />
                            <Text style={styles.statValue}>12%</Text>
                            <Text style={styles.statLabel}>Increase</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Ionicons name="trending-down" size={24} color={green} />
                            <Text style={styles.statValue}>24 kg</Text>
                            <Text style={styles.statLabel}>Reduction</Text>
                        </View>
                    </View>

                    <View style={styles.tipsContainer}>
                        <Text style={styles.sectionTitle}>Eco Tips</Text>
                        <View style={styles.tipCard}>
                            <Ionicons name="bulb" size={20} color={green} />
                            <Text style={styles.tipText}>Reduce social media usage by 30 mins daily to save 5kg CO2/month</Text>
                        </View>
                        <View style={styles.tipCard}>
                            <Ionicons name="bulb" size={20} color={green} />
                            <Text style={styles.tipText}>Switch to dark mode can save up to 8% of device energy</Text>
                        </View>
                    </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
    chartContainer: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 10,
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 15,
        width: '48%',
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 5,
    },
    statLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
    },
    tipsContainer: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 15,
    },
    tipCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        color: 'white',
        marginLeft: 10,
    },
});

export default HistoryScreen;
