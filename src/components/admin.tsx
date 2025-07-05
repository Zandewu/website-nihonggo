// Nihonggo Admin Panel
// Fitur: Hanya admin yang bisa akses, membuat quiz multi-stage dan blog baru
// Fungsi utama: handleLogin, handleQuizChange, handleOptionChange, addQuestion, handleQuizSubmit, handleBlogSubmit
// Komponen utama: AdminPanel
//
// - Validasi admin: Hanya admin yang bisa akses panel
// - Form Quiz: Input judul, deskripsi, soal, opsi, jawaban, penjelasan
// - Form Blog: Input judul dan isi blog

"use client";
import React, { useState, useEffect } from "react";

type User = {
  id: number;
  email: string;
  name?: string;
  quizPoint: number;
  role: string;
};

const AdminPanel: React.FC = () => {
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("nihonggo_role") === "admin";

  // Form state untuk quiz
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: 0, explanation: "" }
  ]);

  // Form state untuk blog
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogVideo, setBlogVideo] = useState("");
  const [blogLink, setBlogLink] = useState("");

  // State user
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ email: "", password: "", name: "", quizPoint: 0, role: "user" });
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState("");

  // State untuk pencarian dan filter
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Handler untuk quiz
  const handleQuizChange = (idx: number, field: string, value: string | number) => {
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };
  const handleOptionChange = (qIdx: number, oIdx: number, value: string) => {
    setQuestions(qs => qs.map((q, i) => i === qIdx ? { ...q, options: q.options.map((opt, oi) => oi === oIdx ? value : opt) } : q));
  };
  const addQuestion = () => {
    setQuestions(qs => [...qs, { question: "", options: ["", "", "", ""], answer: 0, explanation: "" }]);
  };

  // Simulasi submit (ganti dengan API call di produksi)
  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quiz berhasil disimpan! (simulasi)");
  };
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Blog berhasil disimpan! (simulasi)");
  };

  // Fetch user dari API
  useEffect(() => {
    async function fetchUsers() {
      setLoadingUser(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
          sort,
          order,
        });
        const res = await fetch(`/api/users?${params.toString()}`);
        const data = await res.json();
        setUsers(data.users);
        setTotal(data.total);
      } catch {
        setUserError("Gagal memuat user");
      } finally {
        setLoadingUser(false);
      }
    }
    if (isAdmin) fetchUsers();
  }, [isAdmin, page, pageSize, sort, order]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUser(true);
    setUserError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error((await res.json()).error || "Gagal tambah user");
      setNewUser({ email: "", password: "", name: "", quizPoint: 0, role: "user" });
      // Refresh user
      const data = await fetch("/api/users").then(r => r.json());
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) setUserError(err.message);
      else setUserError("Gagal tambah user");
    } finally {
      setLoadingUser(false);
    }
  };
  const handleEditUser = (idx: number, field: string, value: string | number) => {
    setUsers(users => users.map((u, i) => i === idx ? { ...u, [field]: value } : u));
  };
  const handleSaveUser = async (idx: number) => {
    setLoadingUser(true);
    setUserError("");
    try {
      const u = users[idx];
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: u.id, quizPoint: u.quizPoint, role: u.role })
      });
      if (!res.ok) throw new Error((await res.json()).error || "Gagal update user");
      setEditIdx(null);
      // Refresh user
      const data = await fetch("/api/users").then(r => r.json());
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) setUserError(err.message);
      else setUserError("Gagal update user");
    } finally {
      setLoadingUser(false);
    }
  };
  const handleDeleteUser = async (id: number) => {
    setLoadingUser(true);
    setUserError("");
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error((await res.json()).error || "Gagal hapus user");
      // Refresh user
      const data = await fetch("/api/users").then(r => r.json());
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) setUserError(err.message);
      else setUserError("Gagal hapus user");
    } finally {
      setLoadingUser(false);
    }
  };

  // Filter dan search user
  // const filteredUsers = users.filter(u => {
  //   const matchSearch =
  //     u.email.toLowerCase().includes(search.toLowerCase()) ||
  //     (u.name || "").toLowerCase().includes(search.toLowerCase());
  //   const matchRole = filterRole ? u.role === filterRole : true;
  //   return matchSearch && matchRole;
  // });

  // Pagination
  const totalPages = Math.ceil(total / pageSize);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // Hapus form login admin, ganti validasi akses
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-2">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs flex flex-col gap-4 animate-pop-in text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Akses Ditolak</h2>
          <p className="text-gray-700 mb-4">Halaman ini hanya bisa diakses oleh admin.</p>
          <a href="/login" className="text-blue-600 underline">Login sebagai admin</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2 sm:px-6 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">Admin Panel</h1>
      <div className="w-full max-w-2xl grid gap-8">
        {/* Tabel User */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-blue-700 mb-4">Daftar User</h2>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              placeholder="Cari email/nama..."
              className="border rounded px-3 py-2 text-sm w-full sm:w-64"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="border rounded px-3 py-2 text-sm w-full sm:w-40"
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
            >
              <option value="">Semua Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="border rounded px-3 py-2 text-sm w-full sm:w-40"
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            >
              <option value={5}>5 / halaman</option>
              <option value={10}>10 / halaman</option>
              <option value={20}>20 / halaman</option>
            </select>
          </div>
          <div className="flex gap-2 mb-2">
            <span className="font-semibold text-sm">Sort:</span>
            <select className="border rounded px-2 py-1 text-sm" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="id">ID</option>
              <option value="email">Email</option>
              <option value="name">Nama</option>
              <option value="quizPoint">Point</option>
              <option value="role">Role</option>
            </select>
            <button className="border rounded px-2 py-1 text-sm" onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>{order === "asc" ? "⬆️" : "⬇️"}</button>
          </div>
          {userError && <div className="text-red-500 text-xs mb-2">{userError}</div>}
          {loadingUser ? <div className="text-blue-500">Memuat...</div> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Nama</th>
                  <th className="p-2 border">Point</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="text-center">
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">
                      {editIdx === users.indexOf(u) ? (
                        <input type="number" value={u.quizPoint} min={0} className="border rounded px-2 py-1 w-16 text-sm" onChange={e => handleEditUser(users.indexOf(u), "quizPoint", Number(e.target.value))} />
                      ) : u.quizPoint}
                    </td>
                    <td className="border p-2">
                      {editIdx === users.indexOf(u) ? (
                        <select value={u.role} className="border rounded px-2 py-1 text-sm" onChange={e => handleEditUser(users.indexOf(u), "role", e.target.value)}>
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      ) : u.role}
                    </td>
                    <td className="border p-2">
                      {editIdx === users.indexOf(u) ? (
                        <button className="bg-green-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleSaveUser(users.indexOf(u))}>Simpan</button>
                      ) : (
                        <>
                          <button className="bg-yellow-400 text-white px-2 py-1 rounded text-xs mr-1" onClick={() => setEditIdx(users.indexOf(u))}>Edit</button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleDeleteUser(u.id)}>Hapus</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
          {/* Pagination */}
          <div className="flex gap-2 mt-4 justify-center items-center">
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700" onClick={() => setPage(1)} disabled={!canPrev}>Awal</button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700" onClick={() => setPage(page - 1)} disabled={!canPrev}>Prev</button>
            <span className="font-semibold text-sm">Halaman {page} / {totalPages}</span>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700" onClick={() => setPage(page + 1)} disabled={!canNext}>Next</button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700" onClick={() => setPage(totalPages)} disabled={!canNext}>Akhir</button>
          </div>
        </div>
        {/* Form Tambah User */}
        <form onSubmit={handleAddUser} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-green-700 mb-2">Tambah User Baru</h2>
          {userError && <div className="text-red-500 text-xs mb-2">{userError}</div>}
          <input type="email" placeholder="Email" className="border rounded-lg px-3 py-2 text-sm" value={newUser.email} onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))} required />
          <input type="password" placeholder="Password" className="border rounded-lg px-3 py-2 text-sm" value={newUser.password} onChange={e => setNewUser(u => ({ ...u, password: e.target.value }))} required />
          <input type="text" placeholder="Nama" className="border rounded-lg px-3 py-2 text-sm" value={newUser.name} onChange={e => setNewUser(u => ({ ...u, name: e.target.value }))} />
          <input type="number" placeholder="Point" className="border rounded-lg px-3 py-2 text-sm" value={newUser.quizPoint} min={0} onChange={e => setNewUser(u => ({ ...u, quizPoint: Number(e.target.value) }))} />
          <select className="border rounded-lg px-3 py-2 text-sm" value={newUser.role} onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit" className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-lg shadow" disabled={loadingUser}>Tambah User</button>
        </form>
        {/* Form Quiz */}
        <form onSubmit={handleQuizSubmit} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-purple-700 mb-2">Buat Quiz Baru</h2>
          <input type="text" placeholder="Judul Stage/Quiz" className="border rounded-lg px-3 py-2 text-sm" value={quizTitle} onChange={e => setQuizTitle(e.target.value)} required />
          <textarea placeholder="Deskripsi Stage/Quiz" className="border rounded-lg px-3 py-2 text-sm" value={quizDesc} onChange={e => setQuizDesc(e.target.value)} required />
          {questions.map((q, idx) => (
            <div key={idx} className="border rounded-lg p-3 mb-2">
              <input type="text" placeholder={`Soal ${idx+1}`} className="border rounded px-2 py-1 w-full mb-2 text-sm" value={q.question} onChange={e => handleQuizChange(idx, "question", e.target.value)} required />
              <div className="grid grid-cols-2 gap-2 mb-2">
                {q.options.map((opt, oIdx) => (
                  <input key={oIdx} type="text" placeholder={`Opsi ${oIdx+1}`} className="border rounded px-2 py-1 text-sm" value={opt} onChange={e => handleOptionChange(idx, oIdx, e.target.value)} required />
                ))}
              </div>
              <div className="flex gap-2 items-center mb-2">
                <label className="text-xs">Jawaban Benar:</label>
                <select value={q.answer} onChange={e => handleQuizChange(idx, "answer", Number(e.target.value))} className="border rounded px-2 py-1 text-sm">
                  {q.options.map((_, oIdx) => <option key={oIdx} value={oIdx}>{`Opsi ${oIdx+1}`}</option>)}
                </select>
              </div>
              <input type="text" placeholder="Penjelasan (opsional)" className="border rounded px-2 py-1 w-full text-sm" value={q.explanation} onChange={e => handleQuizChange(idx, "explanation", e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="bg-blue-100 text-blue-700 rounded px-3 py-1 text-xs font-semibold w-fit">+ Tambah Soal</button>
          <button type="submit" className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-lg shadow mt-2">Simpan Quiz</button>
        </form>
        {/* Form Blog */}
        <form onSubmit={handleBlogSubmit} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-purple-700 mb-2">Buat Blog Baru</h2>
          <input type="text" placeholder="Judul Blog" className="border rounded-lg px-3 py-2 text-sm" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} required />
          <textarea placeholder="Deskripsi Blog" className="border rounded-lg px-3 py-2 text-sm" value={blogDesc} onChange={e => setBlogDesc(e.target.value)} required />
          <input type="text" placeholder="Link Gambar (opsional)" className="border rounded px-2 py-1 w-full text-sm" value={blogImage} onChange={e => setBlogImage(e.target.value)} />
          <input type="text" placeholder="Link Video (opsional)" className="border rounded px-2 py-1 w-full text-sm" value={blogVideo} onChange={e => setBlogVideo(e.target.value)} />
          <input type="text" placeholder="Link Terkait (opsional)" className="border rounded px-2 py-1 w-full text-sm" value={blogLink} onChange={e => setBlogLink(e.target.value)} />
          <button type="submit" className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold py-2 rounded-lg shadow">Simpan Blog</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
