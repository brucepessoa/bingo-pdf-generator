import { useState } from "react";

export default function Home() {
  const [numCards, setNumCards] = useState(1);
  const [prizes, setPrizes] = useState([""]);

  const handlePrizeChange = (i: number, value: string) => {
    const newPrizes = [...prizes];
    newPrizes[i] = value;
    setPrizes(newPrizes);
  };

  const handleNumCardsChange = (val: number) => {
    setNumCards(val);
    setPrizes(Array(val).fill(""));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = {
      establishmentName: form.get("establishmentName"),
      eventLocation: form.get("eventLocation"),
      bingoDay: form.get("bingoDay"),
      bingoTime: form.get("bingoTime"),
      numCards,
      prizes,
      numPages: form.get("numPages"),
    };

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert("Erro ao gerar PDF");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bingo.pdf";
    a.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerador de Bingo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Estabelecimento:</label>
          <input name="establishmentName" required />
        </div>
        <div>
          <label>Dia:</label>
          <input type="date" name="bingoDay" required />
        </div>
        <div>
          <label>Hora:</label>
          <input type="time" name="bingoTime" required />
        </div>
        <div>
          <label>Local:</label>
          <input name="eventLocation" required />
        </div>
        <div>
          <label>Cartelas por folha:</label>
          {[1, 2, 3, 4].map((n) => (
            <label key={n}>
              <input
                type="radio"
                name="numCards"
                value={n}
                checked={numCards === n}
                onChange={() => handleNumCardsChange(n)}
              />
              {n}
            </label>
          ))}
        </div>
        <div>
          {Array.from({ length: numCards }).map((_, i) => (
            <div key={i}>
              <label>Prêmio {i + 1}:</label>
              <input
                value={prizes[i] || ""}
                onChange={(e) => handlePrizeChange(i, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <label>Número de páginas:</label>
          <input type="number" name="numPages" min="1" defaultValue="1" required />
        </div>
        <button type="submit">Gerar PDF</button>
      </form>
    </div>
  );
}
