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

export const CARS = RAW_CARS.map(c => ({
  ...c,
  images: imagesFor(c.slug),
  img: imagesFor(c.slug)[0],
  specs: specsFor(c),
}))

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
