// Nihonggo Quiz Multi-Stage Component
// Fitur: Quiz multi-stage, hanya bisa diakses setelah login, progress dan animasi ala Duolingo
// Fungsi utama: handleStartStage, handleOptionClick, handleRestart, handleNextStage
// Komponen utama: Quiz
//
// - stages: Array berisi data stage quiz (judul, deskripsi, soal)
// - getStage: Fungsi untuk menentukan tahap user berdasarkan skor
// - Quiz: Komponen utama quiz
// - handleStartStage: Mulai stage
// - handleOptionClick: Proses jawaban user
// - handleRestart: Ulangi stage
// - handleNextStage: Lanjut ke stage berikutnya
// - Validasi login: Quiz hanya bisa diakses jika sudah login

"use client";
import React, { useState, useEffect } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}
interface QuizStage {
  id: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

const getStage = (score: number) => {
  if (score <= 2) return "Pemula";
  if (score <= 5) return "Menengah";
  return "Mahir";
};

// Simulasi autentikasi login (ganti dengan session/auth real di produksi)
const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('nihonggo_login') === 'true';

const Quiz: React.FC = () => {
  const [stages, setStages] = useState<QuizStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stageIdx, setStageIdx] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showStageIntro, setShowStageIntro] = useState(true);

  useEffect(() => {
    // Dynamic import agar Next.js tidak error SSR
    import("../data/quiz.json")
      .then((mod) => {
        setStages(mod.default || mod);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data quiz.");
        setLoading(false);
      });
  }, []);

  const handleStartStage = () => setShowStageIntro(false);

  const handleOptionClick = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].answer) {
      setScore((s) => s + 2);
      setStreak((s) => s + 1);
      setShowCorrect(true);
    } else {
      setStreak(0);
      setShowCorrect(false);
    }
    setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
        setSelected(null);
        setShowCorrect(false);
        if (current + 1 < questions.length) {
          setCurrent((c) => c + 1);
        } else {
          setShowResult(true);
        }
      }, 400);
    }, 900);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setStreak(0);
    setShowStageIntro(true);
  };

  const handleNextStage = () => {
    setStageIdx((idx) => idx + 1);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setStreak(0);
    setShowStageIntro(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Akses Quiz</h2>
          <p className="text-gray-700 mb-4">Silakan login terlebih dahulu untuk mengakses quiz.</p>
          <a href="/login" className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium transition hover:from-purple-500 hover:to-blue-500 shadow">Login</a>
        </div>
      </div>
    );
  }

  // Tampilkan pesan pengembangan
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-xl font-bold text-blue-700 mb-2">Fitur Quiz</h2>
        <p className="text-gray-700 mb-4">Fitur quiz masih dalam pengembangan.</p>
      </div>
    </div>
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-blue-600 font-bold">Memuat quiz...</div>;
  }
  if (error || stages.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{error || "Quiz tidak tersedia."}</div>;
  }

  const questions = stages[stageIdx]?.questions || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-2 sm:px-0">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg p-4 sm:p-8 md:p-10 animate-pop-in">
        {showStageIntro ? (
          <div className="flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="mb-4">
              <div className="flex justify-center gap-2 mb-2">
                {stages.map((stage, idx) => (
                  <span key={idx} className={`w-4 h-4 rounded-full ${idx === stageIdx ? 'bg-blue-500' : 'bg-gray-300'} inline-block`}></span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-blue-700 mb-2">{stages[stageIdx]?.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{stages[stageIdx]?.description}</p>
            </div>
            <button
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium transition hover:from-blue-500 hover:to-green-400 shadow-lg"
              onClick={handleStartStage}
            >
              Mulai Stage
            </button>
          </div>
        ) : !showResult ? (
          <div className={`transition-all duration-500 ${animating ? "animate-slide-out" : "animate-slide-in"}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xl">{'★'.repeat(streak)}</span>
                {streak > 0 && <span className="text-xs text-yellow-500 ml-1">Streak {streak}</span>}
              </div>
              <div className="text-xs text-blue-500 font-bold">Poin: {score}</div>
            </div>
            <div className="h-2 bg-gray-200 rounded mb-5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
            <h2 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-blue-700">
              Soal {current + 1} dari {questions.length}
            </h2>
            <p className="text-sm sm:text-base font-medium mb-4 sm:mb-5 text-gray-800 text-center">
              {questions[current].question}
            </p>
            <div className="flex flex-col gap-2 sm:gap-3">
              {questions[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`py-3 px-2 sm:px-4 rounded-xl text-sm sm:text-base font-medium shadow-sm transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-300
                    ${
                      selected !== null
                        ? idx === questions[current].answer
                          ? "bg-gradient-to-r from-green-400 to-blue-500 text-white animate-pulse"
                          : idx === selected
                          ? "bg-gradient-to-r from-red-400 to-yellow-300 text-white animate-shake"
                          : "bg-gray-100 text-gray-800 opacity-70"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                    }
                  `}
                  onClick={() => handleOptionClick(idx)}
                  disabled={selected !== null}
                >
                  {opt}
                </button>
              ))}
            </div>
            {selected !== null && (
              <div className={`mt-4 rounded-lg px-3 py-2 text-xs sm:text-sm animate-fade-in text-center shadow font-semibold ${showCorrect ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {showCorrect ? 'Benar! ' : 'Kurang tepat. '} {questions[current].explanation}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="mb-4">
              <div className="flex justify-center gap-2 mb-2">
                {stages.map((stage, idx) => (
                  <span key={idx} className={`w-4 h-4 rounded-full ${idx === stageIdx ? 'bg-blue-500' : 'bg-gray-300'} inline-block`}></span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-green-600 mb-2 animate-stage-pop">Stage Selesai!</h2>
              <p className="text-gray-700 text-base mb-2">Selamat, kamu telah menyelesaikan stage ini!</p>
              <div className="flex justify-center gap-1 mb-2 animate-bounce">
                {Array(3).fill(0).map((_,i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
              <p className="text-blue-600 font-bold">Skor: {score} | Tahap: {getStage(score)}</p>
            </div>
            {stageIdx + 1 < stages.length ? (
              <button
                className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-green-500 text-white font-medium transition hover:from-green-500 hover:to-blue-400 shadow-lg"
                onClick={handleNextStage}
              >
                Lanjut ke Stage Berikutnya
              </button>
            ) : (
              <button
                className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium transition hover:from-blue-500 hover:to-green-400 shadow-lg"
                onClick={handleRestart}
              >
                Ulangi Semua Stage
              </button>
            )}
          </div>
        )}
      </div>
      <style>{`
          @keyframes pop-in {
              0% { transform: scale(0.92); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
          }
          .animate-pop-in {
              animation: pop-in 0.6s cubic-bezier(.68,-0.55,.27,1.55);
          }
          @keyframes slideIn {
              from { opacity: 0; transform: translateY(40px);}
              to { opacity: 1; transform: translateY(0);}
          }
          .animate-slide-in {
              animation: slideIn 0.35s;
          }
          @keyframes slideOut {
              from { opacity: 1; transform: translateY(0);}
              to { opacity: 0; transform: translateY(-40px);}
          }
          .animate-slide-out {
              animation: slideOut 0.35s;
          }
          @keyframes pulse {
              0% { box-shadow: 0 0 0 0 #6ee7b7; }
              70% { box-shadow: 0 0 0 12px rgba(110,231,183,0); }
              100% { box-shadow: 0 0 0 0 rgba(110,231,183,0); }
          }
          .animate-pulse {
              animation: pulse 0.7s;
          }
          @keyframes shake {
              0% { transform: translateX(0); }
              20% { transform: translateX(-7px); }
              40% { transform: translateX(7px); }
              60% { transform: translateX(-7px); }
              80% { transform: translateX(7px); }
              100% { transform: translateX(0); }
          }
          .animate-shake {
              animation: shake 0.45s;
          }
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          .animate-fade-in {
              animation: fadeIn 0.5s;
          }
          @keyframes stagePop {
              0% { transform: scale(0.7); opacity: 0; }
              80% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(1); }
          }
          .animate-stage-pop {
              animation: stagePop 0.7s cubic-bezier(.68,-0.55,.27,1.55);
          }
      `}</style>
    </div>
  );
};

export default Quiz;
