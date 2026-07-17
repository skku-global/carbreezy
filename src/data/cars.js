export const RAW_CARS = [
  { id: 1, name: "Ferrari 296 GTB", slug: "ferrari-296-gtb", brand: "Ferrari", type: "Coupe", condition: "new", price: 515000000, year: 2026, mileage: 15 },
  { id: 2, name: "Lamborghini Huracan", slug: "lamborghini-huracan", brand: "Lamborghini", type: "Coupe", condition: "used", price: 416000000, year: 2025, mileage: 3400 },
  { id: 3, name: "Porsche 911 Turbo S", slug: "porsche-911-turbo-s", brand: "Porsche", type: "Coupe", condition: "new", price: 368000000, year: 2026, mileage: 8 },
  { id: 4, name: "McLaren 720S", slug: "mclaren-720s", brand: "McLaren", type: "Coupe", condition: "used", price: 480000000, year: 2024, mileage: 5200 },
  { id: 5, name: "Bugatti Chiron", slug: "bugatti-chiron", brand: "Bugatti", type: "Hypercar", condition: "new", price: 4800000000, year: 2026, mileage: 4 },
  { id: 6, name: "Aston Martin DB12", slug: "aston-martin-db12", brand: "Aston Martin", type: "Coupe", condition: "used", price: 400000000, year: 2025, mileage: 2100 },
  { id: 7, name: "Rolls-Royce Ghost", slug: "rolls-royce-ghost", brand: "Rolls-Royce", type: "Sedan", condition: "new", price: 560000000, year: 2026, mileage: 12 },
  { id: 8, name: "Bentley Continental GT", slug: "bentley-continental-gt", brand: "Bentley", type: "Coupe", condition: "used", price: 352000000, year: 2024, mileage: 4600 },
  { id: 9, name: "Maserati MC20", slug: "maserati-mc20", brand: "Maserati", type: "Coupe", condition: "used", price: 368000000, year: 2025, mileage: 2800 },
  { id: 10, name: "Koenigsegg Jesko", slug: "koenigsegg-jesko", brand: "Koenigsegg", type: "Hypercar", condition: "new", price: 4800000000, year: 2026, mileage: 2 },
  { id: 11, name: "Pagani Huayra", slug: "pagani-huayra", brand: "Pagani", type: "Hypercar", condition: "used", price: 4480000000, year: 2024, mileage: 900 },
  { id: 12, name: "Lotus Emira", slug: "lotus-emira", brand: "Lotus", type: "Coupe", condition: "used", price: 168000000, year: 2025, mileage: 3900 },
]

// NOTE on filter taxonomy (TYPES, below): the brief's example categories are
// Hatchback / Sedan / SUV / Convertible, but this is a luxury-exotic dealership —
// none of the 12 cars are hatchbacks/SUVs, and forcing a Ferrari into "Hatchback"
// would misrepresent the inventory. Kept the dealership's own categories
// (Coupe / Sedan / Hypercar) as an intentional creative deviation — call this
// out in the ReadMe. Swap TYPES + each car's `type` below if the taxonomy needs
// to literally match the spec instead.

// Each car folder should contain 1.jpg through 5.jpg at public/images/cars/<slug>/
// Size: 1200x900 (4:3), JPG, under 150KB each
function imagesFor(slug) {
  return [1, 2, 3, 4, 5].map(n => `/images/cars/${slug}/${n}.jpg`)
}

const ENGINE_BY_SLUG = {
  "ferrari-296-gtb": ["3.0L twin-turbo V6 hybrid", "8-speed dual-clutch", "RWD"],
  "lamborghini-huracan": ["5.2L naturally aspirated V10", "7-speed dual-clutch", "AWD"],
  "porsche-911-turbo-s": ["3.7L twin-turbo flat-6", "8-speed dual-clutch", "AWD"],
  "mclaren-720s": ["4.0L twin-turbo V8", "7-speed dual-clutch", "RWD"],
  "bugatti-chiron": ["8.0L quad-turbo W16", "7-speed dual-clutch", "AWD"],
  "aston-martin-db12": ["4.0L twin-turbo V8", "8-speed automatic", "RWD"],
  "rolls-royce-ghost": ["6.75L twin-turbo V12", "8-speed automatic", "AWD"],
  "bentley-continental-gt": ["6.0L twin-turbo W12", "8-speed dual-clutch", "AWD"],
  "maserati-mc20": ["3.0L twin-turbo V6", "8-speed dual-clutch", "RWD"],
  "koenigsegg-jesko": ["5.0L twin-turbo V8", "9-speed multi-clutch", "RWD"],
  "pagani-huayra": ["6.0L twin-turbo V12", "7-speed sequential", "RWD"],
  "lotus-emira": ["3.5L supercharged V6", "6-speed manual", "RWD"],
}

