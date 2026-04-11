// ─── MENU DATA ───────────────────────────────────────────────────────────────
// Modifica questo file per aggiornare i piatti.
// Ogni sezione ha:
//   category : nome della categoria (stringa)
//   tag       : null | "weekends only" | "sunday"  → controlla visibilità
//   items     : array di stringhe con i nomi dei piatti
// ─────────────────────────────────────────────────────────────────────────────

const MENU = [
  {
    category: "Small Plates",
    tag: null,
    items: [
      "Onion Bhajis",
      "Curried Lamb Leg Kebabs",
      "Loaded Tater Tots",
      "Cheeseburger Tacos",
      "Halloumi with Jerk Gravy",
      "Bang Bang Cauliflower",
      "Lamb Shoulder Sliders",
      "Beef Burger Sliders",
      "Cheesy Truffle Fries"
    ]
  },
  {
    category: "Mains",
    tag: null,
    items: [
      "Cyder Battered Haddock & Triple Cooked Chips",
      "Hertfordshire Chicken Caesar Salad",
      "Loaded Nachos",
      "Jacket Potato",
      "Hot Dog"
    ]
  },
  {
    category: "Pizza Slices",
    tag: "weekends only",
    items: [
      "Pepperoni Slice",
      "Margherita Slice",
      "Veggie Slice"
    ]
  },
  {
    category: "Wings",
    tag: null,
    items: [
      "Lemon & Herb",
      "Honey Glaze",
      "Gochujang Barbecue",
      "Mango & Scotch Bonnet"
    ]
  },
  {
    category: "Desserts",
    tag: null,
    items: [
      "Eton Mess",
      "Lemon Posset",
      "Chocolate Cake",
      "Affogato"
    ]
  },
  {
    category: "Buns",
    tag: null,
    items: [
      "Short Rib & Brisket British Beef Burger",
      "Plant Burger",
      "Chicken Breast Burger",
      "Hot Chicken Breast Burger",
      "Smashed Beef Burger",
      "Hot Smashed Beef Burger",
      "Onion Bhaji Burger"
    ]
  },
  {
    category: "Sunday Roast",
    tag: "sunday",
    items: [
      "Chicken Roast",
      "Beef Roast",
      "Pork Belly",
      "Vegan Wellington",
      "The Ultimate Roast"
    ]
  },
  {
    category: "Sunday Sides",
    tag: "sunday",
    items: [
      "Cauliflower Cheese",
      "Sunday Yorkshire Pudding, Gravy",
      "Garlic and Rosemary Potatoes",
      "Creamed Leeks",
      "Braised Red Cabbage, Sausage Bacon Stuffing"
    ]
  }
];
