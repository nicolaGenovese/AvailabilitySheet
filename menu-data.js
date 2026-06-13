// ─── MENU DATA ───────────────────────────────────────────────────────────────
// Modifica questo file per aggiornare i piatti.
// Ogni sezione ha:
//   category : nome della categoria (stringa)
//   tag       : null | "weekends only" | "sunday"  → controlla visibilità
//   hideOnSunday : true  → nasconde la sezione quando è domenica
//   items     : array di stringhe con i nomi dei piatti
// ─────────────────────────────────────────────────────────────────────────────

const MENU = [
  {
    category: "While You Wait",
    tag: null,
    hideOnSunday: true,
    items: [
      "Nocellara Olives",
      "Toasted Focaccia"
    ]
  },
  {
    category: "Starters",
    tag: null,
    hideOnSunday: true,
    items: [
      "Spinach & Watercress Soup",
      "Isle of Wight Tomato Salad",
      "Fried Cornish Whitebait",
      "Garlic & Chilli Butter King Prawns",
      "Chicken Wings",
      "Chicken Liver Pate",
      "Cumberland Sausage Roll",
      "The Bull Traditional Scotch Egg",
      "Pea & Wild Garlic Hummus"
    ]
  },
  {
    category: "Sharers",
    tag: null,
    hideOnSunday: true,
    items: [
      "Loaded Fries",
      "1kg Chicken Wing Board",
      "The Bull Butchers Board"
    ]
  },
  {
    category: "Classics",
    tag: null,
    hideOnSunday: true,
    items: [
      "Country Burger & Fries",
      "Signature Burger & Fries",
      "Plant Country Burger & Fries",
      "Traditional British Fish & Chips",
      "Cumberland Sausage & Mash",
      "28 Day Dry Aged British 8oz Sirloin Steak",
      "Taragon & King Prawn Fish Pie",
      "Classic Shepherds Pie",
      "Honey Roast Ham, Eggs & Chips",
      "Hertfordshire Grilled Chicken Caesar Salad",
      "Crispy Chicken Schnitzel",
      "Crispy Cauliflower Salad"
    ]
  },
  {
    category: "Sides",
    tag: null,
    hideOnSunday: true,
    items: [
      "Fries",
      "Triple Cooked Chips",
      "Garlic & Parsley Buttered Jersey Royals",
      "Cider Battered Onion Rings",
      "Charred Tenderstem Broccoli, Toasted Almonds",
      "Isle of White Tomato and Onion Salad",
      "Grilled Courgette, Mint, Citronette Dressing"
    ]
  },
  {
    category: "Puddings",
    tag: null,
    hideOnSunday: true,
    items: [
      "Mint Macerated Strawberries",
      "Toasted Hazelnut Banana Split",
      "Chocolate Brownie",
      "Sticky Toffee Pudding",
      "Selection of Ice Cream",
      "Affogato"
    ]
  },
  {
    category: "While You Wait",
    tag: "sunday",
    items: [
      "Nocellara Olives",
      "Toasted Focaccia"
    ]
  },
  {
    category: "Starters",
    tag: "sunday",
    items: [
      "Spinach & Watercress Soup",
      "Pea & Wild Garlic Hummus",
      "Isle of Wight Tomato Salad",
      "Fried Cornish Whitebait",
      "Garlic & Chilli Butter King Prawns",
      "Chicken Wings",
      "Chicken Liver Pate",
      "Cumberland Sausage Roll",
      "The Bull Traditional Scotch Egg"
    ]
  },
  {
    category: "The Bull Sunday Roast",
    tag: "sunday",
    items: [
      "28 Day Dry Aged Rump of Beef",
      "Dingley Dell Pork Belly",
      "Roast Trio Board to Share for Two/Three",
      "Walnut Nut Roast",
      "Roast Sutton Hoo Chicken"
    ]
  },
  {
    category: "Classics",
    tag: "sunday",
    items: [
      "Country Burger & Fries",
      "Plant Country Burger",
      "Traditional British Fish & Chips",
      "Hertfordshire Grilled Chicken Caesar Salad",
      "Cumberland Sausage & Mash",
      "Crispy Cauliflower Salad"
    ]
  },
  {
    category: "Sides",
    tag: "sunday",
    items: [
      "Cauliflower Cheese",
      "Garlic & Rosemary Roast Potatoes",
      "Garlic & Parsley Buttered Jersey Royals",
      "Fries",
      "Hand Cut Triple Cooked Chips",
      "Cider Battered Onion Rings",
      "Isle of White Tomato and Onion Salad",
      "Charred Tenderstem Broccoli, Toasted Almonds"
    ]
  },
  {
    category: "Puddings",
    tag: "sunday",
    items: [
      "Mint Macerated Strawberries",
      "Toasted Hazelnut Banana Split",
      "Chocolate Brownie",
      "Sticky Toffee Pudding",
      "Selection of Ice Cream",
      "Affogato"
    ]
  }
];
