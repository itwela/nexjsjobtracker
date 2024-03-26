// 'use server'

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/app/libs/db";
import formidable from 'formidable';
import fs from 'fs'; // Importing Node's built-in file system module
import path from 'path'; // Importing Node's built-in path module

export async function POST(request: any) {
    noStore();
    const user = await currentUser();
    const jobId = request.body.jobId;

    if (!user) {
        throw new Error("Not Authorized");
    }

    const form = new formidable.IncomingForm();
    const files: Record<string, any> = await new Promise((resolve, reject) => {
        form.parse(request, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        });
    });

    const resumeFileName = files.resume.path.split('\\').pop() as string;
    const uploadDir = path.join(process.cwd(), 'uploads'); // Define the upload directory

    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    // Move the uploaded file to the upload directory
    fs.renameSync(files.resume.path, path.join(uploadDir, resumeFileName));

    // Save the resume file path to the database
    const resume = await prisma.resume.create({
        data: {
            fileUrl: path.join('uploads', resumeFileName), // Store the file path in the database
            user: {
                connect: { id: user.id } // Connect the resume to the user
            }
        }
    });

    revalidatePath('/');

    return Response.json({ text: `success`, resume });
}
