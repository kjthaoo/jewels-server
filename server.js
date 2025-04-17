const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const multer = require("multer");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let houses = [
  { name: "Farmhouse" },
  { name: "Cool House" },
  { name: "Beach House" },
];

let items = [
  {
    id: "gold-bracelet",
    name: "Gold Bracelet",
    description: "Shiny gold bracelet",
    price: 49.99,
    material: "gold",
    category: "bracelet",
    image: "images/bracelet1.jpg",
  },
  {
    id: "3D-jewelry",
    name: "3D Jewelry",
    description: "Printed ring with style",
    price: 105.99,
    material: "recycled-material",
    category: "ring",
    image: "images/3d1.jpg",
  },
  {
    id: "gold-starlight",
    name: "Gold Starlight",
    description: "Elegant ring",
    price: 59.99,
    material: "gold",
    category: "ring",
    image: "images/ring2.jpg",
  },
  {
    id: "powder-moon",
    name: "Powder Moon",
    description: "Vintage vibes",
    price: 79.99,
    material: "gold",
    category: "ring",
    image: "images/secondchance.jpg",
  },
  {
    id: "recycled-metal-jasmine",
    name: "Recycled Metal Jasmine",
    description: "Upcycled metal ring",
    price: 69.99,
    material: "recycled-metals",
    category: "ring",
    image: "images/recycled1.jpg",
  },
  {
    id: "silver-feathered",
    name: "Silver Feathered",
    description: "Feathery silver earrings",
    price: 89.99,
    material: "silver",
    category: "earrings",
    image: "images/ring3.jpg",
  },
  {
    id: "gold-twist",
    name: "Gold Twist",
    description: "Modern gold necklace",
    price: 54.99,
    material: "gold",
    category: "necklace",
    image: "images/bracelet2.jpg",
  },
  {
    id: "iridescent-bloom",
    name: "Iridescent Bloom",
    description: "Resin glow earrings",
    price: 40.99,
    material: "resin",
    category: "earrings",
    image: "images/repurposedradiance.jpg",
  },
  {
    id: "terralace",
    name: "TerraLace",
    description: "Elegant lace design",
    price: 30.99,
    material: "recycled-material",
    category: "earrings",
    image: "images/ecoluxe.jpg",
  },
  {
    id: "ceramic-whisper",
    name: "Ceramic Whisper",
    description: "Smooth ceramic earrings",
    price: 20.99,
    material: "ceramic",
    category: "earrings",
    image: "images/ceramic.jpg",
  },
  {
    id: "timeless-green",
    name: "Timeless Green",
    description: "Clay vibes, timeless style",
    price: 60.00,
    material: "clay",
    category: "earrings",
    image: "images/clay.jpg",
  },
  {
    id: "starlit-shards",
    name: "Starlit Shards",
    description: "Broken-glass look earrings",
    price: 15.99,
    material: "glass",
    category: "earrings",
    image: "images/glassbead.jpg",
  },
  {
    id: "gossamer-garden",
    name: "Gossamer Garden",
    description: "Floral-inspired glass earrings",
    price: 45.99,
    material: "glass",
    category: "earrings",
    image: "images/glassgarden.jpg",
  },
  {
    id: "ethereal-links",
    name: "Ethereal Links",
    description: "Bold and modern bracelet",
    price: 66.00,
    material: "gold",
    category: "bracelet",
    image: "images/linkluxe.jpg",
  },
  {
    id: "moonlit-pearls",
    name: "Moonlit Pearls",
    description: "Classy pearl earrings",
    price: 120.00,
    material: "pearl",
    category: "earrings",
    image: "images/moonlitpearls.jpg",
  },
];

// GET - Fetch and optionally filter items
app.get("/api/items", (req, res) => {
  let filteredItems = [...items];

  const { material, category, price } = req.query;

  if (material && material !== "all") {
    filteredItems = filteredItems.filter(item => item.material === material);
  }

  if (category && category !== "all") {
    filteredItems = filteredItems.filter(item => item.category === category);
  }

  if (price === "low-to-high") {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (price === "high-to-low") {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  res.json(filteredItems);
});

// POST - Add a new item
app.post("/api/items", upload.single("image"), (req, res) => {
  const { name, description, price, material, category } = req.body;
  const image = req.file;

  if (!name || !price || !image) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // simulate saving to DB
  const newItem = {
    id: Date.now(),
    name,
    description,
    price,
    material,
    category,
    image: image.filename,
  };

  res.status(201).json(newItem);

  // Filter by category
  if (category && category !== "all") {
    filteredItems = filteredItems.filter(
      (item) => item.category === category
    );
  }

  // Sort by price
  if (price === "low-to-high") {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (price === "high-to-low") {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  res.json(filteredItems);
  console.log(req.body); // or form fields

});

app.get("/api/houses", upload.single("img"), (req, res) => {
  res.send(houses);
});

const validateHouse = (house) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    name: Joi.string().min(3).required(),
  });
  return schema.validate(house);
};

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

/*
app.delete("api/items/:id", (req, res) => {
  const item = items.find((item) => iteam._id === req.params.id));
};*/
