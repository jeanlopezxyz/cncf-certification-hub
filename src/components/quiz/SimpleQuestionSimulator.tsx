import React, { useState, useEffect } from 'react';
import { useTranslations } from '../../i18n/utils';
import type { Language } from '../../types';
import { useOptimizedStorage } from '../../utils/storage';

interface Question {
  id: string;
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SimpleQuizState {
  isActive: boolean;
  mode: 'exam' | 'study' | null;
  currentQuestion: number;
  answers: (number | null)[];
  startTime: number | null;
  showResults: boolean;
}

interface SimpleQuestionSimulatorProps {
  questions: Question[];
  examDuration: number;
  certificationId: string;
  lang: Language;
}

export default function SimpleQuestionSimulator({
  questions,
  examDuration,
  certificationId,
  lang,
}: SimpleQuestionSimulatorProps) {
  const t = useTranslations(lang);
  const storage = useOptimizedStorage();
  
  const [state, setState] = useState<SimpleQuizState>({
    isActive: false,
    mode: null,
    currentQuestion: 0,
    answers: new Array(questions.length).fill(null),
    startTime: null,
    showResults: false,
  });

  // Load saved state
  useEffect(() => {
    const saved = storage.getItem(`simple-quiz-${certificationId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
        console.warn('Failed to load quiz state:', error);
      }
    }
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (state.isActive || state.showResults) {
      storage.setItem(`simple-quiz-${certificationId}`, JSON.stringify(state));
    }
  }, [state, certificationId, storage]);

  const startQuiz = (mode: 'exam' | 'study') => {
    setState({
      isActive: true,
      mode,
      currentQuestion: 0,
      answers: new Array(questions.length).fill(null),
      startTime: Date.now(),
      showResults: false,
    });
  };

  const selectAnswer = (answerIndex: number) => {
    setState(prev => ({
      ...prev,
      answers: prev.answers.map((ans, idx) => 
        idx === prev.currentQuestion ? answerIndex : ans
      )
    }));
  };

  const nextQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.min(prev.currentQuestion + 1, questions.length - 1)
    }));
  };

  const prevQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.max(prev.currentQuestion - 1, 0)
    }));
  };

  const finishQuiz = () => {
    setState(prev => ({
      ...prev,
      isActive: false,
      showResults: true
    }));
  };

  const resetQuiz = () => {
    storage.removeItem(`simple-quiz-${certificationId}`);
    setState({
      isActive: false,
      mode: null,
      currentQuestion: 0,
      answers: new Array(questions.length).fill(null),
      startTime: null,
      showResults: false,
    });
  };

  // Calculate results
  const calculateScore = () => {
    const correct = state.answers.filter((ans, idx) => 
      ans === questions[idx]?.correctAnswer
    ).length;
    return Math.round((correct / questions.length) * 100);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-2xl p-6 sm:p-8 border border-blue-700/50">
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Practice Questions
            </h2>
            <div className="text-gray-300 mb-4">
              Practice questions for this certification are coming soon!
            </div>
            <div className="text-sm text-gray-400">
              Check back later for interactive practice questions.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Start screen
  if (!state.isActive && !state.showResults) {
    return (
      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-2xl p-6 sm:p-8 border border-blue-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Practice Exam Simulator
            </h2>
            <p className="text-gray-300 text-lg">
              Test your knowledge with {questions.length} practice questions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-slate-800/50 rounded-xl">
              <div className="text-2xl font-bold text-blue-400 mb-2">{questions.length}</div>
              <div className="text-gray-300 text-sm">Questions Available</div>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl">
              <div className="text-2xl font-bold text-blue-400 mb-2">{examDuration} min</div>
              <div className="text-gray-300 text-sm">Suggested Duration</div>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl">
              <div className="text-2xl font-bold text-blue-400 mb-2">75%</div>
              <div className="text-gray-300 text-sm">Passing Score</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 bg-red-900/20 border border-red-700/40 rounded-xl flex flex-col">
              <h4 className="text-lg font-semibold text-red-300 mb-3">Exam Mode</h4>
              <ul className="text-sm text-gray-300 space-y-2 mb-4 flex-1">
                <li>• Sequential questions (no going back)</li>
                <li>• Must answer to proceed</li>
                <li>• Simulates real exam conditions</li>
                <li>• Results shown at the end</li>
              </ul>
              <button
                onClick={() => startQuiz('exam')}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors mt-auto"
              >
                Start Exam Mode
              </button>
            </div>

            <div className="p-6 bg-green-900/20 border border-green-700/40 rounded-xl flex flex-col">
              <h4 className="text-lg font-semibold text-green-300 mb-3">Study Mode</h4>
              <ul className="text-sm text-gray-300 space-y-2 mb-4 flex-1">
                <li>• Navigate freely between questions</li>
                <li>• Immediate explanations</li>
                <li>• Perfect for learning</li>
                <li>• Review answers as you go</li>
              </ul>
              <button
                onClick={() => startQuiz('study')}
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors mt-auto"
              >
                Start Study Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (state.showResults) {
    const score = calculateScore();
    const correct = state.answers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length;
    const passed = score >= 75;

    return (
      <div className={`p-6 sm:p-8 rounded-2xl border-2 ${
          passed
            ? 'bg-gradient-to-br from-green-900/40 to-emerald-950/50 border-green-700/50'
            : 'bg-gradient-to-br from-red-900/40 to-red-950/50 border-red-700/50'
        }`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
            <div className="text-5xl font-bold mb-4 text-blue-400">{score}%</div>
            <div className={`text-xl font-semibold ${passed ? 'text-green-300' : 'text-red-300'}`}>
              {passed ? 'PASSED' : 'FAILED'} (Threshold: 75%)
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">{correct}</div>
              <div className="text-sm text-gray-300">Correct</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">{questions.length - correct}</div>
              <div className="text-sm text-gray-300">Incorrect</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">
                {state.startTime ? Math.floor((Date.now() - state.startTime) / 60000) : 0} min
              </div>
              <div className="text-sm text-gray-300">Time Used</div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Print Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  const currentQ = questions[state.currentQuestion];
  const userAnswer = state.answers[state.currentQuestion];
  const isLastQuestion = state.currentQuestion === questions.length - 1;
  const canGoNext = state.mode === 'study' || userAnswer !== null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Question {state.currentQuestion + 1} of {questions.length}
            </h2>
            <div className="text-sm text-gray-400">Domain: {currentQ?.domain}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={finishQuiz}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
            >
              Finish
            </button>
            <button
              onClick={resetQuiz}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Progress: {Math.round(((state.currentQuestion + 1) / questions.length) * 100)}%</span>
            <span>{state.answers.filter(a => a !== null).length} answered</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="p-8 bg-gradient-to-br from-blue-900/40 to-blue-950/50 rounded-2xl border border-blue-700/50">
          <div className="mb-6">
            <h3 className="text-xl text-white leading-relaxed">{currentQ?.question}</h3>
          </div>

          <div className="space-y-3">
            {currentQ?.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  userAnswer === index
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-slate-600/50 bg-slate-800/30 hover:border-slate-500/70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name={`question-${state.currentQuestion}`}
                    checked={userAnswer === index}
                    onChange={() => selectAnswer(index)}
                    className="mt-1 w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-300 leading-relaxed">
                    <span className="font-medium text-gray-200 mr-2">
                      {String.fromCharCode(65 + index)})
                    </span>
                    {option}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {/* Study Mode Explanation */}
          {state.mode === 'study' && userAnswer !== null && currentQ && (
            <div className={`mt-6 p-4 rounded-lg border ${
              userAnswer === currentQ.correctAnswer
                ? 'bg-green-900/20 border-green-700/40'
                : 'bg-red-900/20 border-red-700/40'
            }`}>
              <div className={`font-semibold mb-2 ${
                userAnswer === currentQ.correctAnswer ? 'text-green-300' : 'text-red-300'
              }`}>
                {userAnswer === currentQ.correctAnswer ? 'Correct!' : 'Incorrect'}
              </div>
              <div className="text-gray-300 text-sm">{currentQ.explanation}</div>
              {userAnswer !== currentQ.correctAnswer && (
                <div className="mt-2 text-sm text-green-300">
                  Correct answer: {String.fromCharCode(65 + currentQ.correctAnswer)}) {currentQ.options[currentQ.correctAnswer]}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Mobile */}
        <div className="sm:hidden w-full">
          <div className="grid grid-cols-2 gap-3">
            {state.mode === 'study' && (
              <button
                onClick={prevQuestion}
                disabled={state.currentQuestion === 0}
                className="px-4 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors"
              >
                Previous
              </button>
            )}
            {isLastQuestion ? (
              <button
                onClick={finishQuiz}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors col-span-full"
              >
                Finish Quiz
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={state.mode === 'exam' && !canGoNext}
                className={`px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors ${
                  state.mode === 'exam' ? 'col-span-full' : ''
                }`}
              >
                Next {state.mode === 'exam' && !canGoNext ? '(Answer Required)' : ''}
              </button>
            )}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
          {state.mode === 'study' ? (
            <button
              onClick={prevQuestion}
              disabled={state.currentQuestion === 0}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          <div className="text-sm text-gray-400">
            {state.currentQuestion + 1} / {questions.length}
          </div>

          {isLastQuestion ? (
            <button
              onClick={finishQuiz}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Finish Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={state.mode === 'exam' && !canGoNext}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Next {state.mode === 'exam' && !canGoNext ? '(Answer Required)' : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}