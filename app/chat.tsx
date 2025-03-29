import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { green } from '@/constant/Color'

const ChatBox = () => {
    const [loadingAI, setLoadingAI] = useState(false)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        { id: 1, text: 'Ciao! Come posso aiutarti oggi?', sender: 'bot' }
    ])
    const scrollViewRef = useRef<ScrollView>(null)

    const aiApi = async () => {
        if (!input.trim()) return

        // Aggiungi il messaggio dell'utente
        const userMessage = { id: messages.length + 1, text: input, sender: 'user' }
        setMessages(prev => [...prev, userMessage])
        setInput('')

        setLoadingAI(true)
        try {
            const API_KEY = "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"

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
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
            })

            const data = await response.json()
            const botMessage = {
                id: messages.length + 2,
                text: data.choices?.[0]?.message?.content || 'Non ho capito, puoi ripetere?',
                sender: 'bot'
            }
            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            const errorMessage = {
                id: messages.length + 2,
                text: "C'è stato un errore con la richiesta. Riprovare.",
                sender: 'bot'
            }
            setMessages(prev => [...prev, errorMessage])
        }
        setLoadingAI(false)

        // Scroll to bottom after new message
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true })
        }, 100)
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Area messaggi */}
            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContentContainer}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
            >
                {messages.map((message) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageBubble,
                            message.sender === 'user' ? styles.userBubble : styles.botBubble
                        ]}
                    >
                        <Text style={message.sender === 'user' ? styles.userText : styles.botText}>
                            {message.text}
                        </Text>
                    </View>
                ))}
                {loadingAI && (
                    <View style={[styles.messageBubble, styles.botBubble]}>
                        <ActivityIndicator size="small" color={green} />
                    </View>
                )}
            </ScrollView>

            {/* Input area - Soluzione per modal presentation su iOS */}
            <View style={styles.inputWrapper}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.inputContainer}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                >
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Scrivi un messaggio..."
                        placeholderTextColor="#999"
                        multiline
                        enablesReturnKeyAutomatically
                        returnKeyType="send"
                        onSubmitEditing={aiApi}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={aiApi}
                        disabled={loadingAI}
                    >
                        <Ionicons
                            name="send"
                            size={24}
                            color={loadingAI ? "#ccc" : green}
                        />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default ChatBox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerIcon: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    header: {
        flexDirection: "row",
        backgroundColor: green, // Usato il verde invece del blu
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    messagesContentContainer: {
        paddingBottom: 20
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 15,
        marginBottom: 10,
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: green, // Usato il verde invece del blu
        borderBottomRightRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    botText: {
        color: '#333',
        fontSize: 16,
    },
    userText: {
        color: 'white',
        fontSize: 16,
    },
    inputWrapper: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
        maxHeight: 100,
        backgroundColor: '#f9f9f9',
        marginRight: 10,
        fontSize: 16,
    },
    sendButton: {
        padding: 10,
    }
})
