// // route.ts
// import { NextResponse } from "next/server";
// import formidable, { File } from "formidable";
// import fs from "fs";

// // Import pdf-parse using require
// const pdfParse = require("pdf-parse");

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: Request) {
//   try {
//     const data = await new Promise<{ file: File }>((resolve, reject) => {
//       const form = formidable({ multiples: false });
//       form.parse(req as any, (err, fields, files) => {
//         if (err) return reject(err);

//         const uploadedFile = files.resume;
//         if (!uploadedFile) return reject(new Error("No file uploaded"));

//         const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;
//         resolve({ file: file as File });
//       });
//     });

//     const fileBuffer = fs.readFileSync(data.file.filepath);

//     // Call pdf-parse as a function
//     const pdfData = await pdfParse(fileBuffer);

//     return NextResponse.json({ text: pdfData.text });
//   } catch (error: any) {
//     console.error("Error parsing PDF:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import formidable, { File } from "formidable";
import fs from "fs";

// Import pdf-parse using require for TypeScript compatibility
const pdfParse = require("pdf-parse");

export const config = {
  api: {
    bodyParser: false, // Important for file uploads
  },
};

export async function POST(req: Request) {
  try {
    const data = await new Promise<{ file: File }>((resolve, reject) => {
      const form = formidable({ multiples: false });
      form.parse(req as any, (err, fields, files) => {
        if (err) return reject(err);

        const uploadedFile = files.resume;
        if (!uploadedFile) return reject(new Error("No file uploaded"));

        // Handle array or single file
        const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;
        resolve({ file: file as File });
      });
    });

    const fileBuffer = fs.readFileSync(data.file.filepath);
    const pdfData = await pdfParse(fileBuffer);

    return NextResponse.json({ text: pdfData.text });
  } catch (error: any) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
