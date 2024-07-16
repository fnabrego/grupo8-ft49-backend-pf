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

            const paymentStatusMap: { [key: string]: string } = {
                'COMPLETED': 'Completado',
                'PENDING': 'Anulado'
            };

            const translatePaymentStatus = (status: string): string => {
                return paymentStatusMap[status] || status;
            };

            doc.fillColor('#cb1b1a')
                .fontSize(25)
                .text('EXPRESO RIVADAVIA', 50, 30,{ high:30, with: 800, align: 'center', position:'top' });

            doc.moveDown();
            doc.fillColor('#949494')
                .fontSize(18)
                .text('Cliente', { with: 600, align: 'left' });

            const payerName = `${data.payment_source.paypal.name.given_name} ${data.payment_source.paypal.name.surname}`;
            const payerEmail = data.payment_source.paypal.email_address;
            const paymentStatus = translatePaymentStatus(data.purchase_units[0].payments.captures[0].status);

            doc.moveDown();
            doc.fontSize(15)
                .fillColor('#000000')
                .text('Nombre:', { with: 1000, continued: true, underline: true })
                .fontSize(13)
                .text(` ${payerName}`, { with: 600, continued: false, underline: false });
            doc.fontSize(15).text('Correo:', { with: 200, continued: true, underline: true })
                .fontSize(13)
                .text(` ${payerEmail}`, { with: 600, continued: false, underline: false });
            doc.fontSize(15)
                .text('Estado del pago:', { with: 200, continued: true, underline: true })
                .fontSize(13)
                .text(` ${paymentStatus}`, { with: 600, continued: false, underline: false });

            doc.moveDown();
            doc.fillColor('#949494')
                .fontSize(18)
                .text('Detalles del pago', { with: 600, align: 'left' });

            const paymentAmount = `${data.purchase_units[0].payments.captures[0].amount.value} ${data.purchase_units[0].payments.captures[0].amount.currency_code}`;
            const transactionId = data.purchase_units[0].payments.captures[0].id;
            const paymentDate = new Date(data.purchase_units[0].payments.captures[0].create_time);

            doc.moveDown();
            doc.fontSize(15)
                .fillColor('#000000')
                .text('Monto:', { with: 200, continued: true, underline: true })
                .fontSize(13)
                .text(` ${paymentAmount}`, { with: 600, continued: false, underline: false });
            doc.fontSize(15)
                .text('Transacción ID:', { with: 200, continued: true, underline: true })
                .fontSize(13)
                .text(` ${transactionId}`, { with: 600, continued: false, underline: false });
            doc.fontSize(15)
                .text('Fecha:', { with: 200, continued: true, underline: true })
                .fontSize(13)
                .text(` ${paymentDate.toLocaleDateString('es-AR')}`, { with: 600, continued: false, underline: false });
            doc.fontSize(15)
                .text('Hora:', { with: 200, continued: true, underline: true })
                .fontSize(13)
                .text(` ${paymentDate.toLocaleTimeString('es-AR')}`, { with: 600, continued: false, underline: false });

            doc.end();
        });
    }
}