// Performance figures feed the modal's Engine-tab gauge + hover spec strip.
// [ horsepower, torqueNm, zeroToSixty (sec), topSpeedKmh ]
const PERFORMANCE_BY_SLUG = {
  "ferrari-296-gtb": [819, 740, 2.9, 330],
  "lamborghini-huracan": [630, 600, 2.9, 325],
  "porsche-911-turbo-s": [640, 800, 2.7, 330],
  "mclaren-720s": [720, 770, 2.9, 341],
  "bugatti-chiron": [1500, 1600, 2.4, 420],
  "aston-martin-db12": [680, 800, 3.5, 325],
  "rolls-royce-ghost": [563, 850, 4.8, 250],
  "bentley-continental-gt": [650, 900, 3.6, 335],
  "maserati-mc20": [630, 730, 2.9, 325],
  "koenigsegg-jesko": [1600, 1500, 2.5, 480],
  "pagani-huayra": [730, 1000, 2.8, 383],
  "lotus-emira": [400, 430, 4.2, 290],
}

const FEATURES_BY_SLUG = {
  "ferrari-296-gtb": ["Launch control", "Carbon-ceramic brakes", "Adaptive suspension", "Hybrid boost mode", "Heated seats"],
  "lamborghini-huracan": ["Launch control", "Carbon-ceramic brakes", "Sport exhaust", "Adaptive suspension", "Reverse camera"],
  "porsche-911-turbo-s": ["Adaptive cruise", "Sport Chrono Package", "Carbon-ceramic brakes", "Heated + ventilated seats", "Lane keep assist"],
  "mclaren-720s": ["Launch control", "Variable drift control", "Carbon-ceramic brakes", "Folding driver display", "Reverse camera"],
  "bugatti-chiron": ["Launch control", "Adaptive suspension", "Carbon-ceramic brakes", "Bespoke luggage set", "Speed key top-speed mode"],
  "aston-martin-db12": ["Adaptive cruise", "Heated seats", "Bang & Olufsen audio", "360° camera", "Adaptive suspension"],
  "rolls-royce-ghost": ["Starlight headliner", "Massage seats", "Adaptive cruise", "Self-levelling suspension", "Bespoke umbrella storage"],
  "bentley-continental-gt": ["Massage seats", "Naim audio", "Adaptive cruise", "Heated + ventilated seats", "Rotating display"],
  "maserati-mc20": ["Launch control", "Carbon-ceramic brakes", "Butterfly doors", "Sport exhaust", "Reverse camera"],
  "koenigsegg-jesko": ["Launch control", "Autoskin doors", "Adaptive suspension", "Carbon-ceramic brakes", "Top-speed mode"],
  "pagani-huayra": ["Active aero flaps", "Carbon-titanium monocoque", "Bespoke leather cabin", "Launch control", "Reverse camera"],
  "lotus-emira": ["Manual gearbox", "Sport exhaust", "Alcantara trim", "Reverse camera", "Track mode"],
}

