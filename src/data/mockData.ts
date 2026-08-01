import { Product, Service, Industry, ProcessStep, Testimonial, FAQItem, GalleryItem } from '../types';
import cnc5AxisImg from '../assets/images/cnc_5axis_machining_1785570190440.jpg';
import prod1 from '../assets/images/customized gearbox.png'
import prod2 from '../assets/images/prod2.png';
import prod3 from '../assets/images/prod3.png';

export interface CategoryHierarchy {
  id: string;
  name: string;
  subcategories: string[];
}

export const CATEGORY_TAXONOMY: CategoryHierarchy[] = [
  {
    id: 'cat-steel-metals',
    name: 'Steel & Metals',
    subcategories: [
      'AISI 4130 Chromoly Tube',
      'AISI 1020 Tube',
      'Stainless Steel Tubes',
      'MS Pipes',
      'Alloy Steel Bars',
      'Aluminium Rods',
      'Copper Bars',
      'Brass Rods'
    ]
  },
  {
    id: 'cat-cnc-machining',
    name: 'CNC & Machining',
    subcategories: [
      'CNC Turning',
      'CNC Milling',
      'VMC Components',
      'Precision Parts',
      '5-Axis CNC Machined Parts'
    ]
  },
  {
    id: 'cat-automotive',
    name: 'Automotive Components',
    subcategories: [
      'Gearboxes',
      'Differentials',
      'Axles',
      'Rack & Pinion',
      'Suspension Parts',
      'Brake Hoses'
    ]
  },
  {
    id: 'cat-bearings',
    name: 'Bearings',
    subcategories: [
      'Ball Bearings',
      'Roller Bearings',
      'Needle Bearings',
      'Taper Bearings'
    ]
  },
  {
    id: 'cat-power-transmission',
    name: 'Power Transmission',
    subcategories: [
      'Gears',
      'Shafts',
      'Sprockets',
      'Chains',
      'Couplings',
      'Pulleys'
    ]
  },
  {
    id: 'cat-hydraulic-pneumatic',
    name: 'Hydraulic & Pneumatic',
    subcategories: [
      'Hydraulic Cylinders',
      'Pneumatic Cylinders',
      'Hydraulic Power Packs',
      'Hydraulic Hoses',
      'Hydraulic Fittings'
    ]
  },
  {
    id: 'cat-industrial-hardware',
    name: 'Industrial Hardware',
    subcategories: [
      'Fasteners',
      'Industrial Springs',
      'Anchors',
      'Rivets'
    ]
  },
  {
    id: 'cat-fabrication',
    name: 'Fabrication',
    subcategories: [
      'Laser Cutting',
      'Plasma Cutting',
      'Water Jet Cutting',
      'Sheet Metal Fabrication'
    ]
  },
  {
    id: 'cat-raw-materials',
    name: 'Raw Materials',
    subcategories: [
      'Steel Plates',
      'MS Sheets',
      'SS Sheets',
      'Aluminium Sheets',
      'Brass Sheets'
    ]
  },
  {
    id: 'cat-industrial-consumables',
    name: 'Industrial Consumables',
    subcategories: [
      'Cutting Tools',
      'Carbide Inserts',
      'End Mills',
      'Drill Bits',
      'Grinding Wheels'
    ]
  }
];

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: 'INDIA\'S LEADING   INDUSTRIAL HUB',
    title: 'Precision Engineered Materials & Direct Mill Sourcing',
    subtitle: 'Connecting global OEMs, fabrication yards, and CNC facilities with certified steel, non-ferrous alloys, valves, and precision heavy components.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Explore Shop Catalog',
    secondaryCta: 'Request Instant Quote'
  },
  {
    id: 'slide-2',
    badge: '100% MTC TRACEABILITY & QUALITY GUARANTEED',
    title: 'Certified Heavy Steels & Structural Raw Components',
    subtitle: 'Direct mill dispatches for ASTM A106 Seamless Pipes, Heavy MS Plates, Tool Steels, and Aerospace Grade Aluminum with complete chemical analysis.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'View Structural Steels',
    secondaryCta: 'Download Spec Catalog'
  },
  {
    id: 'slide-3',
    badge: '5-AXIS CNC & CUSTOM HEAVY FABRICATION',
    title: 'End-to-End Contract Manufacturing & Turnkey Solutions',
    subtitle: 'From CAD drawings and material procurement to precision machining, NDT inspection, and pan-India backyard logistics.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80',
    primaryCta: 'Upload CAD for Quote',
    secondaryCta: 'Our Capabilities'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'customized gearbox',
    category: 'Steel & Metals',
    subcategory: 'MS Pipes',
    shortDescription: 'High-pressure seamless carbon steel pipes engineered for high temperature process pipelines.',
    fullDescription: 'ASTM A106 Grade B / API 5L Grade B heavy-wall carbon steel seamless pipe certified for high-pressure oil & gas, steam boilers, and process plants. Fully tested with Hydrostatic and Ultrasonic NDT.',
    image: prod1,
    specifications: {
      grade: 'ASTM A106 Gr B / API 5L',
      standard: 'ASME B36.10M',
      dimensions: '2" NB to 24" NB (Sch 40/80/160)',
      finish: 'Black Varnish / Beveled Ends',
      origin: 'Made in India'
    },
    pricePerUnit: 2000,
    originalPrice: 2100,
    unit: 'Meter',
    moq: '50 Meters',
    rating: 4.9,
    reviewsCount: 38,
    millPartner: 'Tata Steel',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Carbon & Alloy Steel',
    surfaceFinishGroup: 'Mill Finish',
    countryOfOrigin: 'Made in India',
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'Customized Rack & Pinion Steering Assembly_EBRP03',
    category: 'Raw Materials',
    subcategory: 'Aluminium Sheets',
    shortDescription: 'Aerospace grade structural aluminum alloy plates with high strength-to-weight ratio.',
    fullDescription: 'Heat-treatable 6061-T6 aluminum rolled plates featuring superior corrosion resistance, excellent machinability, and high structural weldability for jigs, aerospace, and transport framing.',
    image: prod2,
    specifications: {
      grade: 'AA 6061 T6 Temper',
      standard: 'ASTM B209 / EN 485',
      dimensions: '6mm to 100mm Thick (1220x2440mm)',
      hardness: '95 HB Brinell',
      origin: 'Made in India'
    },
    pricePerUnit: 340,
    originalPrice: 380,
    unit: 'Kg',
    moq: '100 Kg',
    rating: 4.8,
    reviewsCount: 29,
    millPartner: 'Hindalco',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Aluminium Alloys',
    surfaceFinishGroup: 'Anodized/Protective',
    countryOfOrigin: 'Made in India',
    isFeatured: true
  },
  {
    id: 'prod-3',
    name: 'MS BRIGHT BAR Ø 20 to Ø 70 MM ( PER KG )',
    category: 'Raw Materials',
    subcategory: 'Steel Plates',
    shortDescription: 'Structural mild steel plates for heavy gantry girders, earthmoving equipment, and pressure vessels.',
    fullDescription: 'IS 2062 E250 / E350 BR structural steel plates supplied directly from primary integrated steel mills. Features uniform grain structure and superior impact toughness.',
    image: prod3,
    specifications: {
      grade: 'IS 2062 E250 / E350 BR',
      standard: 'BIS Certified / EN 10025',
      dimensions: '12mm to 120mm x 2500 x 12000mm',
      finish: 'Hot Rolled Mill Finish',
      origin: 'Made in India'
    },
    pricePerUnit: 62,
    originalPrice: 68,
    unit: 'Kg',
    moq: '2 Metric Tons',
    rating: 4.9,
    reviewsCount: 45,
    millPartner: 'JSW Steel [JSPL]',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Carbon & Alloy Steel',
    surfaceFinishGroup: 'Mill Finish',
    countryOfOrigin: 'Made in India',
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel 316L Bright Rods & Bars',
    category: 'Steel & Metals',
    subcategory: 'Alloy Steel Bars',
    shortDescription: 'Precision ground bright round bars with high molybdenum content for marine and chemical shafts.',
    fullDescription: 'AISI 316L / EN 1.4404 cold drawn and centerless ground bright round bars. Superior resistance to pitting in chloride environments; ideal for pump shafts, medical fittings, and marine hardware.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    specifications: {
      grade: 'AISI 316L / DIN 1.4404',
      standard: 'ASTM A276 / A479',
      dimensions: 'Dia 8mm to 150mm x 3000mm',
      finish: 'Cold Drawn h9 Bright Ground',
      hardness: 'Max 217 HB'
    },
    pricePerUnit: 310,
    originalPrice: 345,
    unit: 'Kg',
    moq: '200 Kg',
    rating: 4.7,
    reviewsCount: 22,
    millPartner: 'SAIL',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Stainless Steel',
    surfaceFinishGroup: 'Bright Ground/Polished',
    countryOfOrigin: 'Made in India',
    isFeatured: false
  },
  {
    id: 'prod-5',
    name: 'High-Tensile 10.9 Industrial Fasteners',
    category: 'Industrial Hardware',
    subcategory: 'Fasteners',
    shortDescription: 'Grade 10.9 & 12.9 heavy hex bolts, studs, and prevailing torque lock nuts.',
    fullDescription: 'Heavy-duty high tensile alloy steel metric bolts and studs with hot-dip galvanization or black oxide treatment. Designed for critical structural steel joints and wind turbine tower connections.',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    specifications: {
      grade: 'Class 10.9 / 12.9 ISO 898-1',
      standard: 'DIN 931 / DIN 933 / ISO 4014',
      dimensions: 'M12 to M48 Length up to 400mm',
      finish: 'Hot-Dip Galvanized / Phosphated',
      origin: 'Made in India'
    },
    pricePerUnit: 145,
    originalPrice: 170,
    unit: 'Kg',
    moq: '100 Kg',
    rating: 4.9,
    reviewsCount: 52,
    millPartner: 'Tata Steel',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Carbon & Alloy Steel',
    surfaceFinishGroup: 'Hot-Dip Galvanized (HDG)',
    countryOfOrigin: 'Made in India',
    isFeatured: true
  },
  {
    id: 'prod-6',
    name: 'Heavy Duty Spherical Roller Bearings',
    category: 'Bearings',
    subcategory: 'Roller Bearings',
    shortDescription: 'Self-aligning double row spherical roller bearings engineered for heavy vibrating screens and crushers.',
    fullDescription: 'SKF / TIMKEN equivalent heavy spherical roller bearings with machined brass cages. Handles high radial loads and heavy shock loading under extreme shaft misalignment.',
    image: 'https://images.unsplash.com/photo-1618090584126-129cd1f3fbae?auto=format&fit=crop&w=800&q=80',
    specifications: {
      grade: '22220 CCK/W33 & C3 Clearance',
      standard: 'ISO 15 / DIN 635',
      dimensions: '100mm Bore x 180mm OD x 46mm Width',
      finish: 'Precision Lapped Raceways'
    },
    pricePerUnit: 4850,
    originalPrice: 5500,
    unit: 'Piece',
    moq: '4 Pieces',
    rating: 4.9,
    reviewsCount: 31,
    millPartner: 'SKF Bearings',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Carbon & Alloy Steel',
    surfaceFinishGroup: 'Bright Ground/Polished',
    countryOfOrigin: 'Imported',
    isFeatured: false
  },
  {
    id: 'prod-7',
    name: 'Cast Steel Wafer Type Butterfly Valves',
    category: 'Hydraulic & Pneumatic',
    subcategory: 'Hydraulic Fittings',
    shortDescription: 'PN16 / Class 150 bi-directional resilient seated wafer butterfly valves for water & slurry.',
    fullDescription: 'WCB Cast Steel wafer butterfly valve with SS316 disc and EPDM/PTFE seat lining. Pneumatic/gear operator ready with ISO 5211 mounting pad.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    specifications: {
      grade: 'ASTM A216 WCB / SS316 Disc',
      standard: 'API 609 / BS 5155',
      dimensions: 'DN50 (2") to DN600 (24")',
      finish: 'Epoxy Coated Blue Body'
    },
    pricePerUnit: 3200,
    originalPrice: 3800,
    unit: 'Piece',
    moq: '2 Pieces',
    rating: 4.8,
    reviewsCount: 19,
    millPartner: 'Bosch Rexroth',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Carbon & Alloy Steel',
    surfaceFinishGroup: 'Anodized/Protective',
    countryOfOrigin: 'Made in India',
    isFeatured: false
  },
  {
    id: 'prod-8',
    name: 'Precision 5-Axis CNC Machined Parts',
    category: 'CNC & Machining',
    subcategory: '5-Axis CNC Machined Parts',
    shortDescription: 'Custom contract 5-axis CNC machined components manufactured according to customer CAD / STEP files.',
    fullDescription: 'High precision 5-axis CNC milled and turned components fabricated from SS316, Aircraft Aluminum, or Titanium Alloys. Tolerances tight down to ±0.005mm with CMM inspection report.',
    image: cnc5AxisImg,
    specifications: {
      grade: 'Alloy / Stainless / Titanium',
      standard: 'ISO 2768-mK Precision',
      dimensions: 'Custom CAD/STEP File Specs',
      finish: 'Anodized / Bead Blasted / Passivated'
    },
    pricePerUnit: 1250,
    originalPrice: 1500,
    unit: 'Component',
    moq: '10 Components',
    rating: 5.0,
    reviewsCount: 64,
    millPartner: 'Sandvik Coromant',
    stockAvailability: 'Custom Mill Order (2–6 weeks)',
    materialGradeGroup: 'Titanium & Superalloys',
    surfaceFinishGroup: 'Anodized/Protective',
    countryOfOrigin: 'Made in India',
    isFeatured: true
  },
  {
    id: 'prod-9',
    name: 'Carbide Cutting Inserts & CNC Milling Tools',
    category: 'Industrial Consumables',
    subcategory: 'Carbide Inserts',
    shortDescription: 'PVD/CVD coated tungsten carbide indexable inserts for heavy steel turning and milling.',
    fullDescription: 'CNMG 120408 / WNMG 080408 tungsten carbide turning inserts featuring nano-TiAlN multilayer coating for high speed dry machining of alloy steel and cast iron.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    specifications: {
      grade: 'P25 / K20 Tungsten Carbide',
      standard: 'ISO 1832 Standards',
      dimensions: 'CNMG 120408-PM',
      finish: 'CVD TiCN + Al2O3 Coated'
    },
    pricePerUnit: 195,
    originalPrice: 240,
    unit: 'Piece',
    moq: '50 Pieces',
    rating: 4.8,
    reviewsCount: 41,
    millPartner: 'Sandvik Coromant',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Other',
    surfaceFinishGroup: 'Anodized/Protective',
    countryOfOrigin: 'Imported',
    isFeatured: false
  },
  {
    id: 'prod-10',
    name: 'Heavy Structural Fabricated Girders',
    category: 'Fabrication',
    subcategory: 'Sheet Metal Fabrication',
    shortDescription: 'Submerged arc welded (SAW) heavy plate girders and built-in box beams for bridges and cranes.',
    fullDescription: 'Custom SAW welded heavy steel plate girders manufactured strictly to IS 800 standards. Fully ultrasonic tested welds with sandblasting SA 2.5 and red oxide zinc chromate primer coat.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    specifications: {
      grade: 'IS 2062 E350 C / E410',
      standard: 'IS 800 / AWS D1.1 Welding',
      dimensions: 'Depth 600mm to 3000mm x 18M Length',
      finish: 'Shot Blasted SA 2.5 + Primer'
    },
    pricePerUnit: 78,
    originalPrice: 85,
    unit: 'Kg',
    moq: '5 Metric Tons',
    rating: 4.9,
    reviewsCount: 27,
    millPartner: 'JSW Steel [JSPL]',
    stockAvailability: 'Custom Mill Order (2–6 weeks)',
    materialGradeGroup: 'Carbon & Alloy Steel',
    surfaceFinishGroup: 'Anodized/Protective',
    countryOfOrigin: 'Made in India',
    isFeatured: true
  },
  {
    id: 'prod-11',
    name: 'Hydraulic High-Pressure Wire Braid Hoses',
    category: 'Hydraulic & Pneumatic',
    subcategory: 'Hydraulic Hoses',
    shortDescription: '4SP/4SH four spiral steel wire high pressure hydraulic hoses for excavation machinery.',
    fullDescription: 'DIN EN 856 4SP heavy hydraulic hose with synthetic oil resistant rubber lining and four high tensile steel wire spirals. Burst pressure rated up to 1600 Bar.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    specifications: {
      grade: '4SP / 4SH DIN EN 856',
      standard: 'SAE 100 R13 / ISO 3862',
      dimensions: '1/4" to 2" Internal Diameter',
      finish: 'Abra-Shield Weather Resistant Outer Rubber'
    },
    pricePerUnit: 680,
    originalPrice: 750,
    unit: 'Meter',
    moq: '20 Meters',
    rating: 4.7,
    reviewsCount: 16,
    millPartner: 'Bosch Rexroth',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Other',
    surfaceFinishGroup: 'Anodized/Protective',
    countryOfOrigin: 'Imported',
    isFeatured: false
  },
  {
    id: 'prod-12',
    name: 'High-Performance Tool & Die Steels (H13 / D2)',
    category: 'Steel & Metals',
    subcategory: 'Alloy Steel Bars',
    shortDescription: 'Hot work and cold work vacuum degassed alloy tool steels for heavy stamping dies.',
    fullDescription: 'AISI H13 (1.2344) and D2 (1.2379) ESR grade tool steel forged blocks and rounds. Uniform carbide distribution providing superior toughness, wear resistance, and heat checking resistance.',
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80',
    specifications: {
      grade: 'AISI H13 / D2 / DIN 1.2379 ESR',
      standard: 'ASTM A681',
      dimensions: 'Round 50mm to 400mm / Flat Blocks',
      hardness: 'Annealed to Max 229 HB'
    },
    pricePerUnit: 280,
    originalPrice: 320,
    unit: 'Kg',
    moq: '150 Kg',
    rating: 4.9,
    reviewsCount: 33,
    millPartner: 'SAIL',
    stockAvailability: 'Ready Stock (24–48h Dispatch)',
    materialGradeGroup: 'Carbon & Alloy Steel',
    surfaceFinishGroup: 'Mill Finish',
    countryOfOrigin: 'Made in India',
    isFeatured: false
  }
];

