import express from "express";
import cors from "cors";
import db from "./base_de_donnee/db.js";
import mongoose from "mongoose";
import Produit from "./model_DB/produit.js";

const app = express();
app.use(express.json());
app.use(cors());
db()
  .then(() => {
    console.log("connect Base de Donnee");
  })
  .catch((err) => {
    console.error(err);
  });

app.post("/api/Products", async (req, res) => {
  const data = req.body;

  if (!data.nom || !data.description || !data.quantite || !data.prix) {
    return res.status(403).json({
      message: "on a pas tout les informations",
    });
  }

  const pr = new Produit(data);
  pr.save()
    .then((doc) => {
      return res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(400).json({
        message: "il existe cette produit",
      });
    });
});
app.get("/api/produits", async (req, res) => {
  const data = await Produit.find();
  res.status(200).json(data);
});
app.get("/api/produits/:id", async (req, res) => {
  const data = await Produit.findOne({
    _id: req.params.id,
  });
  res.status(200).json(data);
});
app.delete("/api/produits/:id", async (req, res) => {
  const data = await Produit.findByIdAndDelete(req.params.id);
  res.status(201).json({
    message: "Success delete produit",
  });
});
app.put("/api/produits/:id", async (req, res) => {
  try {
    const data = req.body;

    const update = {};

    if (data.nom) {
      update.nom = data.nom;
    }
    if (data.description) {
      update.description = data.description;
    }
    if (data.quantite) {
      update.quantite = data.quantite;
    }
    if (data.prix) {
      update.prix = data.prix;
    }

    const data1 = await Produit.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    res.status(201).json({
      message: "Success update produit",
      data: data1,
    });
  } catch (e) {
    res.status(401).json({
      message: "il existe ce produit",
    });
  }
});
app.listen("3005", () => {
  console.log("ON Server Port=3005");
});
