/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: e.record.get("email") }],
    subject: "Consultation Request Confirmation",
    html: "<h1>Thank you for your consultation request!</h1><p>Dear " + e.record.get("fullName") + ",</p><p>We have received your consultation request and will review your details shortly. Our team will contact you soon to schedule your consultation.</p><p><strong>Request Details:</strong></p><ul><li><strong>Company:</strong> " + e.record.get("companyName") + "</li><li><strong>Phone:</strong> " + e.record.get("phoneNumber") + "</li><li><strong>Preferred Date:</strong> " + (e.record.get("preferredConsultationDate") || "Not specified") + "</li></ul><p>Thank you for choosing us!</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "consultations");