const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const EXCEL_FILE = path.join(
  ROOT,
  "EngineeringBazar_Content_Template.xlsx"
);

const OUTPUT_FILE = path.join(
  ROOT,
  "src",
  "data",
  "products.ts"
);

const IMAGE_DIR = path.join(
  ROOT,
  "src",
  "assets",
  "images"
);

function clean(value) {
  if (value === undefined || value === null) {
    return "";
  }

  const result = String(value).trim();

  if (
    result === "_" ||
    result === "-" ||
    result === "—"
  ) {
    return "";
  }

  return result;
}

function numberOrDefault(value, defaultValue = 0) {
  const cleaned = clean(value);

  if (!cleaned) {
    return defaultValue;
  }

  const number = Number(cleaned);

  return Number.isFinite(number)
    ? number
    : defaultValue;
}

function booleanValue(value) {
  const cleaned = clean(value).toLowerCase();

  return (
    cleaned === "true" ||
    cleaned === "1" ||
    cleaned === "yes" ||
    cleaned === "y"
  );
}

function escapeString(value) {
  return clean(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, "\\n");
}

if (!fs.existsSync(EXCEL_FILE)) {
  console.error(
    `❌ Excel file not found:\n${EXCEL_FILE}`
  );
  process.exit(1);
}

console.log("📖 Reading Excel file...");

const workbook = XLSX.readFile(EXCEL_FILE);

if (!workbook.SheetNames.includes("Products")) {
  console.error(
    '❌ "Products" sheet was not found.'
  );
  process.exit(1);
}

const sheet = workbook.Sheets["Products"];

const rows = XLSX.utils.sheet_to_json(sheet, {
  defval: "",
  range: 3
});

console.log(
  `📦 Found ${rows.length} product row(s).`
);

if (rows.length === 0) {
  console.error(
    "❌ No products found in the Excel sheet."
  );
  process.exit(1);
}

const imports = [];
const importMap = new Map();

function getImageImport(imageName) {
  const cleanedName = clean(imageName);

  if (!cleanedName) {
    return null;
  }

  const imagePath = path.join(
    IMAGE_DIR,
    cleanedName
  );

  if (!fs.existsSync(imagePath)) {
    console.warn(
      `⚠️ Image not found: ${cleanedName}`
    );

    return null;
  }

  if (importMap.has(cleanedName)) {
    return importMap.get(cleanedName);
  }

  const variableName =
    "img" + (importMap.size + 1);

  importMap.set(
    cleanedName,
    variableName
  );

  imports.push(
    `import ${variableName} from "../assets/images/${cleanedName}";`
  );

  return variableName;
}

const products = rows
  .filter((product) => clean(product.name))
  .map((product, index) => {

    const id =
      clean(product.id) ||
      `prod-${index + 1}`;

    const imageImport =
      getImageImport(product.image);

    const specifications = [];

    if (clean(product.specGrade)) {
      specifications.push(
        `grade: "${escapeString(product.specGrade)}"`
      );
    }

    if (clean(product.specStandard)) {
      specifications.push(
        `standard: "${escapeString(product.specStandard)}"`
      );
    }

    if (clean(product.specDimensions)) {
      specifications.push(
        `dimensions: "${escapeString(product.specDimensions)}"`
      );
    }

    if (clean(product.specFinish)) {
      specifications.push(
        `finish: "${escapeString(product.specFinish)}"`
      );
    }

    if (clean(product.specHardness)) {
      specifications.push(
        `hardness: "${escapeString(product.specHardness)}"`
      );
    }

    if (clean(product.specOrigin)) {
      specifications.push(
        `origin: "${escapeString(product.specOrigin)}"`
      );
    }

    if (clean(product.specOther)) {
      const otherParts = clean(product.specOther)
        .split(";")
        .map((item) => item.trim())
        .filter(Boolean);

      otherParts.forEach((item) => {
        const [key, ...valueParts] =
          item.split("=");

        if (key && valueParts.length) {
          const value =
            valueParts.join("=").trim();

          if (
            value &&
            value.toLowerCase() !== "none"
          ) {
            specifications.push(
              `${key.trim()}: "${escapeString(value)}"`
            );
          }
        }
      });
    }

    const pricePerUnit =
      numberOrDefault(
        product.pricePerUnit,
        0
      );

    const originalPrice =
      numberOrDefault(
        product.originalPrice,
        0
      );

    const rating =
      numberOrDefault(
        product.rating,
        0
      );

    const reviewsCount =
      numberOrDefault(
        product.reviewsCount,
        0
      );

    const stockAvailability =
      clean(product.stockAvailability) ||
      "Ready Stock (24–48h Dispatch)";

    const materialGradeGroup =
      clean(product.materialGradeGroup) ||
      "Carbon & Alloy Steel";

    const surfaceFinishGroup =
      clean(product.surfaceFinishGroup) ||
      "Mill Finish";

    const countryOfOrigin =
      clean(product.countryOfOrigin) ||
      "Made in India";

    return `  {
    id: "${escapeString(id)}",
    name: "${escapeString(product.name)}",
    category: "${escapeString(product.category)}",
    subcategory: "${escapeString(product.subcategory)}",
    shortDescription: "${escapeString(product.shortDescription)}",
    fullDescription: "${escapeString(product.fullDescription)}",
    image: ${imageImport || '""'},
    specifications: {
      ${specifications.join(",\n      ")}
    },
    pricePerUnit: ${pricePerUnit},
    originalPrice: ${originalPrice},
    unit: "${escapeString(product.unit)}",
    moq: "${escapeString(product.moq)}",
    rating: ${rating},
    reviewsCount: ${reviewsCount},
    millPartner: "${escapeString(product.millPartner)}",
    stockAvailability: "${escapeString(stockAvailability)}",
    materialGradeGroup: "${escapeString(materialGradeGroup)}",
    surfaceFinishGroup: "${escapeString(surfaceFinishGroup)}",
    countryOfOrigin: "${escapeString(countryOfOrigin)}",
    isFeatured: ${booleanValue(product.isFeatured)}
  }`;
  });

const output = `import { Product } from "../types";

${imports.join("\n")}

export const PRODUCTS: Product[] = [
${products.join(",\n")}
];
`;

fs.writeFileSync(
  OUTPUT_FILE,
  output,
  "utf8"
);

console.log("");
console.log(
  `✅ Generated ${products.length} product(s).`
);
console.log(
  `📄 ${OUTPUT_FILE}`
);
console.log("");