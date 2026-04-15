import { format } from 'date-fns';
import { MessageCircle, Sparkles, Heart } from 'lucide-react';

export const DailyMotivation = ({ selectedDate, getDailyQuote }) => {
  const quote = getDailyQuote(selectedDate);
  const formattedDate = format(selectedDate, 'EEEE, MMMM d');

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl shadow-medium border border-neutral-200 p-6 animate-fade-in">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-10">
        <Sparkles size={32} className="text-accent-purple" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-5">
        <Heart size={24} className="text-accent-pink" />
      </div>
      
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-accent-purple/10 rounded-xl">
          <MessageCircle size={20} className="text-accent-purple" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Daily Inspiration</h3>
          <p className="text-sm text-neutral-500">{formattedDate}</p>
        </div>
      </div>
      
      {/* Quote */}
      <div className="relative">
        <div className="absolute -left-2 -top-2 text-4xl text-accent-purple/20 font-serif">"</div>
        <blockquote className="text-base leading-relaxed text-neutral-700 pl-6 italic font-medium">
          {quote}
        </blockquote>
        <div className="absolute -right-2 -bottom-2 text-4xl text-accent-purple/20 font-serif">"</div>
      </div>
      
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-neutral-100">
        <div className="flex items-center space-x-2 text-sm text-neutral-500">
          <Sparkles size={14} className="text-accent-orange" />
          <span>Keep shining, you're doing amazing!</span>
        </div>
      </div>
    </div>
  );
};