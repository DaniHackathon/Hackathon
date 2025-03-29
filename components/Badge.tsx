import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';


const Badge = ({ iconSize, iconColor, isLocked }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                {/* Se isLocked è true, mostra il lucchetto sopra il trofeo */}
                {isLocked && (
                    <Entypo
                        name="lock"
                        size={iconSize / 2} // Lucchetto metà grandezza del trofeo
                        color="gray"
                        style={styles.lockIcon}
                    />
                )}
                <Entypo
                    name="trophy"
                    size={iconSize}
                    color={isLocked ? '#d3d3d3' : iconColor} // Grigio chiaro se è bloccato
                    style={{ opacity: isLocked ? 0.5 : 1 }} // Opacità bassa se è bloccato
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Metti i cerchi uno accanto all'altro
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 75,
        height: 75,
        borderRadius: 75,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        marginRight: 20, // Distanza tra i cerchi
    },
    lockIcon: {
        position: 'absolute',
        alignSelf: "center",
        top: 28, // Posiziona il lucchetto circa sopra metà del trofeo
        left: '50%', // Centra il lucchetto orizzontalmente
        transform: [{ translateX: -20 }], // Aggiusta il lucchetto per centrarlo
        opacity: 1, // Rende il lucchetto visibile
        zIndex: 2,
    },
});


export default Badge;
