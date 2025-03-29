import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { Ionicons } from '@expo/vector-icons';
import MessageBubble from '@/components/Message';
import { green } from '@/constant/Color';

const Index = () => {
    const widthAndHeight = 200;
    const [chartData, setChartData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiResponse, setApiResponse] = useState("")

    const platformColors = {
        'Instagram': '#E1306C',
        'Facebook': '#1877F2',
        'Twitter': '#1DA1F2',
        'LinkedIn': '#0077B5',
        'TikTok': '#FF0050'
    };

    const mockData = [
        { "platform": "Instagram", "time": 20, "data": 200 },
        { "platform": "Facebook", "time": 30, "data": 10 },
        { "platform": "Twitter", "time": 40, "data": 378 },
        { "platform": "LinkedIn", "time": 50, "data": 300 },
        { "platform": "TikTok", "time": 60, "data": 600 },
        { "total": 1488 }
    ];

    const apiFetch = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://python-hello-world-jade-two.vercel.app/api', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Using mock data due to API error');
            return mockData; // Fallback to mock data
        }
    };

    useEffect(() => {
        const loadData = async () => {
            const data = await apiFetch();
            const platformsData = data.slice(0, -1);
            const totalValue = data[data.length - 1].total || mockData[mockData.length - 1].total;

            setChartData(platformsData);
            setTotal(totalValue);
            setLoading(false);
        };

        loadData();
        aiApi()
    }, []);

    const aiApi = async () => {
        try {
            const API_KEY = "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"
            const input = "Ciao ho usato instagram 2 ore" + "Scrivimi solo come posso migliorere in pochi step massimo 50 parole"

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "deepseek/deepseek-r1:free",
                    "messages": [
                        {
                            "role": "user",
                            "content": input
                        }
                    ]
                })
            });


            const data = await response.json();
            const markdownText =
                data.choices?.[0]?.message?.content || 'No response received.';
            setApiResponse(markdownText);
        } catch (error) {
            setApiResponse("error");
        }

    }

    if (loading) {
        return (
            <ImageBackground
                source={require("@/assets/images/back_def.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={[styles.overlay, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color="#ffffff" />
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
                <View style={styles.header}>
                    <Text style={styles.appTitle}>eCO2Bytes</Text>
                    <Text style={styles.chartTitle}>Your Carbon Footprint</Text>

                    {chartData.length > 0 && (
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={chartData.map(item => ({
                                value: item.data,
                                color: platformColors[item.platform] || '#CCCCCC',
                                label: {
                                    text: item.platform,
                                    fontSize: 10,
                                    color: 'white',
                                    fontWeight: 'bold'
                                }
                            }))}
                            coverRadius={0.7}
                            coverFill={'rgba(255,255,255,0.7)'}
                        />
                    )}
                </View>

                <View style={styles.content}>
                    <View style={styles.metricsContainer}>
                        <View style={styles.metricCard}>
                            <Ionicons name="car" size={24} color={green} />
                            <Text style={styles.metricValue}>{total}</Text>
                            <Text style={styles.metricLabel}>Total Data</Text>
                        </View>

                        <View style={styles.metricCard}>
                            <Ionicons name="time" size={24} color={green} />
                            <Text style={styles.metricValue}>
                                {chartData.reduce((sum, item) => sum + item.time, 0)}
                            </Text>
                            <Text style={styles.metricLabel}>Total Time</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <MessageBubble
                        message={apiResponse}
                    />
                </View>
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
        backgroundColor: 'rgba(0,0,0,0.3)', // Sfondo semi-trasparente per migliorare la leggibilità
        paddingHorizontal: 16,
    },
    header: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    chartTitle: {
        fontSize: 18,
        color: 'white',
        marginBottom: 24,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    content: {
        flex: 0.4,
        justifyContent: 'center',
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    metricCard: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 16,
        padding: 20,
        width: '45%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    metricValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
        color: '#212529',
    },
    metricLabel: {
        fontSize: 14,
        color: '#6C757D',
    },
    footer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },
    messageBubble: {
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    ctaIcon: {
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
})

export default Index
