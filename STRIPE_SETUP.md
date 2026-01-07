# Stripe Donation Setup Guide

## 🎯 Overview

The RBF Charity website now includes a complete Stripe donation system with:

- ✅ Donation page (`/donate`)
- ✅ Suggested amounts (£25, £50, £100, £250, £500)
- ✅ Custom amount option
- ✅ Donation purpose selection
- ✅ Success page after donation
- ✅ Donation CTAs across the site
- ✅ Secure Stripe Checkout integration

## 🚀 Setup Steps

### Step 1: Create Stripe Account

1. Visit [stripe.com](https://stripe.com) and sign up
2. Complete account verification
3. **For Nonprofits**: Email [email protected] with proof of nonprofit status for discounted fees

### Step 2: Get API Keys

1. Go to **Developers** → **API keys** in Stripe dashboard
2. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)
4. **Important**: Use test keys for development, live keys for production

### Step 3: Configure Environment Variables

Add to your `.env.local` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Base URL (for redirects)
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Change to your domain in production
```

### Step 4: Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/donate`

3. Test with Stripe test card:
   - **Card Number**: `4242 4242 4242 4242`
   - **Expiry**: Any future date (e.g., `12/25`)
   - **CVC**: Any 3 digits (e.g., `123`)
   - **ZIP**: Any 5 digits (e.g., `12345`)

4. Complete the donation flow and verify:
   - ✅ Redirects to Stripe Checkout
   - ✅ Payment processes successfully
   - ✅ Redirects to success page
   - ✅ Receipt sent to email

### Step 5: Go Live

1. Switch to **Live mode** in Stripe dashboard
2. Get your **live** API keys
3. Update `.env.local` with live keys:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
   STRIPE_SECRET_KEY=sk_live_your_live_key
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   ```
4. Deploy to production
5. Test with a real small donation first

## 📍 Donation CTAs Location

Donation buttons have been added to:

- ✅ **Navigation** - "Donate" button (desktop & mobile)
- ✅ **Home Page** - Hero section and CTA section
- ✅ **Support Page** - CTA section
- ✅ **Footer** - Resources section
- ✅ **Donate Page** - Full donation form

## 💰 Suggested Donation Amounts

The donation form includes these preset amounts:

- £25
- £50
- £100
- £250
- £500
- Custom amount (any value)

## 🎨 Donation Purpose Options

Donors can optionally specify:

- General Support
- Bereavement Support
- Get Well Soon
- Milestone Birthday

## 🔒 Security Features

- ✅ Secure Stripe Checkout (PCI compliant)
- ✅ Server-side payment processing
- ✅ No card data stored on your server
- ✅ HTTPS required for production
- ✅ Email receipts automatically sent

## 📧 Email Receipts

Stripe automatically sends:

- ✅ Receipt to donor's email
- ✅ Payment confirmation
- ✅ Transaction details

## 🧪 Testing

### Test Cards

**Successful Payment:**

- Card: `4242 4242 4242 4242`
- Any future expiry, any CVC

**Declined Payment:**

- Card: `4000 0000 0000 0002`
- Any future expiry, any CVC

**Requires Authentication (3D Secure):**

- Card: `4000 0025 0000 3155`
- Any future expiry, any CVC

### Test Scenarios

1. **Minimum Amount**: Test with £1
2. **Custom Amount**: Test with £37.50
3. **Large Amount**: Test with £1000
4. **Purpose Selection**: Test each purpose option
5. **Error Handling**: Test with declined card

## 📊 Monitoring

Monitor donations in Stripe Dashboard:

- **Payments** → View all transactions
- **Customers** → View donor information
- **Analytics** → Track donation trends

## 🔧 Troubleshooting

### "Stripe is not configured"

- Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Restart dev server after adding env variables

### "Failed to create checkout session"

- Check `STRIPE_SECRET_KEY` is set
- Verify API keys are correct
- Check Stripe dashboard for errors

### Payment not processing

- Verify you're using correct test/live keys
- Check Stripe dashboard logs
- Ensure `NEXT_PUBLIC_BASE_URL` is correct

## 📝 Next Steps

After setup:

1. Test donation flow thoroughly
2. Add Stripe webhook (optional - for advanced features)
3. Set up email notifications for new donations
4. Configure Stripe tax settings if needed
5. Set up recurring donations (future enhancement)

## 🔗 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Nonprofit Discount](https://stripe.com/docs/payments/checkout)

---

**Status**: ✅ Implementation Complete - Ready for Stripe Setup
