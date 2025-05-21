'use client'

import { useState } from "react";

export default function Eingabefeld({ setNummer, randomNum }) {
    const [value, setValue] = useState('');

    randomNum = randomNum.toString();

    // erlaubt nur Zahlen (0–9) im Eingabefeld und aktualisiert den Zustand der nummer
    const handleChange = (e) => {
        const newValue = e.target.value;

        // überprüft, dass die Länge der Eingabe kleiner oder gleich der Länge der Zufallszahl ist und dass die Eingabe nicht leer ist
        if (/^\d*$/.test(newValue) &&(newValue.length <= randomNum.length)) {
            setValue(newValue);
            setNummer(newValue);
        }
    };

    return (
        <div>
            <input className="outline-none border border-black py-3 px-5 rounded-l-full text-4xl" type="text" value={value} maxLength={randomNum.lenght} onChange={handleChange} />
        </div>
    )
}