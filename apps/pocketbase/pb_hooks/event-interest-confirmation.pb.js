/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: e.record.get("email") }],
    subject: "Event Interest Registration Confirmation",
    html: "<h1>Thank you for your event interest registration!</h1><p>Dear " + e.record.get("fullName") + ",</p><p>We have received your interest in our upcoming events. We will keep you updated with relevant event information and opportunities.</p><p><strong>Registration Details:</strong></p><ul><li><strong>Company:</strong> " + e.record.get("companyName") + "</li><li><strong>Phone:</strong> " + e.record.get("phoneNumber") + "</li><li><strong>Event Interest:</strong> " + (e.record.get("eventName") || "General events") + "</li><li><strong>Attendees:</strong> " + (e.record.get("numberOfAttendees") || "Not specified") + "</li></ul><p>We look forward to seeing you at our events!</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "event_interests");