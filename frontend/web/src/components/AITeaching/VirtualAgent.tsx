import React, { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Loader,
  Pause,
  Play,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
  Zap,
} from 'lucide-react';
import { api } from '../../services/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface VirtualAgentProps {
  subject: string;
  topic: string;
  sessionId: string;
  onClose: () => void;
}

const VirtualAgent: React.FC<VirtualAgentProps> = ({
  subject,
  topic,
  sessionId,
  onClose,
}) => {
  const slideDeck = [
    {
      title: `${topic} at a glance`,
      body: `First connect ${topic} to what you already know in ${subject}. We will define the core idea, then apply it to a JEE-style pattern.`,
    },
    {
      title: 'Key concept',
      body: 'Focus on the main relationship, important terms, and the exact conditions where the rule works.',
    },
    {
      title: 'Worked example',
      body: 'Convert the question into known values, choose the right formula or principle, solve step by step, and check units or logic.',
    },
    {
      title: 'Exam tip',
      body: 'Before marking the answer, check for sign convention, units, limiting cases, and whether the option asks for a value, ratio, or explanation.',
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: `Welcome to AI Tutor.\n\nI can explain ${topic} like a teacher presenting slides, then answer your doubts step by step.`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [comprehensionLevel, setComprehensionLevel] = useState(40);
  const [sessionStartTime] = useState(Date.now());
  const [sessionFeedback, setSessionFeedback] = useState<'positive' | 'negative' | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  const buildLocalReply = (question: string) => {
    return `For ${topic}, break your doubt into three parts:\n\n1. What is given?\n2. Which concept from ${subject} applies?\n3. What does the question actually ask?\n\nYour doubt: ${question}\n\nTry one step, then ask me exactly where you get stuck.`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setComprehensionLevel(prev => Math.min(100, prev + 12));

    try {
      const data = sessionId.startsWith('local_')
        ? { ai_response: buildLocalReply(userMessage.content) }
        : await api.sendAITeachingMessage(sessionId, userMessage.content);

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: data.ai_response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          sender: 'ai',
          content: buildLocalReply(userMessage.content),
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSession = async () => {
    try {
      if (!sessionId.startsWith('local_')) {
        await api.completeAITeachingSession(
          sessionId,
          comprehensionLevel,
          sessionFeedback === 'positive' ? 5 : sessionFeedback === 'negative' ? 2 : 3,
        );
      }
    } catch (error) {
      console.error('Error completing session:', error);
    }

    window.speechSynthesis?.cancel();
    onClose();
  };

  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speakSlide = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const slide = slideDeck[currentSlide];
    const utterance = new SpeechSynthesisUtterance(`${slide.title}. ${slide.body}`);
    utterance.rate = 0.92;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const moveSlide = (direction: 'previous' | 'next') => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setCurrentSlide(prev => {
      if (direction === 'previous') return Math.max(0, prev - 1);
      return Math.min(slideDeck.length - 1, prev + 1);
    });
  };

  const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000 / 60);

  if (!isExpanded) {
    return (
      <div className="fixed bottom-96 right-8 z-40">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white rounded-full p-4 shadow-2xl transition transform hover:scale-110 flex items-center space-x-2 group relative"
          title="Open AI teaching assistant"
        >
          <Zap size={24} className="text-yellow-300" />
          <span className="hidden group-hover:inline text-sm font-semibold max-w-xs whitespace-nowrap">
            AI Tutor
          </span>
          <div className="absolute animate-pulse top-0 right-0 w-3 h-3 bg-green-500 rounded-full" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-[430px] bg-white rounded-2xl shadow-2xl flex flex-col h-full max-h-[92vh] overflow-hidden border-2 border-blue-200 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2">
            <Zap size={20} className="text-yellow-300 animate-pulse" />
            <h3 className="font-bold text-lg">AI PPT Tutor</h3>
          </div>
          <p className="text-xs text-blue-100">{topic} - {subject} - {sessionDuration}m</p>
        </div>
        <button
          onClick={() => {
            handleCompleteSession();
            setIsExpanded(false);
          }}
          className="text-white hover:bg-blue-600 p-2 rounded-full transition"
          title="Close AI tutor"
        >
          <X size={20} />
        </button>
      </div>

      <div className="bg-white border-b border-blue-100 p-4">
        <div className="flex gap-3">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <Bot size={34} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
              Slide {currentSlide + 1} of {slideDeck.length}
            </p>
            <h4 className="font-bold text-gray-900 text-base">{slideDeck[currentSlide].title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed mt-1">{slideDeck[currentSlide].body}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mt-4">
          <button
            type="button"
            onClick={() => moveSlide('previous')}
            disabled={currentSlide === 0}
            className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={speakSlide}
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isSpeaking ? <Pause size={17} /> : <Play size={17} />}
            <span>{isSpeaking ? 'Stop voice' : 'Explain slide'}</span>
          </button>
          <button
            type="button"
            onClick={() => moveSlide('next')}
            disabled={currentSlide === slideDeck.length - 1}
            className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            title="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs px-4 py-3 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <div className="flex items-center justify-between mt-2 gap-2">
                <p className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {message.sender === 'ai' && (
                  <button
                    onClick={() => handleCopyMessage(message.content, message.id)}
                    className={`p-1 rounded transition ${
                      copiedId === message.id
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    title="Copy message"
                  >
                    {copiedId === message.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg rounded-bl-none flex items-center space-x-2 shadow-sm">
              <Loader size={16} className="animate-spin text-blue-600" />
              <span className="text-sm">AI is preparing an explanation...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-3 bg-gray-100 border-t border-gray-200 space-y-2 flex-shrink-0">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-gray-700">Understanding</span>
          <span className="font-bold text-green-600">{Math.round(comprehensionLevel)}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div className="h-2 rounded-full transition-all bg-green-500" style={{ width: `${comprehensionLevel}%` }} />
        </div>

        {messages.length > 2 && (
          <div className="flex items-center justify-center space-x-2 pt-2">
            <span className="text-xs text-gray-600 font-semibold">Helpful?</span>
            <button
              onClick={() => setSessionFeedback(sessionFeedback === 'positive' ? null : 'positive')}
              className={`p-1 rounded transition ${
                sessionFeedback === 'positive'
                  ? 'bg-green-500 text-white scale-110'
                  : 'text-gray-500 hover:text-green-500 hover:scale-105'
              }`}
              title="Yes, this helped"
            >
              <ThumbsUp size={16} />
            </button>
            <button
              onClick={() => setSessionFeedback(sessionFeedback === 'negative' ? null : 'negative')}
              className={`p-1 rounded transition ${
                sessionFeedback === 'negative'
                  ? 'bg-red-500 text-white scale-110'
                  : 'text-gray-500 hover:text-red-500 hover:scale-105'
              }`}
              title="Need more help"
            >
              <ThumbsDown size={16} />
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex space-x-2 bg-white flex-shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a doubt about this slide..."
          disabled={loading}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 text-sm"
          autoFocus
        />
        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition flex items-center font-semibold hover:shadow-md"
          title="Send doubt"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default VirtualAgent;
