import { Product, Service, Industry, ProcessStep, Testimonial, FAQItem, GalleryItem } from '../types';
import cnc5AxisImg from '../assets/images/cnc_5axis_machining_1785570190440.jpg';
import prod1 from '../assets/images/customized gearbox.png'
import prod2 from '../assets/images/prod2.png';
import prod3 from '../assets/images/prod3.png';
import { PRODUCTS } from "./products";

export { PRODUCTS };
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
