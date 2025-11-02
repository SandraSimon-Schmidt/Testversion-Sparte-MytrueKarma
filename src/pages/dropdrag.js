import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";

// Bundesländer & Städte
const bundeslaender = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg",
  "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
  "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland",
  "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"
];

const initialStaedte = [
  "Stuttgart", "München", "Berlin", "Potsdam",
  "Bremen", "Hamburg", "Wiesbaden", "Schwerin",
  "Hannover", "Düsseldorf", "Mainz", "Saarbrücken",
  "Dresden", "Magdeburg", "Kiel", "Erfurt"
];

// 🔹 Draggable Stadt
function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.8 : 1,
    cursor: "grab",
    display: "inline-block",
    width: "100%",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
}

// 🔹 Droppable Land
function DroppableItem({ id, children, isOver }) {
  const { setNodeRef } = useDroppable({ id });

  const style = {
    backgroundColor: isOver ? "#8fdc8f" : "#90ee90",
    border: "2px solid green",
    minHeight: "40px",
    minWidth: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "5px",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center",
    transition: "background-color 0.2s, transform 0.2s",
    transform: isOver ? "scale(1.05)" : "scale(1)",
  };

  return <div ref={setNodeRef} style={style}>{children}</div>;
}

// 🔹 Haupt-Komponente
export default function DropDrag() {
  const [staedte, setStaedte] = useState([...initialStaedte]);
  const [punkte, setPunkte] = useState(0);
  const [versuche, setVersuche] = useState({});
  const [landVersuche, setLandVersuche] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", datum: "", zusatz: "" });
  const [activeOver, setActiveOver] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 3 } }));

  const handleDragStart = () => {
    if (!startTime) setStartTime(new Date());
  };

  const handleDragOver = (event) => {
    setActiveOver(event.over?.id || null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveOver(null);
    if (!over) return;

    const stadt = active.id;
    const land = over.id;

    const stadtVersuche = versuche[stadt] || 0;
    const landVersucheCount = landVersuche[land] || 0;

    if (stadtVersuche >= 10 || landVersucheCount >= 10) {
      alert("Maximale Versuche erreicht. Spiel wird neu gestartet.");
      window.location.reload();
      return;
    }

    if (getStadtLand(stadt) === land) {
      setPunkte(p => p + 1);
      setStaedte(s => s.filter(x => x !== stadt));
    }

    setVersuche(v => ({ ...v, [stadt]: stadtVersuche + 1 }));
    setLandVersuche(l => ({ ...l, [land]: landVersucheCount + 1 }));
  };

  const getStadtLand = (stadt) => {
    const map = {
      Stuttgart: "Baden-Württemberg", München: "Bayern", Berlin: "Berlin", Potsdam: "Brandenburg",
      Bremen: "Bremen", Hamburg: "Hamburg", Wiesbaden: "Hessen", Schwerin: "Mecklenburg-Vorpommern",
      Hannover: "Niedersachsen", Düsseldorf: "Nordrhein-Westfalen", Mainz: "Rheinland-Pfalz", Saarbrücken: "Saarland",
      Dresden: "Sachsen", Magdeburg: "Sachsen-Anhalt", Kiel: "Schleswig-Holstein", Erfurt: "Thüringen"
    };
    return map[stadt];
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const endTime = new Date();
    const timeDiff = Math.floor((endTime - startTime) / 1000);
    let y = 10;

    const userText = [userInfo.name, userInfo.datum, userInfo.zusatz].filter(x => x).join("   ");
    if (userText) {
      doc.text(userText, 10, y);
      y += 10;
    }
    y += 10;
    doc.text(`Punkte: ${punkte}`, 10, y);
    y += 10;
    doc.text(`Gesamtzeit: ${timeDiff} Sekunden`, 10, y);

    y += 10;
    Object.keys(versuche).forEach((stadt, i) => {
      doc.text(`${stadt} - Versuche: ${versuche[stadt]}`, 10, 60 + i * 10);
    });
    doc.save("Ergebnis.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto mt-28 p-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Hauptstädte zu den Bundesländern ziehen</h1>
        <h3 className="text-center">
          Du kannst eine Stadt maximal 10 Mal in ein Land ziehen und in jedem Land nur maximal 10 Mal eine Stadt ziehen.
          <br />
          Bei Überschreitung wird das Spiel neu gestartet.
          <br />
          Sobald du die erste Stadt ziehst, beginnt die Spielzeit und endet, sobald alle Städte zugeordnet sind.
        </h3>

        {/* Eingabefeld + Punkte + PDF */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <input
            style={{ width: "220px" }}
            placeholder="Name, Datum, Zusatz"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="border p-2 rounded"
          />
          <div className="text-lg font-bold">Punkte: {punkte}</div>
          <button
            onClick={downloadPDF}
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded"
          >
            Ergebnis downloaden
          </button>
        </div>

        {/* Drag & Drop Grid */}
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
          <div className="flex justify-center gap-8 flex-wrap">
            {/* Bundesländer */}
            <div className="grid grid-cols-4 gap-2">
              {bundeslaender.map(b => (
                <DroppableItem key={b} id={b} isOver={activeOver === b}>{b}</DroppableItem>
              ))}
            </div>

            {/* Städte */}
            <div className="grid grid-cols-4 gap-2 max-w-[600px]">
              {staedte.map(s => (
                <DraggableItem key={s} id={s}>
                  <div className="bg-yellow-300 border border-yellow-500 rounded p-4 text-center truncate">{s}</div>
                </DraggableItem>
              ))}
            </div>
          </div>
        </DndContext>
      </main>
    </div>
  );
}
