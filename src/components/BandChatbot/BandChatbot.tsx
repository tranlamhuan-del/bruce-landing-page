'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  image?: string;
}

export default function BandChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Chào anh/chị! Em là trợ lý thu chi Band Đại Nam. Anh/chị có thể hỏi em về tồn quỹ, giao dịch, hoặc nhập thu chi bằng cách mô tả. Gửi hình invoice để em nhập nhanh ạ!' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text && !selectedImage) return;

    const userMsg: Message = {
      role: 'user',
      text: text || 'Phân tích hóa đơn này',
      image: imagePreview || undefined,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.slice(1).map(m => ({ role: m.role, text: m.text }));

    try {
      const formData = new FormData();
      formData.append('message', userMsg.text);
      formData.append('history', JSON.stringify(history));
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      removeImage();

      const res = await fetch('/api/band/chat', { method: 'POST', body: formData });
      const data = await res.json();

      let reply = data.reply || 'Xin lỗi, tôi không thể trả lời lúc này.';
      if (data.createdTransaction) {
        reply += `\n\n✅ Đã tạo giao dịch #${data.createdTransaction.id}`;
      }

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Lỗi kết nối. Vui lòng thử lại.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all z-50 cursor-pointer"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center gap-3">
            <span className="text-xl">🤖</span>
            <div>
              <div className="font-semibold text-sm">Trợ lý Thu Chi</div>
              <div className="text-xs text-blue-300">Band Đại Nam</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-slate-100 text-slate-800 rounded-bl-md'
                }`}>
                  {msg.image && (
                    <img src={msg.image} alt="uploaded" className="max-w-full rounded-lg mb-2 max-h-32 object-cover" />
                  )}
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-slate-400">
                  Đang suy nghĩ...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="px-4 pb-2">
              <div className="relative inline-block">
                <img src={imagePreview} alt="preview" className="h-16 rounded-lg border border-slate-200" />
                <button onClick={removeImage}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center cursor-pointer">
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-200 p-3 flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Gửi hình invoice"
            >
              📎
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi hoặc nhập giao dịch..."
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none max-h-20 focus:outline-none focus:border-blue-400"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={loading || (!input.trim() && !selectedImage)}
              className="p-2 text-blue-600 hover:text-blue-800 disabled:text-slate-300 transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
