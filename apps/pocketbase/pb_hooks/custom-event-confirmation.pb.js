/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: e.record.get("email") }],
    subject: "Custom Event Request Confirmation",
    html: "<h1>Thank you for your custom event request!</h1><p>Dear " + e.record.get("fullName") + ",</p><p>We have received your custom event request and will review your requirements. Our events team will contact you shortly to discuss your event details and provide a proposal.</p><p><strong>Event Details:</strong></p><ul><li><strong>Company:</strong> " + e.record.get("companyName") + "</li><li><strong>Phone:</strong> " + e.record.get("phoneNumber") + "</li><li><strong>Event Type:</strong> " + (e.record.get("eventType") || "Not specified") + "</li><li><strong>Expected Participants:</strong> " + (e.record.get("expectedParticipants") || "Not specified") + "</li><li><strong>Preferred Location:</strong> " + (e.record.get("preferredLocation") || "Not specified") + "</li></ul><p>We look forward to creating an amazing event for you!</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "custom_events");