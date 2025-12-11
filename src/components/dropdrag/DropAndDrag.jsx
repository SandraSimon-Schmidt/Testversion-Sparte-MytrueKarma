"use client";
import React, { useState, useEffect  } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import jsPDF from "jspdf";
import styles from "./DropAndDrag.module.css";

const bundeslaender = [
 
  "Nordrhein-Westfalen",
  "Berlin",
  "Bayern",
  "Mecklenburg-Vorpommern",
  "Brandenburg",
  "Hamburg",
  "Schleswig-Holstein",
  "Thüringen",
  "Niedersachsen",
  "Rheinland-Pfalz",
  "Saarland",
  "Bremen",
   "Baden-Württemberg",
  "Sachsen",
  "Hessen",
  "Sachsen-Anhalt",
];

const initialStaedte = [
  "Stuttgart",
  "München",
  "Berlin",
  "Potsdam",
  "Bremen",
  "Hamburg",
  "Wiesbaden",
  "Schwerin",
  "Hannover",
  "Düsseldorf",
  "Mainz",
  "Saarbrücken",
  "Dresden",
  "Magdeburg",
  "Kiel",
  "Erfurt",
];

const areaClasses = {
  "Baden-Württemberg": "bw",
  Bayern: "b",
  Berlin: "ber",
  "Mecklenburg-Vorpommern": "mv",
  Bremen: "bremen",
  Hamburg: "hh",
  Hessen: "hessen",
  Brandenburg: "bran",
  Niedersachsen: "nds",
  "Nordrhein-Westfalen": "nrw",
  "Rheinland-Pfalz": "rp",
  Saarland: "saar",
  Sachsen: "sachsen",
  "Sachsen-Anhalt": "sa",
  "Schleswig-Holstein": "sh",
  Thüringen: "thu",
};

function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
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

function DroppableItem({ id, children, isOver, className }) {
  const { setNodeRef } = useDroppable({ id });
  const style = {
    border: isOver ? "2px solid #a855f7" : "2px solid transparent",
    transform: isOver ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s",
  };
  return (
    <div ref={setNodeRef} className={className} style={style}>
      {children}
    </div>
  );
}

export default function DropAndDrag() {
  const [staedte, setStaedte] = useState(initialStaedte); // initiale Reihenfolge fix

  useEffect(() => {
    // Shuffle nur auf dem Client nach Hydration
    setStaedte([...initialStaedte].sort(() => Math.random() - 0.5));
  }, []);

  const [punkte, setPunkte] = useState(0);
  const [versuche, setVersuche] = useState({});
  const [landVersuche, setLandVersuche] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", datum: "", zusatz: "" });
  const [activeOver, setActiveOver] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

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
      setPunkte((p) => p + 1);
      setStaedte((s) => s.filter((x) => x !== stadt));
    }

    setVersuche((v) => ({ ...v, [stadt]: stadtVersuche + 1 }));
    setLandVersuche((l) => ({ ...l, [land]: landVersucheCount + 1 }));
  };

  function getStadtLand(stadt) {
    return {
      Stuttgart: "Baden-Württemberg",
      München: "Bayern",
      Berlin: "Berlin",
      Potsdam: "Brandenburg",
      Bremen: "Bremen",
      Hamburg: "Hamburg",
      Wiesbaden: "Hessen",
      Schwerin: "Mecklenburg-Vorpommern",
      Hannover: "Niedersachsen",
      Düsseldorf: "Nordrhein-Westfalen",
      Mainz: "Rheinland-Pfalz",
      Saarbrücken: "Saarland",
      Dresden: "Sachsen",
      Magdeburg: "Sachsen-Anhalt",
      Kiel: "Schleswig-Holstein",
      Erfurt: "Thüringen",
    }[stadt];
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    const endTime = new Date();
    const timeDiff = Math.floor((endTime - startTime) / 1000);
    let y = 10;
    const userText = [userInfo.name, userInfo.datum, userInfo.zusatz]
      .filter(Boolean)
      .join("   ");
    if (userText) { doc.text(userText, 10, y); y += 10; }
    doc.text(`Punkte: ${punkte}`, 10, (y += 10));
    doc.text(`Gesamtzeit: ${timeDiff} Sekunden`, 10, (y += 10));
    Object.keys(versuche).forEach((stadt, i) => {
      doc.text(`${stadt} - Versuche: ${versuche[stadt]}`, 10, 60 + i * 10);
    });
    doc.save("Ergebnis.pdf");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hauptstädte zu den Bundesländern ziehen</h1>
      <p className={styles.description}>
        Du kannst eine Stadt maximal 10 Mal in ein Land ziehen und in jedem Land nur maximal 10 Mal eine Stadt ziehen.
        Bei Überschreitung wird das Spiel neu gestartet. Sobald du die erste Stadt ziehst, beginnt die Spielzeit und endet, sobald alle Städte zugeordnet sind.
      </p>

      <div className={styles.controls}>
        <input
          className={styles.userInput}
          placeholder="Name, Datum, Zusatz"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
        <div className={styles.points}>Punkte: {punkte}</div>
        <button onClick={downloadPDF} className={styles.downloadButton}>
          Ergebnis downloaden
        </button>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className={styles.gameGrid}>
          <div className={styles.bundeslaenderGrid}>
            {bundeslaender.map((b) => (
              <DroppableItem
                key={b}
                id={b}
                isOver={activeOver === b}
                className={styles[areaClasses[b]]}
              >
                <div className={styles.bundeslandButton}>{b}</div>
              </DroppableItem>
            ))}
          </div>

          <div className={styles.staedteGrid}>
            {staedte.map((s) => (
              <DraggableItem key={s} id={s}>
                <div className={styles.stadtButton}>{s}</div>
              </DraggableItem>
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
