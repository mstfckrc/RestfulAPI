const express = require("express");
const app = express();
const { getAtletler,
  getKategoriler,
  getMusteriler,
  getSiparisler,
  getUrunler,
  getYorumlar,
  setMusteriler,
  setSiparisler,
  setYorumlar } = require("./controller");
const send = require("send");

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Main Page");
});

app.get("/urunler", async (req, res) => {
  const urunler = await getUrunler();
  res.send(urunler);
});

app.get("/urunler/:id", async (req, res) => {
  const urunler = await getUrunler();
  const { id } = req.params;
  const urun = await urunler.filter((urun) => urun.UrunID == id);
  res.send(urun);;
});

app.get("/atletler", async (req, res) => {
  const atletler = await getAtletler();
  res.send(atletler);
});

app.get("/kategoriler", async (req, res) => {
  const kategoriler = await getKategoriler();
  res.send(kategoriler);
});

app.get("/musteriler", async (req, res) => {
  const musteriler = await getMusteriler();
  res.send(musteriler);
});

app.post("/musteriler", async (req, res) => {
  const request = req.body;
  await setMusteriler(request);
  const musteriler = await getMusteriler();
  res.send(musteriler)
})


app.get("/siparisler", async (req, res) => {
  const siparisler = await getSiparisler();
  res.send(siparisler);
});

app.get("/siparisler/:id", async (req, res) => {
  const { id } = req.params;
  const siparisler = await getSiparisler();

  const siparis = siparisler.filter((siparis) => siparis.siparisID == id);
  res.send(siparis);
});

app.post("/siparisler", async (req, res) => {
  const request = req.body;
  await setSiparisler(request);
  const siparisler = await getSiparisler();
  res.send(siparisler);
})

app.get("/yorumlar", async (req, res) => {
  const yorumlar = await getYorumlar();
  res.send(yorumlar);
})

app.get("/yorumlar/:id", async (req, res) => {
  const { id } = req.params;
  const yorumlar = await getYorumlar();

  const yorum = yorumlar.filter((yorum) => yorum.UrunID == id);
  res.send(yorum);
});

app.post("/yorumlar", async (req, res) => {
  const request = req.body;
  await setYorumlar(request);
  const yorumlar = await getYorumlar();
  res.send(yorumlar);
})


app.listen("3000", () => {
  console.log("App is running on port 3000");
});
