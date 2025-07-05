// PrestasiList Component
import Image from "next/image";
import React from "react";
import prestasi from "@/data/prestasi.json";

export default function PrestasiList() {
  return (
    <ul className="w-full max-w-md space-y-6">
      {prestasi.map((item, i) => (
        <li key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 block">
            <Image
              src={item.photo}
              alt={item.name}
              width={64}
              height={64}
              className="object-cover border-2 border-blue-300 rounded-full"
            />
          </a>
          <div>
            <div className="text-lg font-bold text-blue-700">{item.name}</div>
            <div className="text-base text-gray-600">{item.rank}</div>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">Lihat Profil</a>
          </div>
        </li>
      ))}
    </ul>
  );
}
