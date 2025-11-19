'use client';

import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [topics, setTopics] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [urlAnalyzed, setUrlAnalyzed] = useState(false);

  const handleGetStarted = async () => {
    if (!websiteUrl) {
      alert('Please enter a website URL first');
      return;
    }

    setUrlAnalyzed(true);
    const initialMessage = `Generate a blog snippet about ${topics || 'topics relevant to my business'}.`;
    
    const newUserMessage: Message = { role: 'user', content: initialMessage };
    setMessages([newUserMessage]);
    
    await generateContent(initialMessage, []);
  };

  const generateContent = async (userMessage: string, history: Message[]) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl,
          topics,
          userMessage,
          history,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = { role: 'assistant', content: data.content };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        alert('Error: ' + (data.error || 'Failed to generate content'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    await generateContent(input, messages);
  };

  const handleClearChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-cream-white flex">
      {/* Sidebar */}
      <aside className="w-80 bg-midnight-green text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Auto-Phil Blog Agent</h1>
          <p className="text-sm text-gray-300">Generate SEO & AEO optimized content</p>
        </div>

        <div className="flex-1 space-y-6">
          {/* Website URL Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Business Website URL *
            </label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-autophil-blue"
              disabled={urlAnalyzed}
            />
          </div>

          {/* Blog Topics Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Blog Topics (Optional)
            </label>
            <textarea
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="e.g., automation, AI implementation, SEO strategies"
              rows={4}
              className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-autophil-blue resize-none"
            />
          </div>

          <hr className="border-gray-600" />

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            disabled={!websiteUrl || urlAnalyzed}
            className="w-full py-3 bg-autophil-blue hover:bg-darker-blue text-white font-semibold rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Get Started
          </button>

          {/* Clear Chat Button */}
          <button
            onClick={handleClearChat}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
          >
            Clear Chat
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-600 text-xs text-gray-400 space-y-1">
          <p className="font-semibold">Auto-Phil, LLC © 2025</p>
          <p>Automations, SEO, and AI Implementation</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-6">
          <h2 className="text-3xl font-bold text-midnight-green">Blog Snippet Generator</h2>
          <p className="text-gray-600 mt-2">Generate SEO and AEO optimized blog snippets tailored to your business</p>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!websiteUrl && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
              Please enter your business website URL in the sidebar, then click 'Get Started' to begin.
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-start' : 'justify-start'}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                message.role === 'user' ? 'bg-midnight-green' : 'bg-autophil-blue'
              }`}>
                <div className="w-6 h-6 rounded-full bg-white opacity-30"></div>
              </div>

              {/* Message Content */}
              <div className="flex-1 bg-white rounded-lg shadow-sm p-4 prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}

          {/* Loading Animation */}
          {isLoading && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-autophil-blue">
                <div className="w-6 h-6 rounded-full bg-white opacity-30"></div>
              </div>
              <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
                <CrystalLoader />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        {urlAnalyzed && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What blog snippet would you like me to generate?"
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-autophil-blue disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-autophil-blue hover:bg-darker-blue text-white font-semibold rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-midnight-green">
          <p className="font-semibold">Auto-Phil Blog Agent</p>
          <p className="text-gray-600 text-xs mt-1">Turning tech apprehension into anticipation for SME and Startups</p>
        </footer>
      </main>
    </div>
  );
}

// Crystal Loading Animation Component
function CrystalLoader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="crystal-loader">
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
      </div>
    </div>
  );
}
