const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

router.post('/report', async (req, res) => {
    const format = req.body.format;

    // Fetch student data from the database
    const students = await Product.find().exec();

    if (format === 'excel') {
        // Generate and send an Excel report
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Student Report');

        // Define headers based on your MongoDB schema
        const headers = Object.keys(Product.schema.paths)
            .filter((field) =>  field !== '__v') // Exclude MongoDB-specific fields
            .map((field) => field.charAt(0).toUpperCase() + field.slice(1)); // Capitalize the first letter
        worksheet.addRow(headers);

        // Add student data
        students.forEach((student) => {
            // Convert the student object into an array of values
            const rowData = headers.map((header) => student[header] || 'Not Provided');
            worksheet.addRow(rowData);
        });

        // Generate a filename with the current date
        const currentDate = new Date().toLocaleDateString().replace(/\//g, '-'); // Format date as "MM-DD-YYYY"
        const filename = `StudentsReport-${currentDate}.xlsx`;

        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        await workbook.xlsx.write(res);

        // End the response to prevent further headers from being set
        res.end();
    } else if (format === 'pdf') {
        // Generate and send a PDF report
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');

        // Generate a filename with the current date
        const currentDate = new Date().toLocaleDateString().replace(/\//g, '-'); // Format date as "MM-DD-YYYY"
        const filename = `StudentsReport-${currentDate}.pdf`;

        res.setHeader('Content-Disposition',  `attachment; filename=${filename}`);
        doc.pipe(res);
        doc.fontSize(20).text('Student Report', {
            align: 'center'
        });

        // Define headers based on your MongoDB schema
        const headers = Object.keys(Product.schema.paths)
            .filter((field) => field !== '_id' && field !== '__v') // Exclude MongoDB-specific fields
            .map((field) => field.charAt(0).toUpperCase() + field.slice(1)); // Capitalize the first letter

        // Generate a table with all student details
        const table = {
            headers,
            rows: students.map((student) =>
                headers.map((header) => student[header] || 'Not Provided')
            ),
        };
        generatePDFTable(doc, table);

        doc.end(); // End the PDF document
        res.end();
    } else {
        res.status(400).send('Invalid report format');
    }
});



function generatePDFTable(doc, table) {
    const tableHeaders = table.headers;
    const tableRows = table.rows;
    const columnWidths = tableHeaders.map((header) => header.length * 8);

    const cellPadding = 10;
    const initialX = 50;
    const initialY = 100;
    let currentX = initialX;
    let currentY = initialY;

    // Draw table headers
    doc.font('Helvetica-Bold');
    tableHeaders.forEach((header, i) => {
        doc.rect(currentX, currentY, columnWidths[i], cellPadding).fillAndStroke('#eee', '#000');
        doc.text(header, currentX + cellPadding / 2, currentY + cellPadding / 2);
        currentX += columnWidths[i];
    });

    doc.moveDown();

    // Draw table rows
    doc.font('Helvetica');
    tableRows.forEach((row) => {
        currentX = initialX;
        currentY += cellPadding;

        row.forEach((cell, i) => {
            doc.rect(currentX, currentY, columnWidths[i], cellPadding).fillAndStroke('#fff', '#000');
            doc.text(cell, currentX + cellPadding / 2, currentY + cellPadding / 2);
            currentX += columnWidths[i];
        });

        currentY += cellPadding;
    });
}

module.exports = router;