/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("gallery_items");

  const record0 = new Record(collection);
    record0.set("title", "East Africa Trade Summit 2025");
    record0.set("eventType", "Conferences");
    record0.set("date", "2025-11-15");
    record0.set("imageUrl", "https://images.unsplash.com/photo-1700902894527-c1ef530d814c");
    record0.set("description", "Annual summit bringing together trade leaders from across East Africa");
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
    record1.set("title", "Lagos International Trade Fair");
    record1.set("eventType", "Trade Fairs");
    record1.set("date", "2025-10-20");
    record1.set("imageUrl", "https://images.unsplash.com/photo-1492151032939-34e4455043a8");
    record1.set("description", "Premier trade fair showcasing African business opportunities");
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
    record2.set("title", "Pan-African Business Networking");
    record2.set("eventType", "Networking");
    record2.set("date", "2025-09-12");
    record2.set("imageUrl", "https://images.unsplash.com/photo-1587824923807-3c2dbdf7f6d1");
    record2.set("description", "Exclusive networking event for African trade professionals");
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
    record3.set("title", "Johannesburg Export Exhibition");
    record3.set("eventType", "Exhibitions");
    record3.set("date", "2025-08-30");
    record3.set("imageUrl", "https://images.unsplash.com/photo-1682617367472-e2f2597fe750");
    record3.set("description", "Comprehensive exhibition of African export products");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("title", "West Africa Commerce Conference");
    record4.set("eventType", "Conferences");
    record4.set("date", "2025-07-18");
    record4.set("imageUrl", "https://images.unsplash.com/photo-1638911454048-435c1d821f38");
    record4.set("description", "Strategic conference on West African trade corridors");
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("title", "Cairo Business Expo 2025");
    record5.set("eventType", "Trade Fairs");
    record5.set("date", "2025-06-25");
    record5.set("imageUrl", "https://images.unsplash.com/photo-1572268375263-9a512b32cbef");
    record5.set("description", "Major expo featuring African and international traders");
  try {
    app.save(record5);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record6 = new Record(collection);
    record6.set("title", "Nairobi Trade Leaders Summit");
    record6.set("eventType", "Conferences");
    record6.set("date", "2025-05-14");
    record6.set("imageUrl", "https://images.unsplash.com/photo-1699548006105-a2124c479790");
    record6.set("description", "Summit focused on emerging trade opportunities");
  try {
    app.save(record6);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record7 = new Record(collection);
    record7.set("title", "African Exporters Networking Event");
    record7.set("eventType", "Networking");
    record7.set("date", "2025-04-22");
    record7.set("imageUrl", "https://images.unsplash.com/photo-1470781125250-124de17ebdea");
    record7.set("description", "Networking event connecting exporters and importers");
  try {
    app.save(record7);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record8 = new Record(collection);
    record8.set("title", "Accra International Trade Show");
    record8.set("eventType", "Trade Fairs");
    record8.set("date", "2025-03-10");
    record8.set("imageUrl", "https://images.unsplash.com/photo-1471823753859-b9e1e4583bc6");
    record8.set("description", "Trade show highlighting West African products");
  try {
    app.save(record8);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record9 = new Record(collection);
    record9.set("title", "Regional Business Leaders Forum");
    record9.set("eventType", "Networking");
    record9.set("date", "2025-02-28");
    record9.set("imageUrl", "https://images.unsplash.com/photo-1549045345-058277380fc3");
    record9.set("description", "Forum for discussing regional trade strategies");
  try {
    app.save(record9);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record10 = new Record(collection);
    record10.set("title", "African Market Opportunities Seminar");
    record10.set("eventType", "Conferences");
    record10.set("date", "2025-01-20");
    record10.set("imageUrl", "https://images.unsplash.com/photo-1691886275771-f037ea78f03e");
    record10.set("description", "Seminar on emerging African market opportunities");
  try {
    app.save(record10);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record11 = new Record(collection);
    record11.set("title", "Continental Trade Exhibition");
    record11.set("eventType", "Exhibitions");
    record11.set("date", "2024-12-15");
    record11.set("imageUrl", "https://images.unsplash.com/photo-1691497373354-74e68ddf3a22");
    record11.set("description", "Largest continental exhibition of African trade goods");
  try {
    app.save(record11);
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
