# Contact Form Setup Guide

## Features Implemented

✅ **Form Validation**
- Empty field validation for Name, Email, and "How can we help?" fields
- Email format validation using regex
- Real-time error clearing when user starts typing
- Error messages displayed below each field

✅ **Email Sending**
- Emails sent to: `aravindhant200@gmail.com(change with company email)`
- Subject: `Business enquiry from: [Customer Name]`
- Body: Contains the "How can we help?" field value
- Uses EmailJS service for reliable email delivery

✅ **User Experience**
- Success message displayed after email is sent
- Loading state on submit button ("Sending..." text)
- Error handling with user-friendly messages

---

## Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up Free"
3. Create an account (you can use Gmail to sign up quickly)

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **"Create New Service"**
3. Choose **Gmail** (or your preferred email provider)
4. Follow the setup wizard:
   - Select "Use my own email address"
   - Enter the email address you want to send FROM
   - Authorize the connection with your email account
5. Save and note your **Service ID** (looks like: `service_xxxxxx`)

### Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **"Create New Template"**
3. Set up the template:
   - **Template Name**: `contact_form` (or your preferred name)
   - **Subject**: `{{subject}}`
   - **Body**: Use this template:
   ```
   From: {{from_name}} ({{from_email}})
   Company: {{company}}
   
   Message:
   {{message}}
   ```
4. Save the template and note your **Template ID** (looks like: `template_xxxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account** settings in EmailJS
2. Find your **Public Key** (looks like: `pk_xxxxxxxxxxxxxx`)

### Step 5: Update Contact.jsx

Replace the placeholders in `/src/pages/Contact.jsx`:

```javascript
// Line 19: Replace with your Public Key
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");  // Replace with actual key

// Line 64: Replace with your Service ID
await emailjs.send(
  "YOUR_SERVICE_ID",    // Replace with actual Service ID
  "YOUR_TEMPLATE_ID",   // Replace with actual Template ID
  {
    to_email: "aravindhant200@gmail.com",
    // ... rest of the code
  }
);
```

**Example:**
```javascript
emailjs.init("pk_test_abc123xyz");

await emailjs.send(
  "service_abc123xyz",
  "template_abc123xyz",
  {
    to_email: "aravindhant200@gmail.com",
    // ...
  }
);
```

### Step 6: Test the Form

1. Start the dev server: `npm run dev`
2. Navigate to the Contact page
3. Try submitting with empty fields - validation errors should appear
4. Fill all required fields with valid data
5. Click "Send Message" - you should see a success message
6. Check your email at `aravindhant200@gmail.com` to confirm receipt

---

## Validation Rules

| Field | Validation |
|-------|-----------|
| **Name** | Required, must not be empty |
| **Email** | Required, must be valid email format (user@domain.com) |
| **Company** | Optional |
| **How can we help?** | Required, must not be empty |

---

## Email Information

- **Recipient Email**: aravindhant200@gmail.com
- **Email Subject Format**: "Business enquiry from: [Customer Name]"
- **Email Body**: Contains the customer's message from "How can we help?" field
- **Sender Name**: Customer's name (from Name field)
- **Sender Email**: Customer's email (from Email field)

---

## Troubleshooting

**Issue**: "Failed to send message" error
- Check that your Service ID and Template ID are correct
- Verify your EmailJS Public Key is correct
- Ensure Gmail service is properly authorized in EmailJS

**Issue**: Validation messages not appearing
- Clear browser cache and reload
- Check browser console for any JavaScript errors

**Issue**: Email not received
- Check spam folder in Gmail
- Verify the recipient email is correct: aravindhant200@gmail.com
- Check EmailJS dashboard for failed sending logs

---

## Security Notes

- Your public key is safe to expose in frontend code (it's meant to be public)
- If you need to limit emails or add rate limiting, configure it in EmailJS dashboard
- Never put your EmailJS private key in frontend code

---

For more help, visit: https://www.emailjs.com/docs/
