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
        description: 'The protagonist of Earth3.0, a former environmental activist who discovers a mysterious locket that leads her on a cosmic journey.'
    },
    {
        id: 'schrodinger',
        name: 'Schrödinger',
        description: 'Dawn\'s enigmatic red cat companion, named after the famous quantum thought experiment. Serves as a philosophical symbol in Earth3.0.'
    }
];

const API_KEY = '';

const AIChatBot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            text: 'Hello! I\'m a character from Earth3.0. Who would you like to chat with today?', 
            sender: 'ai' 
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatMessagesRef = useRef<HTMLDivElement>(null);

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
        // Prevent default form submission behavior if event is provided
        if (e) {
            e.preventDefault();
        }
        
        if (!inputText.trim() || !selectedCharacter) return;
        
        const userMessage: Message = { text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        setTimeout(scrollToBottom, 50);

        try {
            const character = CHARACTERS.find(c => c.id === selectedCharacter);
            
            // Gemini API call
            if (!API_KEY) {
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages(prev => [
                        ...prev,
                        { 
                            text: `[Demo Mode] As ${character?.name}, I would respond to your message: "${inputText}". Please add your Gemini API key to enable the actual AI responses.`, 
                            sender: 'ai',
                            character: selectedCharacter
                        }
                    ]);
                }, 1000);
                return;
            }

            const prompt = `You are ${character?.name} from the Earth3.0 show. ${character?.description} 
            Respond to the following message in character, maintaining the perspective and personality of ${character?.name}.
            Keep responses concise (1-3 sentences) and focused on environmental themes from the show.
            User's message: ${inputText}`;

            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt }
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();
            
            if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                const aiMessage: Message = { 
                    text: data.candidates[0].content.parts[0].text, 
                    sender: 'ai',
                    character: selectedCharacter
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                throw new Error('Failed to get response from Gemini API');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [
                ...prev,
                { 
                    text: 'Sorry, I encountered an error processing your request.', 
                    sender: 'ai',
                    character: selectedCharacter 
                }
            ]);
        } finally {
            setIsTyping(false);
            setTimeout(scrollToBottom, 50);
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
                        className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
                    >
                        {message.sender === 'ai' && message.character && (
                            <div className="character-name">
                                {CHARACTERS.find(c => c.id === message.character)?.name}
                            </div>
                        )}
                        <div className="message-content">
                            {message.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message ai-message">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            {!selectedCharacter ? (
                <div className="character-selection">
                    <h3>Choose a character to chat with:</h3>
                    <div className="character-buttons">
                        {CHARACTERS.map(character => (
                            <button 
                                key={character.id}
                                onClick={() => selectCharacter(character.id)}
                                className="character-button"
                            >
                                {character.name}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <form className="chat-input" onSubmit={(e) => sendMessage(e)}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                sendMessage(e);
                            }
                        }}
                        placeholder="Type your message..."
                        disabled={isTyping}
                    />
                    <button 
                        type="submit" 
                        disabled={isTyping || !inputText.trim()}
                    >
                        Send
                    </button>
                </form>
            )}
        </div>
    );
};

export default AIChatBot; 