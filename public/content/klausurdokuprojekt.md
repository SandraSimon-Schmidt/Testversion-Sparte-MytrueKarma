
# 🧾 Klausur-Dokumentations-Projekt

Ein Projekt zur **Erstellung und Dokumentation von Klausuren bzw. Klassenarbeiten.**

Dieses Projekt dient zur **Erstellung und Dokumentation von Klausuren bzw. Klassenarbeiten.**Es besteht aus **drei Dateien**, die mit **JavaScript** und dem Node-Package **`readline-sync`** geschrieben sind.

---

## 🧠 Datei 1: `Erstellung.js`

Diese Datei führt die Lehrkraft durch den Prozess der Erstellung einer **Multiple-Choice-Klausur**.

Nach der Eingabe der Aufgaben kann gewählt werden, ob eine Frage **bearbeitet**, **entfernt** oder **gespeichert** werden soll.

### Beispiel: Eingabe und Auswahlmöglichkeiten
![Frage "bearbeiten, entfernen, weiter"](content/Bildschirmfoto%20vom%202025-05-17%2018-55-33.png)

---

### Bearbeiten einer Aufgabe
Hier kann eine Frage **aktualisiert oder korrigiert** werden.
![Aktualisierung – bearbeiten bei der Erstellung](content/Bildschirmfoto%20vom%202025-05-17%2019-10-37.png)

---

### Entfernen einer Aufgabe
Wenn eine Aufgabe nicht mehr benötigt wird, kann sie **gelöscht** werden.
![Entfernung – entfernen bei der Erstellung](content/Bildschirmfoto%20vom%202025-05-17%2018-56-12.png)

---

### Speichern der fertigen Klausur
Nach der Erstellung werden alle Fragen in einer **JSON-Datei** gespeichert.
![Speicherung – weiter bei der Erstellung](content/Bildschirmfoto%20vom%202025-05-17%2019-07-35.png)

---

## 🎓 Datei 2: `Klausur.js`

Diese Datei lässt die **Schüler die erstellte Klausur bearbeiten**.  
Die Ergebnisse werden anschließend **in einer JSON-Datei gespeichert**.

![Klausur – Schülereingabe](content/Bildschirmfoto%20vom%202025-05-17%2019-36-59.png)

---

## 📊 Datei 3: `Ergebnis.js`

Diese Datei liest die gespeicherten JSON-Dateien ein und zeigt:

- die **Ergebnisse einzelner Schüler**  
- sowie **Statistiken** über die gesamte Klausur (z. B. Durchschnittsnote).

![Ergebnisse und Statistik](content/Bildschirmfoto%20vom%202025-05-17%2019-38-43.png)

---

## 🕒 Zeitaufwand

| Phase                              | Stunden |
| ---------------------------------- | -------- |
| Planung als Backend-Projekt        | 6 Std.   |
| Recherchieren & Code schreiben     | 45 Std.  |
| Verfeinern & Üben des Vortrags     | 9 Std.   |

---

📘 **Hinweis:**  
Dieses Projekt läuft vollständig lokal über die Konsole und speichert die Daten im JSON-Format.  
Es dient als Demonstration für **datengestützte Auswertung und Dokumentation von Klassenarbeiten**.
