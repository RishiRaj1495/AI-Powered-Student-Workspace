import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
}

/**
 * Parse an uploaded file (PDF, DOCX, TXT, MD) and return extracted text content.
 */
export async function parseFile(file) {
  const extension = file.name.split('.').pop().toLowerCase();

  if (extension === 'pdf') {
    return parsePdfFile(file);
  } else if (extension === 'docx') {
    return parseDocxFile(file);
  } else if (extension === 'txt' || extension === 'md') {
    return parseTextFile(file);
  } else {
    // Attempt standard text read fallback
    return parseTextFile(file);
  }
}

async function parseTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read text file.'));
    reader.readAsText(file);
  });
}

async function parseDocxFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function parsePdfFile(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items.map(item => item.str);
      fullText += `--- Page ${pageNum} ---\n` + pageStrings.join(' ') + '\n\n';
    }

    if (!fullText.trim()) {
      throw new Error('Extracted PDF text is empty (scanned image or protected).');
    }
    return fullText;
  } catch (err) {
    console.warn('PDF.js parsing error, attempting text fallback:', err);
    throw new Error(`PDF parsing failed: ${err.message || 'Please check file format'}`);
  }
}
