import React, { useState } from 'react';
import { ChatBubbleLeftEllipsisIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const sampleQuestions = [
  "How do I find specific roles in Product Management?",
  "As a student intern, what would increase my chances for landing a role in FAANG?",
  "What skills should I highlight for software engineering roles?",
  "How can I make my profile stand out to recruiters?"
];

const AssistantOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // TODO: Integrate with OpenAI API
    // Simulate AI response for now
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "I'm here to help! This is a placeholder response. We'll integrate with a real AI service soon."
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSampleQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">RoleArc Assistant</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-gray-500 text-sm">Try asking questions like:</p>
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleQuestion(question)}
                      className="block w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2 text-gray-500">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-full px-4 py-2 hover:bg-indigo-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
      >
        <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default AssistantOrb;