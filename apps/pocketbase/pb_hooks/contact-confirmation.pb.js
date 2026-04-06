/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: e.record.get("email") }],
    subject: "Contact Form Submission Confirmation",
    html: "<h1>Thank you for contacting us!</h1><p>Dear " + e.record.get("name") + ",</p><p>We have received your message and will get back to you as soon as possible. Our team will review your inquiry and respond within 24-48 hours.</p><p><strong>Your Message Details:</strong></p><ul><li><strong>Company:</strong> " + (e.record.get("company") || "Not specified") + "</li><li><strong>Phone:</strong> " + (e.record.get("phone") || "Not specified") + "</li><li><strong>Inquiry Type:</strong> " + (e.record.get("inquiryType") || "General inquiry") + "</li></ul><p>Thank you for reaching out!</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "contacts");