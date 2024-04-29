const sql = require("mssql");

const config = {
  user: "sa",
  password: "1",
  server: "WKGNBG5MRM\\SQLEXPRESS",
  database: "CodeHunters",
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

async function getUrunler() {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM Urunler");
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
  } finally {
    await sql.close();
  }
}

async function getAtletler() {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM Atletler");
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
  } finally {
    await sql.close();
  }
}

async function getKategoriler() {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM Kategoriler");
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
  } finally {
    await sql.close();
  }
}

async function getMusteriler() {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM Musteriler");
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
  } finally {
    await sql.close();
  }
}
async function setMusteriler(musteri) {
  const musteriler = await getMusteriler();
  const {
    MusteriAd,
    MusteriSoyad,
    MusteriEposta,
    MusteriSifre,
    MusteriAdres,
    MusteriTelefon,
  } = musteri;

  sql.connect(config, function (err) {
    if (err) console.log(err);

    const request = new sql.Request();
    request.query(
      `insert into Musteriler(MusteriID,MusteriAd,MusteriSoyad,MusteriEposta,MusteriSifre,MusteriAdres,MusteriTelefon) values (${
        musteriler.length + 1
      },'${MusteriAd}','${MusteriSoyad}','${MusteriEposta}','${MusteriSifre}','${MusteriAdres}','${MusteriTelefon}')`,
      (err, result) => {
        if (err) console.log(err);
        sql.close();
      }
    );
  });
}

async function getSiparisler() {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM Siparisler");
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
  } finally {
    await sql.close();
  }
}

async function setSiparisler(siparis) {
  const siparisler = await getSiparisler();
  const { MusteriID, ToplamTutar } = siparis;

  sql.connect(config, function (err) {
    if (err) console.log(err);

    const request = new sql.Request();
    request.query(
      `insert into Siparisler(SiparisID,MusteriID,ToplamTutar,SiparisDurumu,KargoBilgileri) values ('${
        siparisler.length + 1
      }','${MusteriID}','${ToplamTutar}','Onay','Onay')`,
      (err, result) => {
        if (err) console.log(err);
        sql.close();
      }
    );
  });
}

async function getYorumlar() {
  try {
    await sql.connect(config);
    const result = await sql.query("SELECT * FROM Yorumlar");
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
  } finally {
    await sql.close();
  }
}

async function setYorumlar(yorum) {
  const yorumlar = await getYorumlar();
  const { UrunID, MusteriID, YorumMetni, DegerlendirmePuani } = yorum;

  sql.connect(config, function (err) {
    if (err) console.log(err);

    const request = new sql.Request();
    request.query(
      `insert into Yorumlar(YorumID,UrunID,MusteriID,YorumMetni,DegerlendirmePuani) values (${
        yorumlar.length + 1
      },'${UrunID}',${MusteriID},'${YorumMetni}',${DegerlendirmePuani})`,
      (err, result) => {
        if (err) console.log(err);
        sql.close();
      }
    );
  });
}

module.exports = {
  getAtletler,
  getKategoriler,
  getMusteriler,
  setMusteriler,
  getSiparisler,
  setSiparisler,
  getUrunler,
  getYorumlar,
  setYorumlar,
};
