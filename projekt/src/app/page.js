'use client'

import Eingabefeld from "@/components/Eingabefeld";
import SchwierigkeitButtons from "@/components/SchwierigkeitButtons";
import SubmitButton from "@/components/SubmitButton";
import { random_num } from "@/functions/random_num";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [schwierigkeit, setSchwierigkeit] = useState('easy');
  const [nummer, setNummer] = useState();
  const [randomNum, setRandomNum] = useState('gewählt');
  const [versuche, setVersuche] = useState(0);
  const [nachricht, setNachricht] = useState('Gib deine Zahl ein!');
  const [start , setStart] = useState(false);
  // zahlen_verlauf ist ein Array, das die eingegebenen Zahlen speichert
  const [zahlenverlauf, setZahlenVerlauf] = useState([]);

  // ein Array mit den verschiedenen Schwierigkeitsgraden
  const schwierigkeiten = [
    {grad: "easy", beschreibung: "1-99", farbe: "bg-green-500", textfarbe: "text-green-500", borderfarbe: "border-green-500"},
    {grad: "medium", beschreibung: "1-999", farbe: "bg-orange-500", textfarbe: "text-orange-500", borderfarbe: "border-orange-500"},
    {grad: "hard", beschreibung: "1-9999", farbe: "bg-red-500", textfarbe: "text-red-500", borderfarbe: "border-red-500"},
    {grad: "impossible", beschreibung: "1-9999999", farbe: "bg-purple-500", textfarbe: "text-purple-500", borderfarbe: "border-purple-500"},	
  ]

  // um hydration errors zu vermeiden, wird die Zufallszahl erst nach dem ersten Rendern gesetzt
  useEffect(() => {
    setRandomNum(random_num(schwierigkeit));
  } , [schwierigkeit]);

  return (
    <div className="min-h-screen bg-violet-50">
      {/* header */}
      <nav className="shadow-sm px-8 py-4 mb-12 flex items-end gap-2">
        <h1 className="text-4xl  text-violet-500">Zahlenraten</h1>
        <a href="https://mein-portfolio-jade.vercel.app/" target="_blank" className="text-sm underline text-orange-400 font-bold">Mohamed Emran</a>
      </nav>

      {/* spiel hat noch nicht gestartet => anweisungen */}
      {!start && (
        <div className="px-24 max-w-3xl mx-auto pb-10">
          <h1 className="text-3xl font-bold mb-4 text-center">🎯 Errate die Zahl!</h1>
          <p className="mb-4 text-lg">
            Stell dich der Herausforderung und finde die geheimnisvolle Zahl!
          </p>
          <p className="mb-4">
            In diesem einfachen, aber süchtig machenden Spiel musst du eine zufällig gewählte ganze Zahl erraten. 
            Die Schwierigkeit liegt ganz bei dir – wähle zwischen vier Stufen:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><span className="text-green-500 font-bold">Easy:</span> 1 bis 99</li>
            <li><span className="text-orange-500 font-bold">Medium:</span> 1 bis 999</li>
            <li><span className="text-red-500 font-bold">Hard:</span> 1 bis 9.999</li>
            <li><span className="text-violet-500 font-bold">Impossible:</span> 1 bis 9.999.999 😱</li>
          </ul>
          <p className="mb-4">
            🔢 Gib deine Tipps ein und erhalte direkt Feedback:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><span className="text-red-500 font-bold">&quot;Zu hoch&quot;</span> – du bist über dem Ziel.</li>
            <li><span className="text-blue-500 font-bold">&quot;Zu niedrig&quot;</span> – versuch’s mit einer größeren Zahl.</li>
            <li><span className="text-yellow-500 font-bold">&quot;Nah dran&quot;</span> – du bist ganz knapp daneben!</li>
          </ul>
          <p className="text-lg font-medium text-center mb-4">
            Wie viele Versuche brauchst du, um die richtige Zahl zu finden? <br />
            Teste dein Glück und dein Gefühl für Zahlen – das Spiel beginnt jetzt!
          </p>

          <div className="flex flex-col items-center mb-4">
            <button className="py-3 px-5 mt-5 rounded-full bg-violet-500 text-white" onClick={() => setStart(true)}>
              Spiel starten
            </button>
          </div>
        </div>
      )}

      {/* Spiel hat gestartet */}
      {(start && nachricht != "Richtig!") && (
        <section className="flex flex-col items-center justify-center">
          <div className="mb-8">
            {randomNum == 'gewählt'  ? 
              <h2 className="text-6xl">Eine Zufallszahl wird gewählt...</h2> :
              <h2 className="text-6xl">Los geht`s!</h2>
            }
          </div>

          {/* Schwierigkeit auswahl */}
          <div className="mb-8 text-center">
            <SchwierigkeitButtons schwierigkeiten={schwierigkeiten} setSchwierigkeit={setSchwierigkeit} gewählte_schwierigkeit={schwierigkeit}/>
            {schwierigkeiten.find(s => s.grad == schwierigkeit).beschreibung}
          </div>

          {/* Eingabefeld und Button */}
          <div className="flex gap-2 mb-5">
            <Eingabefeld setNummer={setNummer} randomNum={randomNum}/>
            <SubmitButton nummer={nummer} randomNum={randomNum} setNachricht={setNachricht} setVersuche={setVersuche} setZahlenVerlauf={setZahlenVerlauf}/>
          </div>

          {/* Versuche und Nachricht */}
          <div className="flex gap-12 text-2xl mb-6">
            <span>Versuche: {versuche}</span>
            <span className={`
              ${nachricht.includes('hoch!') ? 'text-red-500' : 
              nachricht.includes('niedrig!') ? 'text-blue-500' : 
              nachricht.includes('nah') ? 'text-yellow-500' : 
              nachricht.includes('erraten') ? 'text-violet-500' : ''}`
            }>
                {nachricht}
            </span>
          </div>

          {/* Verlauf */}
          <Verlauf zahlenverlauf={zahlenverlauf} text={"Diese Zahlen hast du schon probiert:"}/>
        </section>
      )}

      {/* ergebnis ist richtig */}
      {nachricht == "Richtig!" && (
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-fit mx-auto">
          <h1 className="text-6xl mb-3 text-violet-500">Herzlichen Glückwunsch!</h1>
          <h2 className="text-2xl mb-8">Du hast die Zahl erraten!</h2>

          <div className="flex flex-row mb-5 text-2xl divide-x">
            <div className="flex-1 px-4">
              <h2>Versuche:</h2>
              <span>{versuche}</span>
            </div>
            <div className="flex-1 px-4">
              <h2>Schwierigkeit:</h2>
              <span className={schwierigkeiten.find(s => s.grad == schwierigkeit).textfarbe}>{schwierigkeit}</span>
            </div>
            <div className="flex-1 px-4">
              <h2>Die Zahl war:</h2>
              <span>{randomNum}</span>
            </div>
          </div>

          {/* Verlauf */}
          <Verlauf zahlenverlauf={zahlenverlauf} text={"Deine Versuche:"}/>

          <button className="py-3 px-5 mt-5 rounded-full bg-violet-500 text-white" onClick={() => {
            window.location.reload(),
            setStart(true)
          }}>
            Neues Spiel
          </button>
        </div>
      )}
    </div>
  );
}

function Verlauf({zahlenverlauf, text}){
  return (
  (zahlenverlauf.length > 0) &&
    <div className="text-xl border p-4 rounded-lg bg-white text-center">
      <h2 className="mb-2">{text}</h2>
      <div>
        {zahlenverlauf.map((zahl, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <span className="px-3">{zahl.versuche}-</span>
            <span className="px-3">{zahl?.nummer}</span>
            <span className={`
              ${zahl.nachricht?.includes('HOCH!') ? 'text-red-500' : 
              zahl.nachricht?.includes('NIEDRIG!') ? 'text-blue-500' : 
              zahl.nachricht?.includes('nah') ? 'text-yellow-500' : 
              zahl.nachricht?.includes('erraten') ? 'text-violet-500' : ''} 
              px-3 text-nowrap`
            }>
                {zahl?.nachricht}
            </span>
          </div>
        )).reverse()}
      </div>
    </div>
  )
}