// Nihonggo Home Component
// Fitur: Menampilkan pengenalan, tujuan, dan kontak komunitas Nihonggo
// Komponen utama: Home

"use client";
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-2 sm:p-4 md:p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-xl w-full flex flex-col items-center">
                <Image src="/image0.svg" alt="Descriptive alt text" width={300} height={300} className="mb-4 sm:mb-6 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px]" />
                <div className="w-full">
                    <h1 className="font-bold text-lg sm:text-xl mb-2 text-blue-700">Pengertian:</h1>
                    <p className="mb-4 sm:mb-6 text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
                        Nihonggo adalah komunitas belajar bahasa dan budaya Jepang yang terbuka untuk siapa saja. Di sini, kamu bisa mengenal huruf, kosakata, dan tata bahasa Jepang dari dasar hingga mahir, sambil memahami kebiasaan, tradisi, serta kehidupan sehari-hari di Jepang. Kami menyediakan materi interaktif, diskusi seru, dan berbagai aktivitas menarik agar proses belajar jadi lebih menyenangkan dan mudah dipahami. Bergabunglah bersama kami untuk memperluas wawasan dan membangun relasi dengan teman-teman yang memiliki minat yang sama!
                    </p>
                    <h1 className="font-bold text-lg sm:text-xl mb-2 text-black-700">Tujuan:</h1>
                    <ol className="list-decimal ml-4 sm:ml-6 space-y-2 sm:space-y-3">
                        <li className="font-semibold text-base sm:text-lg ">
                            Menambah wawasan budaya Jepang yang seru dan kekinian!
                        </li>
                        <li className="font-semibold text-base sm:text-lg ">
                            Belajar bahasa Jepang dengan cara asik bareng teman baru!
                        </li>
                        <li className="font-semibold text-base sm:text-lg ">
                            Ikut event, lomba, dan kegiatan kreatif yang bikin kamu makin keren!
                        </li>
                    </ol>
                </div>
                <div className="w-full mt-6">
                    {/* Kontak dipindahkan ke About, tidak ditampilkan di sini */}
                </div>
            </div>
            <style jsx>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-2deg); }
                    50% { transform: rotate(2deg); }
                }
                .animate-wiggle {
                    animation: wiggle 1s infinite;
                }
            `}</style>
        </div>
    );
}