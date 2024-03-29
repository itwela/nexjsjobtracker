import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function POST(request: any) {
      // Parse the incoming JSON body containing Markdown
      try {
          const requestBody = await request.json();
    
          const markdown = requestBody.markdown;
    
          // Create a new PDFDocument
          const pdfDoc = await PDFDocument.create();
    
          // Embed the Times Roman font
          const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    
          // Add a blank page to the document
          const page = pdfDoc.addPage();
    
          // Get the width and height of the page
          const { width, height } = page.getSize();
    
          // Draw Markdown content as text on the page
          const fontSize = 12;
          page.drawText(markdown, {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0), // Black color
          });
    
          // Serialize the PDFDocument to bytes (a Uint8Array)
          const pdfBytes = await pdfDoc.save();
            console.log("success")      // Return the PDF file or its contents
            return Response.json({ pdf: pdfBytes })
        
      } catch (error) {
        return Response.json({ pdf: 'errpr' })
      }

}
