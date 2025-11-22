import { formatPrice, formatDate } from '@/lib/utils'

export interface BookingConfirmationEmailData {
  clientName: string
  appointmentDate: string
  appointmentTime: string
  address: string
}

export function bookingConfirmationEmail(data: BookingConfirmationEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #fdfcfb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fdfcfb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a2332 0%, #334e68 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Premium House Cleaning</h1>
              <p style="margin: 10px 0 0; color: #d9e2ec; font-size: 14px;">Your Estimate is Scheduled</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1a2332; font-size: 24px; font-weight: 600;">Thank You, ${data.clientName}!</h2>

              <p style="margin: 0 0 20px; color: #334e68; font-size: 16px; line-height: 1.6;">
                We're delighted that you've chosen our premium cleaning service. Your free in-home estimate has been scheduled.
              </p>

              <div style="background-color: #faf8f5; border-left: 4px solid #c9a04a; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 15px; color: #1a2332; font-size: 18px; font-weight: 600;">Appointment Details</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 8px 0; color: #627d98; font-size: 14px; font-weight: 600;">Date:</td>
                    <td style="padding: 8px 0; color: #1a2332; font-size: 14px; text-align: right;">${data.appointmentDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #627d98; font-size: 14px; font-weight: 600;">Time:</td>
                    <td style="padding: 8px 0; color: #1a2332; font-size: 14px; text-align: right;">${data.appointmentTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #627d98; font-size: 14px; font-weight: 600;">Location:</td>
                    <td style="padding: 8px 0; color: #1a2332; font-size: 14px; text-align: right;">${data.address}</td>
                  </tr>
                </table>
              </div>

              <p style="margin: 0 0 20px; color: #334e68; font-size: 16px; line-height: 1.6;">
                Our professional team member will visit your home to provide a personalized quote based on your specific needs.
              </p>

              <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h4 style="margin: 0 0 10px; color: #1a2332; font-size: 16px; font-weight: 600;">What to Expect:</h4>
                <ul style="margin: 0; padding-left: 20px; color: #334e68; font-size: 14px; line-height: 1.8;">
                  <li>Walk-through of your home</li>
                  <li>Discussion of your cleaning preferences</li>
                  <li>Custom pricing based on your needs</li>
                  <li>Flexible scheduling options</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 30px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 10px; color: #627d98; font-size: 14px;">Questions? We're here to help!</p>
              <p style="margin: 0; color: #1a2332; font-size: 14px; font-weight: 600;">support@premiumcleaning.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export interface QuoteEmailData {
  clientName: string
  quoteId: string
  oneTimePrice: number
  monthlyPrice: number
  twiceMonthlyPrice: number
  quoteUrl: string
}

export function quoteEmail(data: QuoteEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Personalized Quote</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #fdfcfb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fdfcfb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #c9a04a 0%, #b8892d 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Your Personalized Quote is Ready!</h1>
              <p style="margin: 10px 0 0; color: #faf6ed; font-size: 14px;">Exclusive pricing just for you</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1a2332; font-size: 24px; font-weight: 600;">Hello ${data.clientName},</h2>

              <p style="margin: 0 0 30px; color: #334e68; font-size: 16px; line-height: 1.6;">
                Thank you for considering our premium cleaning service. Based on our visit to your home, we've prepared a customized quote tailored to your needs.
              </p>

              <!-- Pricing Cards -->
              <div style="margin: 30px 0;">
                <!-- One-time -->
                <div style="background-color: #faf8f5; border: 2px solid #ebe5d9; padding: 20px; margin-bottom: 15px; border-radius: 8px;">
                  <h3 style="margin: 0 0 10px; color: #1a2332; font-size: 18px; font-weight: 600;">One-Time Service</h3>
                  <p style="margin: 0 0 15px; color: #627d98; font-size: 14px;">Perfect for special occasions or deep cleaning</p>
                  <p style="margin: 0; color: #c9a04a; font-size: 32px; font-weight: 700;">${formatPrice(data.oneTimePrice)}</p>
                </div>

                <!-- Monthly -->
                <div style="background: linear-gradient(135deg, #faf8f5 0%, #f5f1ea 100%); border: 2px solid #c9a04a; padding: 20px; margin-bottom: 15px; border-radius: 8px; position: relative;">
                  <div style="position: absolute; top: -12px; right: 20px; background-color: #c9a04a; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">POPULAR</div>
                  <h3 style="margin: 0 0 10px; color: #1a2332; font-size: 18px; font-weight: 600;">Monthly Service</h3>
                  <p style="margin: 0 0 15px; color: #627d98; font-size: 14px;">Save 10% with monthly cleaning</p>
                  <p style="margin: 0; color: #c9a04a; font-size: 32px; font-weight: 700;">${formatPrice(data.monthlyPrice)}<span style="font-size: 16px; color: #627d98;">/month</span></p>
                </div>

                <!-- Twice Monthly -->
                <div style="background-color: #faf8f5; border: 2px solid #ebe5d9; padding: 20px; border-radius: 8px;">
                  <h3 style="margin: 0 0 10px; color: #1a2332; font-size: 18px; font-weight: 600;">Twice-Monthly Service</h3>
                  <p style="margin: 0 0 15px; color: #627d98; font-size: 14px;">Best value - Save 15% with bi-weekly cleaning</p>
                  <p style="margin: 0; color: #c9a04a; font-size: 32px; font-weight: 700;">${formatPrice(data.twiceMonthlyPrice)}<span style="font-size: 16px; color: #627d98;">/month</span></p>
                </div>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${data.quoteUrl}" style="display: inline-block; background: linear-gradient(135deg, #c9a04a 0%, #b8892d 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(201, 160, 74, 0.3);">
                  View Full Quote & Accept
                </a>
              </div>

              <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h4 style="margin: 0 0 10px; color: #1a2332; font-size: 16px; font-weight: 600;">What's Included:</h4>
                <ul style="margin: 0; padding-left: 20px; color: #334e68; font-size: 14px; line-height: 1.8;">
                  <li>Professional, background-checked cleaners</li>
                  <li>Premium eco-friendly products</li>
                  <li>100% satisfaction guarantee</li>
                  <li>Flexible rescheduling</li>
                  <li>Fully insured service</li>
                </ul>
              </div>

              <p style="margin: 0; color: #627d98; font-size: 14px; font-style: italic; text-align: center;">
                This quote is valid for 7 days
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 30px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 10px; color: #627d98; font-size: 14px;">Questions about your quote?</p>
              <p style="margin: 0; color: #1a2332; font-size: 14px; font-weight: 600;">support@premiumcleaning.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export interface PaymentConfirmationEmailData {
  clientName: string
  amount: number
  frequency: string
  nextServiceDate: string
  address: string
}

export function paymentConfirmationEmail(data: PaymentConfirmationEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #fdfcfb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fdfcfb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2d7f5e 0%, #3da574 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
              <div style="background-color: #ffffff; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #3da574; font-size: 36px;">✓</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Payment Confirmed!</h1>
              <p style="margin: 10px 0 0; color: #e8f5f1; font-size: 14px;">Welcome to Premium House Cleaning</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1a2332; font-size: 24px; font-weight: 600;">Thank You, ${data.clientName}!</h2>

              <p style="margin: 0 0 30px; color: #334e68; font-size: 16px; line-height: 1.6;">
                Your payment has been successfully processed. We're excited to help you maintain a beautiful, spotless home.
              </p>

              <!-- Payment Summary -->
              <div style="background-color: #faf8f5; border-left: 4px solid #3da574; padding: 25px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 20px; color: #1a2332; font-size: 18px; font-weight: 600;">Payment Summary</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; color: #627d98; font-size: 14px; font-weight: 600;">Amount Paid:</td>
                    <td style="padding: 10px 0; color: #1a2332; font-size: 18px; font-weight: 700; text-align: right;">${formatPrice(data.amount)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #627d98; font-size: 14px; font-weight: 600;">Service Plan:</td>
                    <td style="padding: 10px 0; color: #1a2332; font-size: 14px; text-align: right;">${data.frequency}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #627d98; font-size: 14px; font-weight: 600;">Next Service:</td>
                    <td style="padding: 10px 0; color: #1a2332; font-size: 14px; text-align: right;">${data.nextServiceDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #627d98; font-size: 14px; font-weight: 600;">Service Address:</td>
                    <td style="padding: 10px 0; color: #1a2332; font-size: 14px; text-align: right;">${data.address}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h4 style="margin: 0 0 15px; color: #1a2332; font-size: 16px; font-weight: 600;">What Happens Next?</h4>
                <ol style="margin: 0; padding-left: 20px; color: #334e68; font-size: 14px; line-height: 1.8;">
                  <li>You'll receive an SMS reminder 24 hours before your service</li>
                  <li>Our professional cleaner will arrive at the scheduled time</li>
                  <li>They'll complete a thorough cleaning of your home</li>
                  <li>Enjoy your spotless, refreshed space!</li>
                </ol>
              </div>

              <div style="background: linear-gradient(135deg, #faf6ed 0%, #f4ead5 100%); border: 2px solid #c9a04a; padding: 20px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #1a2332; font-size: 16px; font-weight: 600;">100% Satisfaction Guarantee</p>
                <p style="margin: 10px 0 0; color: #627d98; font-size: 14px;">If you're not completely satisfied, we'll make it right - for free.</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 30px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 10px; color: #627d98; font-size: 14px;">Need to reschedule or have questions?</p>
              <p style="margin: 0; color: #1a2332; font-size: 14px; font-weight: 600;">support@premiumcleaning.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
