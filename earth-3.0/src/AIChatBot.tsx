import React, { useState, useRef, useEffect } from 'react';
import './css/AIChatBot.css';

interface Message {
    text: string;
    sender: 'user' | 'ai';
    character?: string;
}

const CHARACTERS = [
    {
        id: 'dawn',
        name: 'Dawn',
        description:
            'The protagonist of Earth3.0, a former environmental activist who discovers a mysterious locket that leads her on a cosmic journey.'
    },
    {
        id: 'schrodinger',
        name: 'Schrödinger',
        description:
            "Dawn's enigmatic red cat companion, named after the famous quantum thought experiment. Serves as a philosophical symbol in Earth3.0."
    }
];

// Read API key from environment variable (Vite prefix)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Maximum number of API call retries
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

const AIChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Hello! I'm a character from Earth3.0. Who would you like to chat with today?",
            sender: 'ai'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    // Store the full script text
    const [scriptText, setScriptText] = useState<string>('');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatMessagesRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load the script text on mount
    useEffect(() => {
        fetch('/earth3_script.txt')
            .then(res => res.text())
            .then(text => setScriptText(text))
            .catch(err => console.error('Failed to load script:', err));
    }, []);

    const scrollToBottom = () => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const selectCharacter = (characterId: string) => {
        const character = CHARACTERS.find(c => c.id === characterId);
        setSelectedCharacter(characterId);
        setMessages(prev => [
            ...prev,
            {
                text: `You are now chatting with ${character?.name}. How can I help you?`,
                sender: 'ai',
                character: characterId
            }
        ]);
    };

    const sendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputText.trim() || !selectedCharacter) return;

        // Enqueue user message
        setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);
        setInputText('');
        setIsTyping(true);

        // Scroll to bottom after state update
        setTimeout(scrollToBottom, 50);

        const character = CHARACTERS.find(c => c.id === selectedCharacter)!;

        // Build the full prompt including the script text, instructing tone
        const fullPrompt = `
Full Script Reference:
${scriptText}

Character Profile:
You are ${character.name}. ${character.description}

Instruction:
Respond as ${character.name}, adopting their distinct voice, tone, and personality. Keep responses concise (1-3 sentences).

Conversation:
User: "${inputText}"
`.trim();

        // Validate API key
        if (!apiKey) {
            console.error('Missing Gemini API key.');
            setMessages(prev => [
                ...prev,
                {
                    text: 'Configuration error: API key not found. Please check your environment variables.',
                    sender: 'ai',
                    character: selectedCharacter
                }
            ]);
            setIsTyping(false);
            return;
        }

        // Predefined fallback responses for when the API is unavailable
        const fallbackResponses = {
            dawn: [
                "The path to Earth 3.0 requires persistence. Let's try again in a moment.",
                "Even in the face of technological challenges, we must remain hopeful. Let's reconnect shortly.",
                "The cosmic journey has its interruptions. I'll be fully present once our connection stabilizes.",
                "In my journey, I've learned that patience overcomes most obstacles. Our conversation will continue soon."
            ],
            schrodinger: [
                "Purrr... it seems our quantum connection is temporarily collapsed. We'll reconnect when the probability wave expands again.",
                "In the quantum realm, disruptions are merely temporary states of being. Our dialogue will resume shortly.",
                "I exist in multiple states simultaneously, but our connection seems to be in a singular state: offline. Let's retry soon.",
                "The uncertainty principle applies to conversations too. We'll continue when the wave function stabilizes."
            ]
        };

        // Helper function to call the API with retries
        const callGeminiAPI = async (retryCount = 0): Promise<string> => {
            try {
                const res = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: fullPrompt }] }]
                        })
                    }
                );
                
                if (!res.ok) {
                    console.error(`API Error: ${res.status} ${res.statusText}`);
                    
                    // If we have retries left and it's a 503 error (service unavailable), retry
                    if (retryCount < MAX_RETRIES && res.status === 503) {
                        console.log(`Retrying API call (${retryCount + 1}/${MAX_RETRIES})...`);
                        // Wait before retrying
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                        return callGeminiAPI(retryCount + 1);
                    }
                    
                    // If we're out of retries or it's not a 503 error, use fallback
                    // Choose a random fallback response based on character
                    const fallbacks = fallbackResponses[selectedCharacter as keyof typeof fallbackResponses] || fallbackResponses.dawn;
                    const fallbackResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                    
                    return `${fallbackResponse} (API Status: ${res.status})`;
                }
                
                const data = await res.json();
                let response = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Sorry, no response.';
                
                // Clean response by removing character name prefixes
                response = cleanResponse(response, character.name);
                
                return response;
            } catch (err) {
                console.error('API Call Error:', err);
                
                // If we have retries left, retry
                if (retryCount < MAX_RETRIES) {
                    console.log(`Retrying API call (${retryCount + 1}/${MAX_RETRIES})...`);
                    // Wait before retrying
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    return callGeminiAPI(retryCount + 1);
                }
                
                // If we're out of retries, use fallback
                const fallbacks = fallbackResponses[selectedCharacter as keyof typeof fallbackResponses] || fallbackResponses.dawn;
                return fallbacks[Math.floor(Math.random() * fallbacks.length)];
            }
        };

        // Function to clean AI responses by removing character name prefixes
        const cleanResponse = (response: string, characterName: string): string => {
            // Remove "AI:" prefix if present
            response = response.replace(/^AI:\s*/i, '');
            
            // Remove character name prefix like "Dawn:" or "Schrödinger:"
            response = response.replace(new RegExp(`^${characterName}:\\s*`, 'i'), '');
            
            // Remove character name in quotes pattern like 'Dawn: "Text"'
            response = response.replace(new RegExp(`^"?${characterName}:\\s*`, 'i'), '');
            
            // Remove any quotes at the beginning and end if they wrap the entire response
            if (response.startsWith('"') && response.endsWith('"')) {
                response = response.substring(1, response.length - 1);
            }
            
            return response;
        };

        try {
            const aiReply = await callGeminiAPI();
            
            setMessages(prev => [
                ...prev,
                { text: aiReply, sender: 'ai', character: selectedCharacter }
            ]);
        } catch (err) {
            console.error('Unexpected error:', err);
            
            // Final fallback if everything else fails
            const fallbacks = fallbackResponses[selectedCharacter as keyof typeof fallbackResponses] || fallbackResponses.dawn;
            const fallbackResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            
            setMessages(prev => [
                ...prev,
                { 
                    text: fallbackResponse, 
                    sender: 'ai', 
                    character: selectedCharacter 
                }
            ]);
        } finally {
            setIsTyping(false);
            setTimeout(() => {
                scrollToBottom();
                inputRef.current?.focus();
            }, 50);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Earth3.0 Character Chat</h2>
                {selectedCharacter && (
                    <div className="selected-character">
                        Chatting with: {CHARACTERS.find(c => c.id === selectedCharacter)?.name}
                    </div>
                )}
            </div>

            <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}>
                        {message.sender === 'ai' && message.character && (
                            <div className="character-name">
                                {CHARACTERS.find(c => c.id === message.character)?.name}
                            </div>
                        )}
                        <div className="message-content">{message.text}</div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message ai-message">
                        <div className="typing-indicator"><span></span><span></span><span></span></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {!selectedCharacter ? (
                <div className="character-selection">
                    <h3>Choose a character to chat with:</h3>
                    <div className="character-buttons">
                        {CHARACTERS.map(character => (
                            <button key={character.id} onClick={() => selectCharacter(character.id)} className="character-button">
                                {character.name}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <form className="chat-input" onSubmit={sendMessage}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } }}
                        placeholder="Type your message..."
                        disabled={isTyping}
                    />
                    <button type="submit" disabled={isTyping || !inputText.trim()}>Send</button>
                </form>
            )}
        </div>
    );
};

export default AIChatBot;
