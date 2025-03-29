import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { green } from '@/constant/Color';

interface RoundedTextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    iconName?: keyof typeof Ionicons.glyphMap;
    keyboardType?: 'default' | 'email-address' | 'numeric';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const RoundedTextInput: React.FC<RoundedTextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    iconName,
    keyboardType = 'default',
    autoCapitalize = 'none',
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.container, isFocused && styles.focusedContainer]}>
            {iconName && (
                <Ionicons
                    name={iconName}
                    size={20}
                    color={isFocused ? green : 'gray'}
                    style={styles.icon}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="gray"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry && !showPassword}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                selectionColor="transparent" // Rimuove l'evidenziazione della selezione
                cursorColor={green} // Colore personalizzato per il cursore
                underlineColorAndroid="transparent" // Rimuove l'underline su Android
                // Props specifiche per iOS
                {...(Platform.OS === 'ios' && {
                    selectionColor: 'transparent',
                    caretHidden: false,
                })}
            />
            {secureTextEntry && (
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                    activeOpacity={0.7} // Riduce l'opacità durante il tap
                >
                    <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="gray"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'lightgray',
        width: '80%',
        marginVertical: 8,
        paddingHorizontal: 15,
    },
    focusedContainer: {
        borderColor: green,
    },
    input: {
        flex: 1,
        fontFamily: 'Patrick-hand',
        color: 'black',
        paddingVertical: 12,
        fontSize: 16,
        // Aggiungi queste proprietà per iOS
        ...Platform.select({
            ios: {
                userSelect: 'none',
                outlineStyle: 'none',
            },
        }),
    },
    icon: {
        marginRight: 10,
    },
    eyeIcon: {
        marginLeft: 10,
    },
});

export default RoundedTextInput;
