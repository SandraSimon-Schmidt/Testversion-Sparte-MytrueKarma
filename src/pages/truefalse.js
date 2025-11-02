import Navbar from '../components/Navbar';

export default function TrueFalse() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">True / False</h1>
      <p>Hier kommt dein True/False-Spiel hin. Nutzer entscheiden, ob Aussagen richtig oder falsch sind.</p>
    </div>
  );
}
