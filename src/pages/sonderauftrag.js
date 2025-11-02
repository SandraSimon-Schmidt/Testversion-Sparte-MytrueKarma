import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Sonderauftrag() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formular abgeschickt! (noch nicht aktiv)");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto mt-32 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Sonderauftrag / Individuelles Spiel
        </h1>
        <p className="mb-4">
          Hier können Sie eine der oben gezeigten Spielvarianten nach Ihren Wünschen bestellen.
        </p>
        <p className="mb-4">
          Eine Browser-Version mit PDF-Erstellung kostet derzeit <strong>xx Euro VHB</strong>, 
          eine Klausur-Dokumentations-Version kostet <strong>xx Euro VHB</strong>.
        </p>
        <p className="mb-4">
          Gehen Sie mit mir in Kontakt, indem Sie im untenstehenden Formular Ihre Daten eintragen. 
          Sie erhalten anschließend einen Link, um das Produkt zu testen und danach in den Warenkorb zur vereinbarten Zahlung zu legen.
        </p>
        <p className="mb-6 text-sm text-gray-600">
          Hinweis: 50 % des Erlöses werden für gemeinnützige Zwecke gespendet.
        </p>

        {/* Formular */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">E-Mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Nachricht / Wunschspiel</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Abschicken
          </button>
        </form>
      </main>
    </div>
  );
}
