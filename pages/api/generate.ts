import { NextApiRequest, NextApiResponse } from "next";
import { renderToStream } from "@react-pdf/renderer";
import { BingoPDF } from "../../components/BingoPDF";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { establishmentName, eventLocation, bingoDay, bingoTime, numCards, prizes, numPages } = req.body;

  if (!establishmentName || !eventLocation || !bingoDay || !bingoTime || !prizes || !numPages) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  const pdfStream = await renderToStream(
    <BingoPDF
      pages={parseInt(numPages, 10)}
      headerInfo={{ establishmentName, eventLocation, bingoDay, bingoTime, prizes: prizes.slice(0, numCards) }}
    />
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=bingo.pdf");
  pdfStream.pipe(res);
}
