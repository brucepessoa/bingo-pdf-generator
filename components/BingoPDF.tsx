import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { generateBingoCardNumbers } from "../utils/bingo";

const styles = StyleSheet.create({
  page: { padding: 20, flexDirection: "column" },
  header: { marginBottom: 10 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 5 },
  info: { fontSize: 10, marginBottom: 2 },
  cardsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
  card: { border: "1pt solid black", margin: 5, padding: 5, width: 200 },
  table: { display: "table", width: "100%", borderStyle: "solid", borderWidth: 1 },
  row: { flexDirection: "row" },
  cell: { flex: 1, borderStyle: "solid", borderWidth: 1, textAlign: "center", padding: 5, fontSize: 12 },
  headerCell: { backgroundColor: "#eee", fontWeight: "bold" },
  free: { backgroundColor: "#ddd", fontSize: 12, textAlign: "center", padding: 5 },
  prize: { marginTop: 5, fontSize: 10, textAlign: "center" },
  footer: { position: "absolute", bottom: 10, left: 20, fontSize: 10 }
});

export const BingoPDF = ({ pages, headerInfo }: any) => (
  <Document>
    {Array.from({ length: pages }).map((_, pageIndex) => (
      <Page size="A4" style={styles.page} key={pageIndex}>
        <View style={styles.header}>
          <Text style={styles.title}>Show de Prêmios</Text>
          <Text style={styles.info}>Estabelecimento: {headerInfo.establishmentName}</Text>
          <Text style={styles.info}>Local: {headerInfo.eventLocation}</Text>
          <Text style={styles.info}>Data: {headerInfo.bingoDay}</Text>
          <Text style={styles.info}>Hora: {headerInfo.bingoTime}</Text>
        </View>

        <View style={styles.cardsContainer}>
          {headerInfo.prizes.map((prize: string, i: number) => {
            const masterNumbers = generateBingoCardNumbers();

            return (
              <View style={styles.card} key={i}>
                <View style={styles.table}>
                  <View style={styles.row}>
                    {["B", "I", "N", "G", "O"].map((h) => (
                      <Text style={[styles.cell, styles.headerCell]} key={h}>{h}</Text>
                    ))}
                  </View>
                  {[0, 1, 2, 3, 4].map((row) => (
                    <View style={styles.row} key={row}>
                      {["B", "I", "N", "G", "O"].map((col, colIndex) => {
                        if (col === "N" && row === 2) {
                          return <Text style={[styles.free, styles.cell]} key={colIndex}>Livre</Text>;
                        }
                        const val =
                          col === "B" ? masterNumbers.B[row] :
                          col === "I" ? masterNumbers.I[row] :
                          col === "N" ? masterNumbers.N[row < 2 ? row : row - 1] :
                          col === "G" ? masterNumbers.G[row] :
                          masterNumbers.O[row];
                        return <Text style={styles.cell} key={colIndex}>{val}</Text>;
                      })}
                    </View>
                  ))}
                </View>
                <Text style={styles.prize}>{i + 1}º Prêmio: {prize}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.footer}>Folha {pageIndex + 1}</Text>
      </Page>
    ))}
  </Document>
);
