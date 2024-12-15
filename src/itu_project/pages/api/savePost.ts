import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {

    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return;
      }
      let file;
      if(files.file)
      file = files.file[0];
      if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
      }
      const destinationPath = path.join(process.cwd(), "public/");

      let destinationFinal = "/";
      if(file.originalFilename)
      destinationFinal = path.join(destinationPath, file.originalFilename);
      const srcPath = file.filepath;
      await mkdir(destinationPath, { recursive: true });
      await fs.copyFile(srcPath, destinationFinal, ()=> {});
      await fs.unlink(srcPath, ()=> {});

      return res.json({
        success: true,
        message: "File uploaded successfully",
        filepath: `${file.filepath}`
      });
  });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to save file"
    }, { status: 500 });
  }
}