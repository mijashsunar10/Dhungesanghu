import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, RefreshCw, Play, Timer, Check, X, Brain, Calculator, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageBanner } from '../components/PageBanner';
import { getTriviaQuestions, saveGameScore, getGameScores, type GameScoreInfo } from '../api';

interface Question {
  id?: string;
  question: string;
  options: string[];
  answer: number;
  order?: number;
}

export const GameZone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'trivia' | 'math' | 'memory' | 'leaderboard'>('home');

  // Submission state
  const [playerName, setPlayerName] = useState('');
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);

  // Leaderboard states
  const [leaderboardScores, setLeaderboardScores] = useState<GameScoreInfo[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [selectedLeaderboardTab, setSelectedLeaderboardTab] = useState<'trivia' | 'math' | 'memory'>('trivia');

  const loadLeaderboardData = async (game: 'trivia' | 'math' | 'memory') => {
    try {
      setLoadingLeaderboard(true);
      const data = await getGameScores(game);
      setLeaderboardScores(data);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'leaderboard') {
      loadLeaderboardData(selectedLeaderboardTab);
    }
  }, [activeTab, selectedLeaderboardTab]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 1
    },
    {
      question: "What is the capital city of Nepal?",
      options: ["Pokhara", "Lalitpur", "Kathmandu", "Bhaktapur"],
      answer: 2
    },
    {
      question: "What is 15 multiplied by 4?",
      options: ["50", "60", "70", "80"],
      answer: 1
    },
    {
      question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      answer: 2
    },
    {
      question: "Who is known as the father of modern physics?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
      answer: 1
    },
    {
      question: "What is the chemical formula for water?",
      options: ["CO2", "NaCl", "H2O", "O2"],
      answer: 2
    },
    {
      question: "Which is the tallest mountain in the world?",
      options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      answer: 0
    },
    {
      question: "How many bones are there in an adult human body?",
      options: ["204", "206", "210", "220"],
      answer: 1
    }
  ]);

  useEffect(() => {
    getTriviaQuestions()
      .then(data => {
        if (data && data.length > 0) {
          setQuestions(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      })
      .catch(err => console.error('Failed loading trivia questions:', err));
  }, []);

  // Trivia State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [triviaFinished, setTriviaFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Math Game State
  const [mathScore, setMathScore] = useState(0);
  const [numA, setNumA] = useState(0);
  const [numB, setNumB] = useState(0);
  const [operator, setOperator] = useState<'+' | '-' | '*'>('+');
  const [mathOptions, setMathOptions] = useState<number[]>([]);
  const [mathTimer, setMathTimer] = useState(15);
  const [mathActive, setMathActive] = useState(false);
  const [mathAnswered, setMathAnswered] = useState(false);
  const [mathSelected, setMathSelected] = useState<number | null>(null);

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<{ id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatches, setMemoryMatches] = useState(0);
  const [memoryFinished, setMemoryFinished] = useState(false);

  const memorySymbols = ["🏫", "📚", "🔬", "💻", "🎨", "⚽", "🧠", "🎒"];

  // Initialize Memory Game
  const initMemoryGame = () => {
    const doubleSymbols = [...memorySymbols, ...memorySymbols];
    // Shuffle
    const shuffled = doubleSymbols
      .map((symbol, index) => ({ id: index, symbol, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedIds([]);
    setMemoryMoves(0);
    setMemoryMatches(0);
    setMemoryFinished(false);
    setPlayerName('');
    setScoreSubmitted(false);
    setSubmittingScore(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2 || memoryCards[id].isFlipped || memoryCards[id].isMatched) return;

    // Flip the clicked card
    const updatedCards = memoryCards.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setMemoryCards(updatedCards);

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [firstId, secondId] = newFlipped;
      
      if (memoryCards[firstId].symbol === memoryCards[secondId].symbol) {
        // Match found
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true } 
              : card
          ));
          setMemoryMatches(prev => {
            const nextVal = prev + 1;
            if (nextVal === memorySymbols.length) {
              setMemoryFinished(true);
            }
            return nextVal;
          });
          setFlippedIds([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  // Math Game Logic
  const generateMathQuestion = () => {
    const ops: ('+' | '-' | '*')[] = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = 0;
    let b = 0;
    let correctAns = 0;

    if (op === '+') {
      a = Math.floor(Math.random() * 50) + 1;
      b = Math.floor(Math.random() * 50) + 1;
      correctAns = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 50) + 20;
      b = Math.floor(Math.random() * a);
      correctAns = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 10) + 2;
      correctAns = a * b;
    }

    setNumA(a);
    setNumB(b);
    setOperator(op);
    setMathAnswered(false);
    setMathSelected(null);

    // Generate option list
    const optionsSet = new Set<number>();
    optionsSet.add(correctAns);
    while (optionsSet.size < 4) {
      const variance = Math.floor(Math.random() * 15) - 7;
      const fakeAns = correctAns + (variance === 0 ? 3 : variance);
      if (fakeAns >= 0) optionsSet.add(fakeAns);
    }
    setMathOptions(Array.from(optionsSet).sort(() => Math.random() - 0.5));
  };

  const startMathGame = () => {
    setMathScore(0);
    setMathTimer(20);
    setMathActive(true);
    generateMathQuestion();
    setPlayerName('');
    setScoreSubmitted(false);
    setSubmittingScore(false);
  };

  const handleMathAnswer = (val: number) => {
    if (mathAnswered) return;
    setMathSelected(val);
    setMathAnswered(true);
    let correct = 0;
    if (operator === '+') correct = numA + numB;
    else if (operator === '-') correct = numA - numB;
    else correct = numA * numB;

    if (val === correct) {
      setMathScore(prev => prev + 10);
    }
    
    setTimeout(() => {
      generateMathQuestion();
    }, 1500);
  };

  // Math Timer
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;
    if (mathActive && mathTimer > 0) {
      timerId = setTimeout(() => setMathTimer(t => t - 1), 1000);
    } else if (mathTimer === 0 && mathActive) {
      setMathActive(false);
    }
    return () => clearTimeout(timerId);
  }, [mathTimer, mathActive]);

  // Trivia Handlers
  const handleTriviaAnswer = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
    if (index === questions[currentQuestionIdx].answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextTriviaQuestion = () => {
    setAnswered(false);
    setSelectedOption(null);
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setTriviaFinished(true);
    }
  };

  const restartTrivia = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setTriviaFinished(false);
    setAnswered(false);
    setPlayerName('');
    setScoreSubmitted(false);
    setSubmittingScore(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col font-sans bg-slate-50 min-h-screen"
    >
      <PageBanner 
        title="Student Game Zone" 
        subtitle="Test your knowledge, improve your math speed, and challenge your memory with our educational games!" 
        badge="Learn & Play"
      />

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto px-6 py-12 flex-1 flex flex-col">
        
        {/* Navigation Tabs */}
        {activeTab !== 'home' ? (
          <button 
            onClick={() => setActiveTab('home')}
            className="mb-8 self-start flex items-center gap-2 text-sm font-semibold text-[#652d90] hover:text-[#4b1f6b] bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 transition-colors cursor-pointer"
          >
            ← Back to Game Hub
          </button>
        ) : (
          <div className="mb-6 flex justify-between items-center w-full">
            <h2 className="text-xl font-bold text-slate-800 font-serif">Select a Game</h2>
            <button 
              onClick={() => { setActiveTab('leaderboard'); setSelectedLeaderboardTab('trivia'); }}
              className="flex items-center gap-2 text-sm font-bold text-[#652d90] hover:text-[#4b1f6b] bg-purple-50 hover:bg-purple-100/60 px-5 py-2.5 rounded-full border border-purple-200/50 transition-colors cursor-pointer shadow-sm"
            >
              <Trophy className="h-4 w-4 text-[#652d90]" />
              View Leaderboards
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* HOME / GAME HUB */}
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4 flex-1"
            >
              {/* Trivia Card */}
              <motion.div 
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg flex flex-col items-center text-center justify-between group transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 text-[#652d90] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Brain className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 font-serif mb-3">Trivia Challenge</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                    Test your general knowledge, science, and history facts in this multi-topic trivia quiz!
                  </p>
                </div>
                <button 
                  onClick={() => { setActiveTab('trivia'); restartTrivia(); }}
                  className="w-full bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-white" />
                  Play Trivia
                </button>
              </motion.div>

              {/* Math speed Card */}
              <motion.div 
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg flex flex-col items-center text-center justify-between group transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Calculator className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 font-serif mb-3">Math Quick Quest</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                    Solve as many equations as you can before the timer runs out. Accuracy is key!
                  </p>
                </div>
                <button 
                  onClick={() => { setActiveTab('math'); startMathGame(); }}
                  className="w-full bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-white" />
                  Play Math
                </button>
              </motion.div>

              {/* Memory Card */}
              <motion.div 
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg flex flex-col items-center text-center justify-between group transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Gamepad2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 font-serif mb-3">Memory Match</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">
                    Match the card pairs with minimum moves. Focus, memorize, and clear the board.
                  </p>
                </div>
                <button 
                  onClick={() => { setActiveTab('memory'); initMemoryGame(); }}
                  className="w-full bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-white" />
                  Play Memory
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* TRIVIA GAME */}
          {activeTab === 'trivia' && (
            <motion.div 
              key="trivia"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl w-full mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 flex flex-col gap-6 text-left"
            >
              {!triviaFinished ? (
                <>
                  {/* Header Info */}
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-xs font-bold text-[#652d90] bg-purple-100 px-3.5 py-1.5 rounded-full">
                      Question {currentQuestionIdx + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">Score: {score}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                       className="h-full bg-gradient-to-r from-[#652d90] to-[#4b1f6b] transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif mt-2 leading-relaxed">
                    {questions[currentQuestionIdx].question}
                  </h3>

                  {/* Options List */}
                  <div className="flex flex-col gap-4 mt-2">
                    {questions[currentQuestionIdx].options.map((opt, idx) => {
                      const isCorrect = idx === questions[currentQuestionIdx].answer;
                      const isSelected = idx === selectedOption;

                      let btnStyle = "border-slate-200 hover:border-purple-300 bg-white text-slate-700 hover:bg-purple-50/20";
                      let iconNode = null;

                      if (answered) {
                        if (isCorrect) {
                          btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800";
                          iconNode = <Check className="h-5 w-5 text-emerald-600 shrink-0" />;
                        } else if (isSelected) {
                          btnStyle = "border-rose-500 bg-rose-50 text-rose-800";
                          iconNode = <X className="h-5 w-5 text-rose-600 shrink-0" />;
                        } else {
                          btnStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleTriviaAnswer(idx)}
                          disabled={answered}
                          className={`w-full text-left p-4.5 rounded-2xl border-2 transition-all flex items-center justify-between text-base font-medium cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {iconNode}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next button */}
                  {answered && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={nextTriviaQuestion}
                      className="mt-4 bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3.5 px-8 rounded-2xl self-end flex items-center gap-2 transition-all cursor-pointer"
                    >
                      Next Question →
                    </motion.button>
                  )}
                </>
              ) : (
                /* Finish Screen */
                <div className="text-center py-10 flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    <Award className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-800 font-serif">Trivia Completed!</h3>
                    <p className="text-slate-500 font-light mt-1.5">Here are your score details:</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl px-12 py-6 border border-purple-100 text-center">
                    <span className="text-5xl font-black text-[#652d90]">{score}</span>
                    <span className="text-slate-500 font-semibold block text-sm mt-1">out of {questions.length} correct</span>
                  </div>

                  {/* Leaderboard Score submission */}
                  {!scoreSubmitted ? (
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!playerName.trim()) return;
                        try {
                          setSubmittingScore(true);
                          await saveGameScore({
                            playerName: playerName.trim(),
                            gameType: 'trivia',
                            score: score,
                            maxScore: questions.length
                          });
                          setScoreSubmitted(true);
                        } catch (err) {
                          alert('Failed to save score. Please try again.');
                        } finally {
                          setSubmittingScore(false);
                        }
                      }}
                      className="w-full max-w-sm flex flex-col gap-2 mt-2"
                    >
                      <label className="text-xs font-bold text-slate-500 text-left pl-1">
                        SAVE SCORE TO LEADERBOARD
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          maxLength={25}
                          required
                          className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#652d90] focus:ring-1 focus:ring-[#652d90] rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all"
                        />
                        <button
                          type="submit"
                          disabled={submittingScore}
                          className="bg-[#652d90] hover:bg-[#4b1f6b] disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {submittingScore ? 'Saving...' : 'Submit'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-6 py-3.5 text-center flex flex-col items-center gap-1.5 mt-2 max-w-sm w-full">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                        <Check className="h-4 w-4" /> Score Saved Successfully!
                      </span>
                      <button
                        onClick={() => { setActiveTab('leaderboard'); setSelectedLeaderboardTab('trivia'); }}
                        className="text-xs font-extrabold text-[#652d90] hover:underline"
                      >
                        View Leaderboard →
                      </button>
                    </div>
                  )}
                  <div className="flex gap-4 mt-2">
                    <button 
                      onClick={restartTrivia}
                      className="bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3.5 px-8 rounded-2xl flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Play Again
                    </button>
                    <button 
                      onClick={() => setActiveTab('home')}
                      className="border border-slate-200 hover:bg-slate-50 font-bold py-3.5 px-8 rounded-2xl transition-all text-slate-700 cursor-pointer"
                    >
                      Select Game
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* MATH SPEED GAME */}
          {activeTab === 'math' && (
            <motion.div 
              key="math"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl w-full mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 flex flex-col gap-6 text-left"
            >
              {mathActive ? (
                <>
                  {/* Header Info */}
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-rose-600 bg-rose-50 px-3.5 py-1.5 rounded-full text-sm">
                      <Timer className="h-4 w-4" />
                      <span>Time Left: {mathTimer}s</span>
                    </div>
                    <span className="text-lg font-bold text-slate-700">Score: {mathScore}</span>
                  </div>

                  {/* Question Area */}
                  <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200/50 rounded-2xl py-10 gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Solve this equation</span>
                    <div className="text-4xl sm:text-5xl font-black text-[#652d90] font-mono tracking-wide">
                      {numA} {operator === '*' ? '×' : operator} {numB} = ?
                    </div>
                  </div>

                  {/* Option Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {mathOptions.map((opt, idx) => {
                      let correctAns = 0;
                      if (operator === '+') correctAns = numA + numB;
                      else if (operator === '-') correctAns = numA - numB;
                      else correctAns = numA * numB;

                      const isCorrect = opt === correctAns;
                      const isSelected = opt === mathSelected;

                      let btnStyle = "border-slate-200 hover:border-purple-300 bg-white text-slate-700 hover:bg-purple-50/20";
                      if (mathAnswered) {
                        if (isCorrect) {
                          btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800";
                        } else if (isSelected) {
                          btnStyle = "border-rose-500 bg-rose-50 text-rose-800";
                        } else {
                          btnStyle = "border-slate-100 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleMathAnswer(opt)}
                          disabled={mathAnswered}
                          className={`p-5 rounded-2xl border-2 text-xl font-bold font-mono transition-all text-center cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* Finish Screen */
                <div className="text-center py-10 flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    <Trophy className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-800 font-serif">Time's Up!</h3>
                    <p className="text-slate-500 font-light mt-1.5">You showed outstanding math speeds!</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl px-12 py-6 border border-purple-100 text-center">
                    <span className="text-5xl font-black text-[#652d90]">{mathScore}</span>
                    <span className="text-slate-500 font-semibold block text-sm mt-1">points gathered</span>
                  </div>

                  {/* Leaderboard Score submission */}
                  {!scoreSubmitted ? (
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!playerName.trim()) return;
                        try {
                          setSubmittingScore(true);
                          await saveGameScore({
                            playerName: playerName.trim(),
                            gameType: 'math',
                            score: mathScore,
                            maxScore: mathScore
                          });
                          setScoreSubmitted(true);
                        } catch (err) {
                          alert('Failed to save score. Please try again.');
                        } finally {
                          setSubmittingScore(false);
                        }
                      }}
                      className="w-full max-w-sm flex flex-col gap-2 mt-2"
                    >
                      <label className="text-xs font-bold text-slate-500 text-left pl-1">
                        SAVE SCORE TO LEADERBOARD
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          maxLength={25}
                          required
                          className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#652d90] focus:ring-1 focus:ring-[#652d90] rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all"
                        />
                        <button
                          type="submit"
                          disabled={submittingScore}
                          className="bg-[#652d90] hover:bg-[#4b1f6b] disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {submittingScore ? 'Saving...' : 'Submit'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-6 py-3.5 text-center flex flex-col items-center gap-1.5 mt-2 max-w-sm w-full">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                        <Check className="h-4 w-4" /> Score Saved Successfully!
                      </span>
                      <button
                        onClick={() => { setActiveTab('leaderboard'); setSelectedLeaderboardTab('math'); }}
                        className="text-xs font-extrabold text-[#652d90] hover:underline"
                      >
                        View Leaderboard →
                      </button>
                    </div>
                  )}
                  <div className="flex gap-4 mt-2">
                    <button 
                      onClick={startMathGame}
                      className="bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3.5 px-8 rounded-2xl flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Play Again
                    </button>
                    <button 
                      onClick={() => setActiveTab('home')}
                      className="border border-slate-200 hover:bg-slate-50 font-bold py-3.5 px-8 rounded-2xl transition-all text-slate-700 cursor-pointer"
                    >
                      Select Game
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* MEMORY MATCH GAME */}
          {activeTab === 'memory' && (
            <motion.div 
              key="memory"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl w-full mx-auto flex flex-col gap-6 text-center"
            >
              {/* Header info */}
              <div className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm w-full">
                <span className="text-base font-bold text-[#652d90]">Matches: {memoryMatches} / {memorySymbols.length}</span>
                <span className="text-base font-bold text-slate-600">Moves: {memoryMoves}</span>
              </div>

              {!memoryFinished ? (
                /* Memory Board */
                <div className="grid grid-cols-4 gap-4 mt-2 max-w-md mx-auto w-full aspect-square [perspective:1000px]">
                  {memoryCards.map((card) => {
                    const showSymbol = card.isFlipped || card.isMatched;
                    return (
                      <motion.button
                        layout
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                        whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                        animate={{ rotateY: showSymbol ? 180 : 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className={`aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 shadow-md cursor-pointer ${
                          card.isMatched 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60 cursor-default'
                            : showSymbol
                              ? 'bg-white border-2 border-[#652d90]'
                              : 'bg-gradient-to-tr from-[#652d90] to-[#4b1f6b] hover:from-[#532477] hover:to-[#391752] text-white'
                        }`}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <span 
                          style={{ 
                            transform: showSymbol ? 'rotateY(180deg)' : 'none',
                            backfaceVisibility: 'hidden'
                          }} 
                          className="inline-block"
                        >
                          {showSymbol ? card.symbol : "❓"}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                /* Finish Screen */
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-10 py-12 flex flex-col items-center gap-6 max-w-md mx-auto w-full">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    <Award className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-800 font-serif">Board Cleared!</h3>
                    <p className="text-slate-500 font-light mt-1.5">You have amazing matching capabilities!</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl px-12 py-6 border border-purple-100 text-center w-full">
                    <div className="flex justify-around items-center">
                      <div>
                        <span className="text-4xl font-black text-[#652d90]">{memoryMoves}</span>
                        <span className="text-slate-500 font-semibold block text-xs mt-0.5">Moves taken</span>
                      </div>
                      <div className="h-10 w-[1px] bg-purple-200" />
                      <div>
                        <span className="text-4xl font-black text-emerald-600">100%</span>
                        <span className="text-slate-500 font-semibold block text-xs mt-0.5">Accuracy</span>
                      </div>
                    </div>
                  </div>

                  {/* Leaderboard Score submission */}
                  {!scoreSubmitted ? (
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!playerName.trim()) return;
                        try {
                          setSubmittingScore(true);
                          const calculatedScore = Math.max(10, 200 - memoryMoves * 4);
                          await saveGameScore({
                            playerName: playerName.trim(),
                            gameType: 'memory',
                            score: calculatedScore,
                            maxScore: memoryMoves
                          });
                          setScoreSubmitted(true);
                        } catch (err) {
                          alert('Failed to save score. Please try again.');
                        } finally {
                          setSubmittingScore(false);
                        }
                      }}
                      className="w-full flex flex-col gap-2 mt-2"
                    >
                      <label className="text-xs font-bold text-slate-500 text-left pl-1">
                        SAVE SCORE TO LEADERBOARD
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter your name"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          maxLength={25}
                          required
                          className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#652d90] focus:ring-1 focus:ring-[#652d90] rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all"
                        />
                        <button
                          type="submit"
                          disabled={submittingScore}
                          className="bg-[#652d90] hover:bg-[#4b1f6b] disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          {submittingScore ? 'Saving...' : 'Submit'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-6 py-3.5 text-center flex flex-col items-center gap-1.5 mt-2 w-full">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                        <Check className="h-4 w-4" /> Score Saved Successfully!
                      </span>
                      <button
                        onClick={() => { setActiveTab('leaderboard'); setSelectedLeaderboardTab('memory'); }}
                        className="text-xs font-extrabold text-[#652d90] hover:underline"
                      >
                        View Leaderboard →
                      </button>
                    </div>
                  )}
                  <div className="flex gap-4 mt-2 w-full justify-center">
                    <button 
                      onClick={initMemoryGame}
                      className="bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 transition-all text-sm cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Play Again
                    </button>
                    <button 
                      onClick={() => setActiveTab('home')}
                      className="border border-slate-200 hover:bg-slate-50 font-bold py-3 px-6 rounded-2xl transition-all text-slate-700 text-sm cursor-pointer"
                    >
                      Select Game
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
          {/* LEADERBOARD VIEW */}
          {activeTab === 'leaderboard' && (
            <motion.div 
              key="leaderboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl w-full mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 flex flex-col gap-6 text-left"
            >
              {/* Header */}
              <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-amber-500" />
                  <h2 className="text-2xl font-bold text-slate-800 font-serif">Hall of Fame</h2>
                </div>
                <p className="text-slate-400 text-xs font-light">See the top players and highest scores across all interactive student games!</p>
              </div>

              {/* Game type selector tab pills */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full">
                {(['trivia', 'math', 'memory'] as const).map((game) => (
                  <button
                    key={game}
                    onClick={() => setSelectedLeaderboardTab(game)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm capitalize transition-all cursor-pointer ${
                      selectedLeaderboardTab === game
                        ? 'bg-white text-[#652d90] shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {game === 'math' ? 'Math Quest' : game === 'memory' ? 'Memory Match' : 'Trivia Challenge'}
                  </button>
                ))}
              </div>

              {/* Scores List */}
              {loadingLeaderboard ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <RefreshCw className="h-8 w-8 text-[#652d90] animate-spin" />
                  <p className="text-slate-400 text-xs font-light">Loading scores...</p>
                </div>
              ) : leaderboardScores.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 gap-2.5">
                  <div className="p-3.5 bg-slate-50 rounded-full text-slate-300">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <span className="font-bold text-sm text-slate-700">No scores recorded yet</span>
                  <p className="text-xs font-light max-w-sm">Be the first to secure a spot in the Hall of Fame by finishing a game!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {leaderboardScores.map((item, index) => {
                    // Custom crown styles for top 3
                    const isFirst = index === 0;
                    const isSecond = index === 1;
                    const isThird = index === 2;

                    let rankBg = "bg-slate-100 text-slate-600";
                    if (isFirst) rankBg = "bg-amber-100 text-amber-700 font-extrabold ring-2 ring-amber-300/40";
                    if (isSecond) rankBg = "bg-slate-200 text-slate-700 font-extrabold";
                    if (isThird) rankBg = "bg-orange-100 text-orange-700 font-extrabold";

                    return (
                      <div 
                        key={item.id || index}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                          isFirst 
                            ? 'bg-gradient-to-r from-amber-50/40 to-transparent border-amber-200/50' 
                            : 'bg-white hover:bg-slate-50/50 border-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${rankBg}`}>
                            {index + 1}
                          </span>
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-sm font-bold text-slate-800 ${isFirst ? 'font-serif text-base' : ''}`}>
                              {item.playerName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {item.playedAt ? new Date(item.playedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-base font-black text-[#652d90] block">
                              {item.score}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium block">
                              {selectedLeaderboardTab === 'trivia' && `out of ${item.maxScore} correct`}
                              {selectedLeaderboardTab === 'math' && 'points'}
                              {selectedLeaderboardTab === 'memory' && `${item.maxScore} moves`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};
