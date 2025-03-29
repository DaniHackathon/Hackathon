import { StyleSheet, View, Animated, Easing, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';

interface TextSkeletonProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    color?: string;
    highlightColor?: string;
}

const TextSkeleton: React.FC<TextSkeletonProps> = ({
    width = '100%',
    height = 16,
    borderRadius = 4,
    color = '#e1e1e1',
    highlightColor = '#f5f5f5',
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 800,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 800,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        animate();

        return () => fadeAnim.stopAnimation();
    }, [fadeAnim]);

    const interpolatedColor = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [color, highlightColor],
    });

    return (
        <View style={[styles.container, { width, height, borderRadius }]}>
            <Text>Eco AI sta generando...</Text>
            <Animated.View
                style={[
                    styles.skeleton,
                    {
                        backgroundColor: interpolatedColor,
                        borderRadius,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginVertical: 4,
    },
    skeleton: {
        width: '100%',
        height: '100%',
    },
});

export default TextSkeleton;
