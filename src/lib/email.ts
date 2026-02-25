import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  bookingId: string;
  extras: string[];
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Lumière Hotels <onboarding@resend.dev>',
      to: data.guestEmail,
      subject: `Confirmación de reserva — ${data.hotelName}`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #F5F0EB; padding: 40px;">
          <div style="text-align: center; border-bottom: 1px solid #C9A96E; padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="font-size: 28px; color: #C9A96E; margin: 0;">LUMIÈRE</h1>
            <p style="color: #94A3B8; margin-top: 8px;">Hotels & Resorts</p>
          </div>
          
          <h2 style="color: #F5F0EB; font-size: 22px;">¡Tu reserva está confirmada!</h2>
          <p style="color: #94A3B8;">Hola ${data.guestName}, gracias por elegir Lumière Hotels.</p>
          
          <div style="background: #1E293B; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Código de reserva</td>
                <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #C9A96E;">${data.bookingId.slice(0, 8).toUpperCase()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Hotel</td>
                <td style="padding: 8px 0; text-align: right;">${data.hotelName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Habitación</td>
                <td style="padding: 8px 0; text-align: right;">${data.roomName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Check-in</td>
                <td style="padding: 8px 0; text-align: right;">${data.checkIn}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Check-out</td>
                <td style="padding: 8px 0; text-align: right;">${data.checkOut}</td>
              </tr>
              ${data.extras.length > 0 ? `
              <tr>
                <td style="padding: 8px 0; color: #94A3B8;">Extras</td>
                <td style="padding: 8px 0; text-align: right;">${data.extras.join(', ')}</td>
              </tr>
              ` : ''}
              <tr style="border-top: 1px solid #334155;">
                <td style="padding: 12px 0; font-weight: bold; font-size: 18px;">Total</td>
                <td style="padding: 12px 0; text-align: right; font-weight: bold; font-size: 18px; color: #C9A96E;">€${(data.totalPrice / 100).toFixed(2)}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #94A3B8; font-size: 14px; text-align: center; margin-top: 32px;">
            ¿Necesitas ayuda? Escríbenos a <a href="mailto:reservas@lumierehotels.com" style="color: #C9A96E;">reservas@lumierehotels.com</a>
          </p>
        </div>
      `,
    });
    console.log('✅ Booking confirmation email sent to', data.guestEmail);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

export async function sendAdminNotification(data: BookingEmailData) {
  try {
    await resend.emails.send({
      from: 'Lumière System <sistema@lumierehotels.com>',
      to: process.env.ADMIN_EMAIL || 'admin@lumierehotels.com',
      subject: `Nueva reserva — ${data.hotelName} — ${data.guestName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Nueva Reserva Recibida</h2>
          <p><strong>Huésped:</strong> ${data.guestName} (${data.guestEmail})</p>
          <p><strong>Hotel:</strong> ${data.hotelName}</p>
          <p><strong>Habitación:</strong> ${data.roomName}</p>
          <p><strong>Fechas:</strong> ${data.checkIn} → ${data.checkOut}</p>
          <p><strong>Total:</strong> €${(data.totalPrice / 100).toFixed(2)}</p>
          <p><strong>ID:</strong> ${data.bookingId}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
  }
}

export async function sendCancellationEmail(data: BookingEmailData) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Lumière Hotels <onboarding@resend.dev>',
      to: data.guestEmail,
      subject: `Reserva cancelada — ${data.hotelName}`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #0A1628; color: #F5F0EB; padding: 40px;">
          <div style="text-align: center; border-bottom: 1px solid #C9A96E; padding-bottom: 24px; margin-bottom: 24px;">
            <h1 style="font-size: 28px; color: #C9A96E; margin: 0;">LUMIÈRE</h1>
          </div>
          <h2>Reserva Cancelada</h2>
          <p style="color: #94A3B8;">Hola ${data.guestName}, tu reserva en ${data.hotelName} (${data.checkIn} — ${data.checkOut}) ha sido cancelada correctamente.</p>
          <p style="color: #94A3B8;">Si fue un error, puedes realizar una nueva reserva en nuestra web.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('❌ Error sending cancellation email:', error);
  }
}
