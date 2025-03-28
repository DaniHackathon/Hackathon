import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PieChart from 'react-native-pie-chart'
import { Ionicons } from '@expo/vector-icons'
import MessageBubble from '@/components/Message'
import { green } from '@/constant/Color'

const Index = () => {
    const widthAndHeight = 200
    const series = [
        { value: 430, color: '#fbd203', label: { text: '%22', fontWeight: 'bold' } },
        { value: 321, color: '#ffb300', label: { text: 'mobile', offsetY: 10, offsetX: 10 } },
        { value: 185, color: '#ff9100', label: { text: '%22', fontSize: 8, fontStyle: 'italic', outline: 'white' } },
        { value: 123, color: '#ff6c00' },
    ]

    return (
        <ImageBackground
            source={require("@/assets/images/back_def.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {/* Header con titolo e grafico */}
                <View style={styles.header}>
                    <Text style={styles.appTitle}>eCO2Bytes</Text>
                    <Text style={styles.chartTitle}>Your Carbon Footprint</Text>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        coverRadius={0.7}
                        coverFill={'rgba(255,255,255,0.7)'}
                    />
                </View>

                {/* Contenuto principale */}
                <View style={styles.content}>
                    <View style={styles.metricsContainer}>
                        <View style={styles.metricCard}>
                            <Ionicons name="car" size={24} color={green} />
                            <Text style={styles.metricValue}>1,240</Text>
                            <Text style={styles.metricLabel}>km driven</Text>
                        </View>


                        <View style={styles.metricCard}>
                            <Ionicons name="airplane" size={24} color={green} />
                            <Text style={styles.metricValue}>3,560</Text>
                            <Text style={styles.metricLabel}>flight km</Text>
                        </View>
                    </View>
                </View>

                {/* Footer con messaggio */}
                <View style={styles.footer}>
                    <MessageBubble
                        message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

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
