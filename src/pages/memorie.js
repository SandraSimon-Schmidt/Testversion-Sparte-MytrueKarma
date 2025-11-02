import Navbar from '../components/Navbar';

export default function Memory() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Memory</h1>
      <p>Hier kommt dein Memory-Spiel hin. Nutzer finden passende Paare von Bildern oder Begriffen.</p>
    </div>
  );
}
