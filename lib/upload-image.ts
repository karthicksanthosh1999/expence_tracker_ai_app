import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const uploadFileToLocal = async (file: File | null): Promise<string | null> => {
    if (!file) return null;

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = path.extname(file.name || ".jpg");
    const fileName = `${uuidv4()}${fileExt}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    ``
    return `/uploads/${fileName}`;
};