const COLORS_BY_SLUG = {
  "ferrari-296-gtb": [{ name: "Rosso Corsa", hex: "#B71C1C" }, { name: "Nero Daytona", hex: "#161616" }, { name: "Blu Corsa", hex: "#12305C" }],
  "lamborghini-huracan": [{ name: "Verde Mantis", hex: "#2E5D34" }, { name: "Nero Noctis", hex: "#141414" }, { name: "Arancio Borealis", hex: "#D9541F" }],
  "porsche-911-turbo-s": [{ name: "GT Silver", hex: "#8C9096" }, { name: "Jet Black", hex: "#151515" }, { name: "Guards Red", hex: "#A31E22" }],
  "mclaren-720s": [{ name: "Papaya Spark", hex: "#E8641B" }, { name: "Onyx Black", hex: "#161616" }, { name: "Silica White", hex: "#E7E7E2" }],
  "bugatti-chiron": [{ name: "French Racing Blue", hex: "#0B2E5C" }, { name: "Nocturne Black", hex: "#111111" }, { name: "Argent Silver", hex: "#9AA0A6" }],
  "aston-martin-db12": [{ name: "Sarthe Grey", hex: "#5B6672" }, { name: "Jet Black", hex: "#141414" }, { name: "Squadron Blue", hex: "#1C3E62" }],
  "rolls-royce-ghost": [{ name: "English White", hex: "#EDEDE8" }, { name: "Diamond Black", hex: "#121212" }, { name: "Salamanca Blue", hex: "#1C3350" }],
  "bentley-continental-gt": [{ name: "Beluga Black", hex: "#131313" }, { name: "Glacier White", hex: "#E9EBEA" }, { name: "Windsor Blue", hex: "#25405E" }],
  "maserati-mc20": [{ name: "Bianco Audace", hex: "#EDEDED" }, { name: "Blu Infinito", hex: "#16305A" }, { name: "Nero Enigma", hex: "#151515" }],
  "koenigsegg-jesko": [{ name: "Carbon Ghost", hex: "#1C1C1C" }, { name: "Sarpanitum Silver", hex: "#9A9EA3" }, { name: "Ragnarok Red", hex: "#9E1B22" }],
  "pagani-huayra": [{ name: "Grigio Nardo", hex: "#3C4045" }, { name: "Rosso Dubai", hex: "#A3211F" }, { name: "Oro Valentino", hex: "#B99553" }],
  "lotus-emira": [{ name: "Seneca Blue", hex: "#1F4C6B" }, { name: "Magma Red", hex: "#A3241E" }, { name: "Nimbus Grey", hex: "#6B7076" }],
}

const NOTES_BY_SLUG = {
  "ferrari-296-gtb": "The hybrid boost genuinely surprises people — it's a V6 that thinks it's a V12.",
  "lamborghini-huracan": "One of the last great naturally-aspirated V10s. That sound alone is worth the test drive.",
  "porsche-911-turbo-s": "Daily-driveable supercar. Most versatile thing on this lot, bar none.",
  "mclaren-720s": "The folding digital dash is a party trick every single time. Drives even better than it looks.",
  "bugatti-chiron": "We don't get many of these. Viewing by appointment only, but worth the wait.",
  "aston-martin-db12": "British grand tourer done right — this one turns heads at every stoplight.",
  "rolls-royce-ghost": "Quietest cabin we stock. Starlight headliner alone converts most skeptics.",
  "bentley-continental-gt": "The rotating display is real showroom theatre. Feels like a private jet cabin on wheels.",
  "maserati-mc20": "Butterfly doors and a proper Maserati engine note — this one sells itself at test drive.",
  "koenigsegg-jesko": "Track-focused hypercar, extremely limited. Serious buyers only — ask about the waitlist.",
  "pagani-huayra": "Hand-built, active aero, and interior craftsmanship you have to see in person to believe.",
  "lotus-emira": "The purist's choice on this lot — manual gearbox, light chassis, no driver aids getting in the way.",
}

function financingFor(price) {
  const downPayment = Math.round(price * 0.2)
  const loanAmount = price - downPayment
  const monthlyRate = 0.18 / 12
  const termMonths = 48
  const factor = Math.pow(1 + monthlyRate, termMonths)
  const estimatedMonthly = Math.round((loanAmount * monthlyRate * factor) / (factor - 1))
  return { downPayment, termMonths, estimatedMonthly }
}

