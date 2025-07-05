// Prestasi Page

"use client";

import React from "react";

import PrestasiList from "@/components/prestasi-list";



export default function PrestasiPage() {

  return (

    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">

      <h1 className="text-3xl font-bold text-blue-700 mb-4">Prestasi</h1>

      <p className="text-lg text-gray-700 max-w-xl text-center mb-8">

        Halaman ini menampilkan daftar prestasi, penghargaan, atau pencapaian yang telah diraih oleh pengguna atau komunitas Nihonggo.

      </p>

      <PrestasiList />

    </main>

  );

}

