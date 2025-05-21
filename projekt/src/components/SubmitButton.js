import { checkNumber } from "@/functions/zahlen_check";

export default function SubmitButton({ nummer, randomNum, setNachricht, setVersuche, setZahlenVerlauf }) {
    // überprüft die eingegebene Zahl und gibt eine Nachricht zurück
    return (
        <div>
            <button className="py-3 px-5 rounded-r-full border text-4xl" onClick={() => checkNumber(nummer, randomNum, setNachricht, setVersuche, setZahlenVerlauf)}>Prüfen</button>
        </div>
    )
}