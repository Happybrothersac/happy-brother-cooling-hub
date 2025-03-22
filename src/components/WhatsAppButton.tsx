
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/1234567890" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute animate-ping w-full h-full bg-[#25D366] rounded-full opacity-75"></div>
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
