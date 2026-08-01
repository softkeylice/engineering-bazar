export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  specifications: {
    grade?: string;
    standard?: string;
    dimensions?: string;
    finish?: string;
    hardness?: string;
    origin?: string;
    [key: string]: string | undefined;
  };
  pricePerUnit: number;
  originalPrice?: number;
  unit: string;
  moq: string;
  rating: number;
  reviewsCount: number;
  millPartner: string;
  stockAvailability: 'Ready Stock (24–48h Dispatch)' | 'Custom Mill Order (2–6 weeks)';
  materialGradeGroup: 'Carbon & Alloy Steel' | 'Stainless Steel' | 'Aluminium Alloys' | 'Brass & Copper Alloys' | 'Titanium & Superalloys' | 'Other';
  surfaceFinishGroup: 'Mill Finish' | 'Hot-Dip Galvanized (HDG)' | 'Anodized/Protective' | 'Bright Ground/Polished';
  countryOfOrigin: 'Made in India' | 'Imported';
  isFeatured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  badgeNumber: string;
  description: string;
  image: string;
  checklist: string[];
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Factory Floor' | 'CNC Machining' | 'Raw Materials' | 'Logistics & Shipping';
  image: string;
  caption: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedSubcategories: string[];
  maxPrice: number;
  stockAvailability: string[];
  materialGrades: string[];
  millPartners: string[];
  surfaceFinishes: string[];
  countriesOfOrigin: string[];
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating';
}

export interface RFQFormData {
  fullName: string;
  workEmail: string;
  phone: string;
  companyName: string;
  productCategory: string;
  estimatedQuantity: string;
  specifications: string;
  fileName?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  companyName: string;
  gstin: string;
  contactName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  shippingMethod: 'standard' | 'express' | 'pickup';
  paymentMethod: 'card' | 'netbanking' | 'upi' | 'po';
  subtotal: number;
  gstAmount: number;
  shippingFee: number;
  grandTotal: number;
  status: 'Confirmed' | 'Processing Dispatch' | 'In Transit';
}