function specsFor(c) {
  const [engine, transmission, drivetrain] = ENGINE_BY_SLUG[c.slug] || ["V8", "8-speed automatic", "RWD"]
  return {
    internal: [
      ["Seats", c.type === "Sedan" ? "4 adults" : "2 adults"],
      ["Upholstery", "Full leather with contrast stitching, carbon fiber trim"],
      ["Infotainment", c.year >= 2024 ? '12.3" touchscreen, wireless CarPlay' : '8.4" touchscreen, wired CarPlay'],
      ["Climate", "Dual-zone automatic AC"],
    ],
    external: [
      ["Body Color", ["Rosso Corsa Red", "Nero Black", "Blu Infinito", "Grigio Silverstone"][c.id % 4]],
      ["Wheels", '21" forged alloy'],
      ["Lighting", "Full LED matrix headlamps"],
      ["Condition", c.condition === "new" ? "Zero mileage, factory sealed" : "Inspected 150-point checklist, dealer certified"],
    ],
    engine: [
      ["Engine", engine],
      ["Transmission", transmission],
      ["Drivetrain", drivetrain],
      ["Fuel Economy", c.type === "Hypercar" ? "5.2 km/l combined" : "8.4 km/l combined"],
    ],
    dimensions: [
      ["Length", c.type === "Sedan" ? "5,546 mm" : "4,610 mm"],
      ["Width", "1,970 mm"],
      ["Height", c.type === "Sedan" ? "1,571 mm" : "1,196 mm"],
      ["Boot Space", c.type === "Sedan" ? "507 L" : "150 L"],
    ],
  }
}

export const CARS = RAW_CARS.map(c => {
  const [hp, torque, zeroToSixty, topSpeed] = PERFORMANCE_BY_SLUG[c.slug] || [400, 500, 4.5, 280]
  return {
    ...c,
    images: imagesFor(c.slug),
    img: imagesFor(c.slug)[0],
    specs: specsFor(c),
    performance: { hp, torque, zeroToSixty, topSpeed },
    financing: financingFor(c.price),
    availability: {
      stock: c.id % 5 === 0 ? 1 : (c.id % 3) + 1,
      branch: ["Ibadan Showroom", "Lagos VI Showroom", "Abuja Showroom"][c.id % 3],
      vin: `CB${c.year}${c.id.toString().padStart(4, "0")}NG`,
    },
    features: FEATURES_BY_SLUG[c.slug] || [],
    colors: COLORS_BY_SLUG[c.slug] || [],
    fuel: {
      type: "Petrol",
      tankSize: c.type === "Hypercar" ? "100 L" : "72 L",
      range: c.type === "Hypercar" ? "420 km" : "560 km",
    },
    rating: {
      stars: Math.round((4.5 + ((c.id % 5) * 0.1)) * 10) / 10,
      reviews: 12 + c.id * 7,
    },
    sellerNote: NOTES_BY_SLUG[c.slug] || "",
    similarIds: RAW_CARS.filter(o => o.type === c.type && o.id !== c.id).slice(0, 3).map(o => o.id),
  }
})

export const OFFERS = [
  { id: 1, pct: "-5%", title: "New Year Supercar Drive", desc: "5% off select new-condition coupes, financing available on approval.", expiry: "Expires Jul 31, 2026", carId: 1 },
  { id: 2, pct: "₦20M OFF", title: "Certified Hypercar Clearance", desc: "Flat discount on inspected used hypercars currently in stock.", expiry: "Expires Jul 20, 2026", carId: 11 },
  { id: 3, pct: "FREE", title: "2-Year Concierge Service Plan", desc: "Free maintenance and detailing plan bundled with any coupe purchase.", expiry: "Expires Aug 15, 2026", carId: 9 },
]

export const BRANDS = ["Ferrari", "Lamborghini", "Porsche", "McLaren", "Bugatti", "Aston Martin", "Rolls-Royce", "Bentley", "Maserati", "Koenigsegg", "Pagani", "Lotus"]
export const TYPES = ["All", "Coupe", "Sedan", "Hypercar"]

export const fmtPrice = n => {
  if (n >= 1000000000) return "₦" + (n / 1000000000).toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + "B"
  return "₦" + (n / 1000000).toFixed(1).replace(/\.0$/, '') + "M"
}