export const SERVICES: Service[] = [
  {
    id: 'serv-1',
    title: 'Industrial Raw Material Procurement',
    badgeNumber: '01',
    description: 'Direct mill sourcing of primary steel coils, seamless tubes, and non-ferrous ingots with batch MTC certification.',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Direct primary mill dispatch',
      'Batch-wise chemical chemical & mechanical MTC',
      'Custom cut-to-length shearing'
    ]
  },
  {
    id: 'serv-2',
    title: 'Precision CNC Machining & Turning',
    badgeNumber: '02',
    description: '3, 4, and 5-axis CNC milling, Swiss turning, and deep hole drilling for tight-tolerance OEM components.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Tolerances down to ±0.005mm',
      'Rapid prototype to mass batch production',
      'Full CMM dimensional report'
    ]
  },
  {
    id: 'serv-3',
    title: 'Laser Cutting & CNC Bending',
    badgeNumber: '03',
    description: 'High-power 12kW Fiber Laser cutting up to 35mm MS / 25mm SS with multi-axis press brake bending.',
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Clean burr-free nitrogen laser edges',
      '300-Ton press brake bending up to 4 meters',
      'DXF/DWG automated nesting optimization'
    ]
  },
  {
    id: 'serv-4',
    title: 'Heavy Structural Fabrication',
    badgeNumber: '04',
    description: 'ASME & AWS certified welding for heavy girders, pressure vessel shells, crane beams, and process skids.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Submerged Arc Welding (SAW / FCAW)',
      'Shot blasting SA 2.5 & epoxy coating',
      'Third-party NDT (UT / RT / MPI)'
    ]
  },
  {
    id: 'serv-5',
    title: 'Custom OEM Component Manufacturing',
    badgeNumber: '05',
    description: 'Turnkey manufacturing of proprietary mechanical equipment, custom gearboxes, and hydraulic manifolds.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'DFM (Design for Manufacturing) review',
      'Reverse engineering & CAD modeling',
      'Assembly & functional testing'
    ]
  },
  {
    id: 'serv-6',
    title: 'Metallurgical & Engineering Consultation',
    badgeNumber: '06',
    description: 'Technical advisory on material selection, heat treatment protocols, failure analysis, and cost reduction.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Alloy substitution for cost optimization',
      'Heat treatment (QT, Nitriding, Vacuum)',
      'Corrosion and fatigue failure analysis'
    ]
  },
  {
    id: 'serv-7',
    title: 'Pan-India Supply Chain & Just-In-Time',
    badgeNumber: '07',
    description: 'Strategic stockholding across 5 regional stockyards offering JIT delivery to minimize customer inventory holding.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Dedicated flatbed truck logistics',
      'Buffer inventory holding agreements',
      'Real-time GPS dispatch tracking'
    ]
  },
  {
    id: 'serv-8',
    title: 'Quality Inspection & NDT Services',
    badgeNumber: '08',
    description: 'Level II/III certified Non-Destructive Testing including Ultrasonic, Radiographic, Magnetic Particle, and PMI.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    checklist: [
      'Positive Material Identification (PMI Spectro)',
      'Hydrostatic pressure testing up to 700 Bar',
      'Third-party TUV / Bureau Veritas inspection'
    ]
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'ind-1',
    title: 'Automobile & EV Manufacturing',
    description: 'High-tensile alloy steels, aluminum chassis stampings, and precision gears for EV powertrains.',
    iconName: 'Car'
  },
  {
    id: 'ind-2',
    title: 'Oil & Gas / Petrochemicals',
    description: 'API 5L seamless pipes, heavy flanges, ASTM A193 B7 bolting, and corrosive-resistant valves.',
    iconName: 'Flame'
  },
  {
    id: 'ind-3',
    title: 'Power Plants & Renewable Energy',
    description: 'Boiler tubes, solar tracker structural steel sections, and wind turbine tower foundation bolts.',
    iconName: 'Zap'
  },
  {
    id: 'ind-4',
    title: 'Construction & Infrastructure',
    description: 'IS 2062 MS plates, TMR rebar, heavy bridge girders, and scaffolding hardware.',
    iconName: 'Building2'
  },
  {
    id: 'ind-5',
    title: 'Railway & Heavy Freight',
    description: 'Axle forgings, UIC 60 rail fittings, bogie structural plates, and braking system components.',
    iconName: 'TrainTrack'
  },
  {
    id: 'ind-6',
    title: 'Chemical & Process Engineering',
    description: 'SS 316L reactors, titanium heat exchanger tubes, and PTFE lined process piping.',
    iconName: 'TestTube2'
  },
  {
    id: 'ind-7',
    title: 'Pharma Equipment Fabrication',
    description: 'Electropolished SS 316L sanitary tubes, peristaltic pump blocks, and cleanroom vessels.',
    iconName: 'Pill'
  },
  {
    id: 'ind-8',
    title: 'Defence & Aerospace Projects',
    description: 'Aerospace AA 7075 / 2024 plates, armor plate steel, and precision radar mount brackets.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'ind-9',
    title: 'Heavy OEM Machinery & Mining',
    description: 'Hardox wear-resistant plates, spherical roller bearings, and hydraulic boom cylinder tubes.',
    iconName: 'HardHat'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Requirement Analysis',
    description: 'Submit your material grade specifications, CAD drawings, or   bill of quantities (BOQ) through our online portal or RFQ desk.'
  },
  {
    stepNumber: '02',
    title: 'Instant Direct Mill Quotation',
    description: 'Our metallurgical estimators analyze stockyard inventories and direct mill rolling schedules to deliver binding prices within 60 minutes.'
  },
  {
    stepNumber: '03',
    title: 'Order Confirmation & PO Processing',
    description: 'Review transparent payment terms, tax invoicing, delivery lead times, and issue formal Purchase Orders through signed contract.'
  },
  {
    stepNumber: '04',
    title: 'Precision Sourcing & Fabrication',
    description: 'Materials are sheared, CNC machined, surface treated, or rolled directly at primary mill lines under strict QA monitoring.'
  },
  {
    stepNumber: '05',
    title: 'Rigorous Quality & NDT Inspection',
    description: 'Chemical spectro testing, mechanical tensile tests, and Ultrasonic NDT reports are compiled into a comprehensive MTC dossier.'
  },
  {
    stepNumber: '06',
    title: 'Guaranteed On-Site Dispatch',
    description: 'Dispatched via heavy flatbed logistics directly to your factory backyard or project site with real-time tracking.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Engineering Bazar revolutionized our structural raw material procurement. Sourcing 350 Metric Tons of IS 2062 E350 plates with 100% mill MTCs was seamless. Deliveries were made 2 days ahead of schedule!',
    name: 'Rajesh Kumar Mehta',
    title: 'VP Procurement & Supply Chain',
    company: 'Larsen & Toubro Heavy Engineering',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-2',
    quote: 'Finding certified AA 6061-T6 aluminum plates with mill test certificates used to take weeks. With Engineering Bazar, we got instant transparent pricing and received the material sheared to exact tolerances within 36 hours.',
    name: 'Ananya Deshmukh',
    title: 'Head of Tooling & Prototyping',
    company: 'Tata Motors EV Systems Division',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-3',
    quote: 'Their CNC 5-axis contract machining service is unmatched. We uploaded our STEP files for complex SS316 valve bodies and received 100 components with CMM reports that passed TUV audit without a single defect.',
    name: 'Vikramjit Singh',
    title: 'Chief Technical Officer',
    company: 'Godrej Process Equipment Unit',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are Mill Test Certificates (MTC) provided with every material order?',
    answer: 'Yes, 100% of raw materials dispatched from Engineering Bazar carry authentic EN 10204 Type 3.1 or 3.2 Mill Test Certificates (MTC) directly traceable to primary heat numbers from Tata Steel, JSW, SAIL, Hindalco, or accredited global mills. Chemical and mechanical properties are fully documented.'
  },
  {
    id: 'faq-2',
    question: 'What is the Minimum Order Quantity (MOQ) for   orders?',
    answer: 'MOQ depends on the product category. For stockyard items (pipes, plates, bright bars), MOQ starts as low as 50 meters or 100 kg. For custom direct-mill rolling orders or specialized alloy castings, MOQ usually ranges between 1 to 5 Metric Tons. Contact our RFQ desk for low-volume prototype requirements.'
  },
  {
    id: 'faq-3',
    question: 'Can I upload CAD / STEP files for custom machining & fabrication?',
    answer: 'Absolutely. You can attach .STEP, .IGES, .SLDPRT, or .DXF files directly into our RFQ form. Our engineering estimation team will perform a Design for Manufacturability (DFM) check and issue a itemized quote within 2 to 4 business hours.'
  },
  {
    id: 'faq-4',
    question: 'What are the accepted payment terms for corporate   clients?',
    answer: 'We support multiple payment channels including NEFT/RTGS, Letter of Credit (LC at Sight / 30-90 Days), and Bank Guarantees (BG) for enterprise accounts. Pre-approved corporate clients can also access credit facilities subject to credit underwriting.'
  },
  {
    id: 'faq-5',
    question: 'What are the standard dispatch timelines across India?',
    answer: 'Ready stock items from our nearest regional stockyards (Mumbai, Chennai, Delhi NCR, Ahmedabad, Kolkata) are dispatched within 24 to 48 hours. Custom fabricated assemblies or CNC production orders take 2 to 4 weeks depending on job complexity.'
  },
  {
    id: 'faq-6',
    question: 'How do you ensure quality control during third-party NDT testing?',
    answer: 'We maintain an in-house NDT testing facility with Level II ASNT certified engineers. We regularly facilitate third-party witness inspections by TUV, Bureau Veritas, DNV, and Lloyds Register prior to final yard dispatch.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Heavy Structural Steel Pipe Yard',
    category: 'Raw Materials',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
    caption: 'Over 10,000 MT of API 5L seamless carbon steel pipes stored in our temperature-controlled stockyard.'
  },
  {
    id: 'gal-2',
    title: '5-Axis High Speed CNC Gantry Milling',
    category: 'CNC Machining',
    image: cnc5AxisImg,
    caption: 'Precision machining of large aerospace grade titanium structural spars.'
  },
  {
    id: 'gal-3',
    title: 'Heavy Plate Girder Submerged Arc Welding',
    category: 'Factory Floor',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    caption: 'Automatic SAW welding line fabricating 18-meter crane girders for steel plant expansion.'
  },
  {
    id: 'gal-4',
    title: 'Heavy Flatbed Fleet Yard Dispatch',
    category: 'Logistics & Shipping',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    caption: 'Pan-India logistics fleet loaded with hot-dip galvanized structural members.'
  },
  {
    id: 'gal-5',
    title: 'Automatic Fiber Laser Sheet Metal Cutting',
    category: 'CNC Machining',
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80',
    caption: '12kW fiber laser cutting 25mm thick SS316L plates with high nitrogen assist gas.'
  },
  {
    id: 'gal-6',
    title: 'Bright Bar Cold Drawing & Polishing Line',
    category: 'Factory Floor',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    caption: 'Continuous cold drawing and centerless grinding of precision stainless steel shafts.'
  }
];

export const CATEGORIES_LIST = [
  'All Products',
  ...CATEGORY_TAXONOMY.map(c => c.name)
];

export const MATERIAL_GRADES_LIST = [
  'Carbon & Alloy Steel',
  'Stainless Steel',
  'Aluminium Alloys',
  'Brass & Copper Alloys',
  'Titanium & Superalloys'
];

export const MILL_PARTNERS_LIST = [
  'Tata Steel',
  'JSW Steel [JSPL]',
  'SAIL',
  'SKF Bearings',
  'Sandvik Coromant',
  'Bosch Rexroth',
  'Hindalco'
];

export const SURFACE_FINISHES_LIST = [
  'Mill Finish',
  'Hot-Dip Galvanized (HDG)',
  'Anodized/Protective',
  'Bright Ground/Polished'
];
