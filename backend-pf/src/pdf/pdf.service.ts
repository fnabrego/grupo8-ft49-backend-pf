import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

@Injectable()
export class PdfService {
    generateReceipt(data: PaypalPayment): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: 'A5', layout: 'landscape' });
            const buffers: Buffer[] = [];

            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });
            doc.on('error', (err) => {
                reject(err);
            });

            doc.fillColor('#cb1b1a').fontSize(30).text('Expreso Rivadavia', { align: 'center' });

            doc.moveDown();
            doc.fillColor('#949494').fontSize(15).text('Detalles de pago', { align: 'left' });

            const payerName = `${data.payment_source.paypal.name.given_name} ${data.payment_source.paypal.name.surname}`;
            const payerEmail = data.payment_source.paypal.email_address;
            const paymentStatus = data.purchase_units[0].payments.captures[0].status;
            const paymentAmount = `${data.purchase_units[0].payments.captures[0].amount.value} ${data.purchase_units[0].payments.captures[0].amount.currency_code}`;
            const transactionId = data.purchase_units[0].payments.captures[0].id;
            const paymentDate = new Date(data.purchase_units[0].payments.captures[0].create_time);

            doc.fillColor('#000000').fontSize(12);
            doc.text(`Nombre: ${payerName}`);
            doc.text(`Correo: ${payerEmail}`);
            doc.text(`Estado del pago: ${paymentStatus}`);
            doc.text(`Monto: ${paymentAmount}`);
            doc.text(`Transacción ID: ${transactionId}`);
            doc.text(`Fecha: ${paymentDate.toLocaleDateString('es-AR')}`);
            doc.text(`Hora: ${paymentDate.toLocaleTimeString('es-AR')}`);

            doc.end();
        });
    }
}

