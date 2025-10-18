const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// API-Football bilgileri
const API_KEY = "48c6f3452f2ebd917eec28b789e34e4c";
const API_HOST = "v3.football.api-sports.io";

app.use(express.static(__dirname)); // index.html'i sunmak için

// O günün maçlarını çek
app.get("/matches", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await axios.get(`https://${API_HOST}/fixtures?date=${today}`, {
      headers: { "x-apisports-key": API_KEY }
    });

    const matches = response.data.response.map(f => ({
      home: f.teams.home.name,
      away: f.teams.away.name,
      league: f.league.name,
      date: f.fixture.date
    }));

    res.json(matches);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Maçları çekerken hata oluştu");
  }
});

// Basit banko tahmin modeli
app.get("/prediction", (req, res) => {
  // Bu örnek basit: hep ev sahibi kazanır + 2.5 üst + KG evet
  res.json({
    MS: "1",
    Toplam_2_5: "Üst",
    KG: "Evet"
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});