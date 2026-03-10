import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, RefreshCcw } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "How would you describe your ideal atmosphere?",
    options: [
      { id: 'a', text: 'A quiet library at midnight', value: 'mysterious' },
      { id: 'b', text: 'A sun-drenched citrus grove', value: 'energetic' },
      { id: 'c', text: 'A velvet-lined jazz club', value: 'romantic' },
      { id: 'd', text: 'A minimalist glass observatory', value: 'calm' },
    ]
  },
  {
    id: 2,
    question: "Which element resonates with you most?",
    options: [
      { id: 'a', text: 'Ancient Cedarwood', value: 'woody' },
      { id: 'b', text: 'Electric Ozone', value: 'fresh' },
      { id: 'c', text: 'Dark Damask Rose', value: 'floral' },
      { id: 'd', text: 'Warm Spiced Amber', value: 'oriental' },
    ]
  },
  {
    id: 3,
    question: "What is your preferred time of day?",
    options: [
      { id: 'a', text: 'The Golden Hour', value: 'warm' },
      { id: 'b', text: 'High Noon', value: 'bright' },
      { id: 'c', text: 'The Blue Hour', value: 'cool' },
      { id: 'd', text: 'Deep Midnight', value: 'dark' },
    ]
  }
];

export const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Simple logic to determine result
      setResult('SYNRA Velour Mist');
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section id="quiz" className="py-32 px-8 md:px-24 bg-gradient-to-b from-synra-black to-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4">Scent Personality Quiz</h2>
          <p className="text-white/40">Find your digital olfactory match in 30 seconds.</p>
        </div>

        <div className="glass-panel rounded-[32px] p-8 md:p-16 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
          {/* Progress Bar */}
          {!result && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                className="h-full bg-synra-purple"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-2">
                  <span className="text-synra-purple font-mono text-xs uppercase tracking-widest">Question 0{step + 1}</span>
                  <h3 className="text-3xl font-serif font-bold">{QUESTIONS[step].question}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUESTIONS[step].options.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      className="p-6 text-left glass-panel rounded-2xl border-white/5 hover:border-synra-purple transition-all"
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 bg-synra-purple/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check className="w-12 h-12 text-synra-purple" />
                </div>
                <div>
                  <span className="text-synra-gold uppercase tracking-[0.3em] text-xs font-bold">Your Match Found</span>
                  <h3 className="text-5xl font-serif font-bold mt-4 mb-6">{result}</h3>
                  <p className="text-white/40 max-w-md mx-auto leading-relaxed">
                    Based on your preferences, this fragrance harmonizes perfectly with your digital aura and mood profile.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-synra-purple hover:text-white transition-all">
                    View Details
                  </button>
                  <button 
                    onClick={reset}
                    className="px-10 py-4 border border-white/10 rounded-full flex items-center gap-3 hover:bg-white/5 transition-all"
                  >
                    <RefreshCcw className="w-4 h-4" /> Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
