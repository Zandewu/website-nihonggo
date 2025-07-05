// Nihonggo Profile Component
// Fitur: Menampilkan data user (email, role, poin), tombol logout
// Komponen utama: Profile
// - Logout: Hapus data login dari localStorage dan redirect ke login

"use client";
import React, { useEffect, useState } from "react";
import About from "./about";

const Profile: React.FC = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [quizPoint, setQuizPoint] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("nihonggo_email") || "");
      setRole(localStorage.getItem("nihonggo_role") || "user");
      setQuizPoint(Number(localStorage.getItem("nihonggo_point") || 0));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-2">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xs sm:max-w-sm flex flex-col gap-4 animate-pop-in mt-8 mb-8">
        <h2 className="text-xl font-bold text-blue-700 mb-2 text-center">Profil Akun</h2>
        <div className="flex flex-col gap-2 text-sm">
          <div><span className="font-semibold">Email:</span> {email}</div>
          <div><span className="font-semibold">Role:</span> {role}</div>
          <div><span className="font-semibold">Poin Quiz:</span> {quizPoint}</div>
        </div>
        <a href="/login" className="mt-4 text-blue-600 underline text-center">Ganti Akun / Logout</a>
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('nihonggo_login');
              localStorage.removeItem('nihonggo_role');
              localStorage.removeItem('nihonggo_email');
              localStorage.removeItem('nihonggo_point');
              window.location.href = '/login';
            }
          }}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow transition"
        >
          Logout
        </button>
      </div>
      <div className="w-full max-w-xl mb-8">
        <About />
      </div>
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(.68,-0.55,.27,1.55);
        }
      `}</style>
    </div>
  );
};

export default Profile;
