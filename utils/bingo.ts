// Função para gerar números de bingo
export function generateBingoCardNumbers() {
  const numbers = { B: [], I: [], N: [], G: [], O: [] };

  while (numbers.B.length < 5) {
    const num = Math.floor(Math.random() * 15) + 1;
    if (!numbers.B.includes(num)) numbers.B.push(num);
  }
  while (numbers.I.length < 5) {
    const num = Math.floor(Math.random() * 15) + 16;
    if (!numbers.I.includes(num)) numbers.I.push(num);
  }
  while (numbers.N.length < 4) {
    const num = Math.floor(Math.random() * 15) + 31;
    if (!numbers.N.includes(num)) numbers.N.push(num);
  }
  while (numbers.G.length < 5) {
    const num = Math.floor(Math.random() * 15) + 46;
    if (!numbers.G.includes(num)) numbers.G.push(num);
  }
  while (numbers.O.length < 5) {
    const num = Math.floor(Math.random() * 15) + 61;
    if (!numbers.O.includes(num)) numbers.O.push(num);
  }

  return numbers;
}
