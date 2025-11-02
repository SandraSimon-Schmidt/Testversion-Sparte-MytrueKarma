import React from 'react';
import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';

export default function Home() {
  const games = [
    { id: "dropdrag", name: "Drag & Drop", href: "/dropdrag" },
    { id: "multiple-choice-01", name: "Multiple Choice", href: "/multiplechoice" },
    { id: "dropdown-cloze-01", name: "Dropdown", href: "/dropdown-cloze" },
    { id: "zuordnung-01", name: "Zuordnung", href: "/zuordnung" },
    { id: "reihenfolge-01", name: "Reihenfolge", href: "/reihenfolge" },
    { id: "matrix-01", name: "Matrix", href: "/matrix" },
    { id: "memory-01", name: "Memory", href: "/memorie" },
    { id: "true-false-01", name: "True/False", href: "/truefalse" },
    { id: "bildauswahl", name: "Bildauswahl", href: "/bildauswahl" },
    { id: "slider-01", name: "Slider", href: "/zahlenwahl" },
    { id: "entscheidungsbaum-01", name: "Entscheidungsbaum", href: "/Lernpfad" },
    { id: "markieren-01", name: "Markieren", href: "/markieren" },
    { id: "puzzle-01", name: "Puzzle", href: "/puzzle" }
  ];

  const localProject = { name: "Klausur-Dokumentation", href: "/klausur-dokumentation" };

   const universalGame = { 
    name: "Sonderauftrag: Individuelles Spiel\n(VHB-Preis nach Vereinbarung)", 
    href: "/sonderauftrag" 
  };
  

  return (
    <div className="min-h-screen bg-gray-100/50">
      {/* Fixierter Header */}
      <header className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto p-4 text-center text-2xl font-bold text-blue-600">
          EduGames (DE)
        </div>
      </header>

      <main className="container mx-auto p-4 pt-28">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {games.map(game => (
            <GameCard key={game.id} name={game.name} href={game.href} type="normal" />
          ))}

          {/* Lokale Variante / hellblau */}
          <GameCard name={localProject.name} href={localProject.href} type="local" />
        </div>

        {/* Sonderauftrag groß */}
        <div className="mt-6">
          <GameCard name={universalGame.name} href={universalGame.href} type="special" />
        </div>
      </main>
    </div>
  );
}
