import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RotateCcw, Share2 } from 'lucide-react';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

interface Question {
  question: string;
  options: { label: string; emoji: string; value: string }[];
}

const questions: Question[] = [
  {
    question: 'How hungry are you?',
    options: [
      { label: 'A little peckish', emoji: '😊', value: 'light' },
      { label: 'Starving', emoji: '🤤', value: 'heavy' },
      { label: 'I could eat a horse', emoji: '🐴', value: 'feast' },
    ],
  },
  {
    question: 'Spicy or mild?',
    options: [
      { label: 'Bring the heat', emoji: '🔥', value: 'spicy' },
      { label: 'Keep it cool', emoji: '❄️', value: 'mild' },
      { label: 'Somewhere in between', emoji: '😌', value: 'medium' },
    ],
  },
  {
    question: 'What are you in the mood for?',
    options: [
      { label: 'Rice dish', emoji: '🍚', value: 'rice' },
      { label: 'Soup & swallow', emoji: '🥣', value: 'swallow' },
      { label: 'Something from the grill', emoji: '🥩', value: 'grill' },
    ],
  },
  {
    question: 'What about drinks?',
    options: [
      { label: 'Something refreshing', emoji: '🍹', value: 'refresh' },
      { label: 'Traditional', emoji: '🥛', value: 'traditional' },
      { label: 'Water is fine', emoji: '💧', value: 'water' },
    ],
  },
];

const results: Record<string, { meal: string; items: string[]; price: number; description: string }> = {
  'light-rice-spicy-refresh': { meal: 'Light & Spicy Combo', items: ['Small Jollof Rice', 'Fried Plantain', 'Zobo'], price: 6500, description: 'A refreshing spicy combo to hit the spot without weighing you down.' },
  'heavy-swallow-mild-traditional': { meal: 'The Comfort Bowl', items: ['Pounded Yam', 'Egusi Soup', 'Goat Meat', 'Kunu'], price: 9500, description: 'Classic comfort food with a traditional drink. Pure warmth.' },
  'feast-grill-spicy-water': { meal: 'The Full Grill Feast', items: ['Suya Platter', 'Jollof Rice', 'Fried Plantain', 'Pepper Soup'], price: 14000, description: 'Everything off the grill, all the heat. This is the one.' },
  default: { meal: 'Item7Go Signature Platter', items: ['Jollof Rice', 'Suya', 'Plantain', 'Zobo'], price: 12000, description: 'Our crowd-favourite sharing platter. You can\'t go wrong.' },
};

function getResult(answers: string[]): typeof results.default {
  const key = answers.join('-');
  return results[key] || results.default;
}

export default function WhatsNextQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<typeof results.default | null>(null);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  }, [reducedMotion]);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setResult(getResult(newAnswers));
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
    setStarted(false);
  };

  return (
    <section ref={sectionRef} className="bg-ink text-white py-[clamp(50px,8vh,100px)]" style={{ opacity: reducedMotion ? 1 : 0 }}>
      <div className="max-w-[700px] mx-auto px-[clamp(18px,3.4vw,44px)] text-center">
        <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-3">Discover</div>
        <h2 className="font-[var(--font-heading)] text-[clamp(32px,4.5vw,56px)] font-bold tracking-tight leading-none uppercase mb-4">
          WHAT SHOULD<br />I EAT?
        </h2>

        {!started ? (
          <div>
            <p className="text-white/50 text-sm max-w-[36ch] mx-auto mb-8">
              Answer 4 quick questions and we'll recommend the perfect meal for your mood.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="bg-warm text-ink px-10 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-warm-light transition-colors"
            >
              Start Quiz
            </button>
          </div>
        ) : result ? (
          <div className="bg-white/5 border border-white/10 p-8 mt-8">
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-warm mb-2">Your Perfect Meal</div>
            <h3 className="font-[var(--font-heading)] text-3xl font-bold mb-2">{result.meal}</h3>
            <p className="text-white/50 text-sm mb-6">{result.description}</p>

            <div className="space-y-2 mb-6">
              {result.items.map((item) => (
                <div key={item} className="flex items-center justify-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-warm rounded-full" />
                  {item}
                </div>
              ))}
            </div>

            <div className="font-[var(--font-heading)] text-2xl font-bold text-warm mb-6">
              ₦{result.price.toLocaleString()}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#menu" className="bg-warm text-ink px-8 py-3 text-[11px] font-medium tracking-[0.16em] uppercase hover:bg-warm-light transition-colors text-center">
                Order This
              </a>
              <button onClick={reset} className="flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 text-[11px] font-medium tracking-[0.16em] uppercase hover:bg-white/5 transition-colors">
                <RotateCcw size={14} /> Retake
              </button>
              <button className="flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 text-[11px] font-medium tracking-[0.16em] uppercase hover:bg-white/5 transition-colors">
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            {/* Progress */}
            <div className="flex gap-2 justify-center mb-8">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 flex-1 max-w-[80px] transition-colors duration-300 ${i <= currentQ ? 'bg-warm' : 'bg-white/10'}`} />
              ))}
            </div>

            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/30 mb-3">
              Question {currentQ + 1} of {questions.length}
            </div>
            <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold mb-8">
              {questions[currentQ].question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {questions[currentQ].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="bg-white/5 border border-white/10 p-6 hover:border-warm/40 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3">{opt.emoji}</div>
                  <div className="text-sm font-medium">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
