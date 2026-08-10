import XLSX from "xlsx";
import fs from "fs";
import path from "path";
const workbook = XLSX.readFile("./EngineeringBazar_Content_Template.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: ""
});

// Row 4 contains column names
const headers = rows[3];

// Data starts from Row 5
const dataRows = rows
    .slice(4)
    .filter(row => row[0] !== "" && row[0] !== undefined && row[0] !== null);
const products = dataRows.map(row => {
    const obj = {};

    headers.forEach((header, index) => {
        obj[header] = row[index];
    });

    return obj;
});
const imageImports = [];

const formattedProducts = products.map((row, index) => {

    const imageVariable = `img${index + 1}`;

    if (row.image) {
        imageImports.push(
            `import ${imageVariable} from "../assets/images/products/${row.image}";`
        );
    }

    return {
        id: `prod-${row.id}`,
        name: row.name,
        category: row.category,
        subcategory: row.subcategory,
        shortDescription: row.shortDescription,
        fullDescription: row.fullDescription,

        image: imageVariable,

        specifications: {
            grade: row.specGrade,
            standard: row.specStandard,
            dimensions: row.specDimensions,
            finish: row.specFinish,
            hardness: row.specHardness,
            origin: row.specOrigin
        },

        pricePerUnit: Number(row.pricePerUnit),
        originalPrice: Number(row.originalPrice),

        unit: row.unit,
        moq: row.moq,

        rating: Number(row.rating),
        reviewsCount: Number(row.reviewsCount),

        millPartner: row.millPartner,

        stockAvailability: row.stockAvailability,

        materialGradeGroup: row.materialGradeGroup,

        surfaceFinishGroup: row.surfaceFinishGroup,

        countryOfOrigin: row.countryOfOrigin,

        isFeatured: String(row.isFeatured).toUpperCase() === "TRUE"
    };
});
let productsString = JSON.stringify(formattedProducts, null, 2);

// Replace "img1" -> img1
imageImports.forEach((_, index) => {
    const variable = `img${index + 1}`;

    productsString = productsString.replaceAll(
        `"${variable}"`,
        variable
    );
});

const output = `
import { Product } from "../types";
${imageImports.join("\n")}

export const PRODUCTS: Product[] = ${productsString};
`;

fs.writeFileSync(
    "./src/data/products.ts",
    output,
    "utf8"
);

console.log("✅ products.ts generated successfully!");