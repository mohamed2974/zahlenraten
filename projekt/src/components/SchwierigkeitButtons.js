
export default function SchwierigkeitButtons({ schwierigkeiten = [], setSchwierigkeit, gewählte_schwierigkeit}) {
    // erstellt die Buttons für die verschiedenen Schwierigkeitsgrade
    return (
        <div className="flex gap-5 mb-2">
            {schwierigkeiten.map((schwierigkeit, index) => (
                <button key={index} className={`py-2 px-5 rounded-full ${schwierigkeit.grad == gewählte_schwierigkeit ? `${schwierigkeit.farbe} text-white`: `bg-white ${schwierigkeit.textfarbe} border ${schwierigkeit.borderfarbe}`}`} onClick={() => setSchwierigkeit(schwierigkeit.grad)}>
                    {schwierigkeit.grad}
                </button>
            ))}
        </div>
    )
}