import Navbar from '../components/Navbar';

export default function Puzzle() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Puzzle</h1>
      <p>Hier kommt dein Puzzle-Spiel hin. Nutzer setzen Teile in die richtige Reihenfolge oder Form zusammen.</p>
    </div>
  );
}
