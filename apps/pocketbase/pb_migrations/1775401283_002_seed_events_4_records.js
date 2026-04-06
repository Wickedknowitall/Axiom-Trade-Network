/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("events");

  const record0 = new Record(collection);
    record0.set("eventName", "Pan-African Trade Summit 2026");
    record0.set("description", "Leading business leaders discuss trade opportunities across Africa");
    record0.set("date", "2026-06-15");
    record0.set("location", "Lagos, Nigeria");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("eventName", "East Africa Export Fair");
    record1.set("description", "Showcase products and services to East African markets");
    record1.set("date", "2026-07-20");
    record1.set("location", "Nairobi, Kenya");
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("eventName", "West Africa Business Forum");
    record2.set("description", "Networking and partnership opportunities in West Africa");
    record2.set("date", "2026-08-10");
    record2.set("location", "Accra, Ghana");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("eventName", "Southern Africa Trade Mission");
    record3.set("description", "Market entry strategies for Southern African region");
    record3.set("date", "2026-09-05");
    record3.set("location", "Johannesburg, South Africa");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
