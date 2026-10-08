
import { Product } from "../types";
import img1 from "../assets/images/products/customized gearbox.png";

export const PRODUCTS: Product[] = [
  {
    "id": "prod-1",
    "name": "customized gearbox",
    "category": "Bars & Rods",
    "subcategory": "Round Bars",
    "shortDescription": "High-strength hot rolled round bar for structural fabrication.",
    "fullDescription": "Manufactured to IS 2062 standard, this hot rolled round bar offers excellent weldability and structural strength, suitable for construction and heavy engineering applications.",
    "image": img1,
    "specifications": {
      "grade": "680",
      "standard": "IS 2062",
      "dimensions": "25mm dia x 6m length",
      "finish": "Mill Finish",
      "hardness": "150 BHN",
      "origin": "Made in India"
    },
    "pricePerUnit": 68.5,
    "originalPrice": 75,
    "unit": "per kg",
    "moq": "500 kg",
    "rating": 4.5,
    "reviewsCount": 128,
    "millPartner": "-",
    "stockAvailability": "Ready Stock (24–48h Dispatch)",
    "materialGradeGroup": "Carbon & Alloy Steel",
    "surfaceFinishGroup": "Mill Finish",
    "countryOfOrigin": "Made in India",
    "isFeatured": true
  }
];
