<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/512px-Pok%C3%A9_Ball_icon.svg.png" width="100" alt="Pokéball">
  
  <h1>🌍 Pokémon GO Events Calendar 📅</h1>
  
  <p><i>A dynamic, auto-updating iCalendar (.ics) that syncs the latest Pokémon GO global events straight to your native calendar apps.</i></p>

  ![Format: iCal](https://img.shields.io/badge/Format-iCal-blue?style=flat-square&logo=icloud)
  ![Game: Pokémon GO](https://img.shields.io/badge/Game-Pokémon%20GO-red?style=flat-square)
  ![Sync: Real-time](https://img.shields.io/badge/Sync-Real--time-brightgreen?style=flat-square)
</div>

---

## 🔗 Subscription Link

Copy the URL below to subscribe to the events from any modern calendar application:

```text
https://JairEsk.github.io/go-calendar/go_events.ics
```

---

## 📱 How to Subscribe

### 🍎 iOS (iPhone / iPad)
1. Go to **Settings** > **Calendar** > **Accounts**.
2. Tap **Add Account** > **Other**.
3. Tap **Add Subscribed Calendar**.
4. Paste the URL above and tap **Next**, then **Save**.

### 💻 Windows Outlook
1. Open the Outlook Calendar app.
2. Click on **Add Calendar** in the left sidebar.
3. Select **Subscribe from web**.
4. Paste the URL, give it a name (e.g., *GO Events*), pick a color, and click **Import/Save**.

### 🌐 Google Calendar
1. Open [Google Calendar](https://calendar.google.com/) on the web.
2. On the left panel, next to "Other calendars", click the **`+`** icon.
3. Select **From URL**.
4. Paste the URL and click **Add calendar**.

---

## 🛠️ For the Maintainer: How to add new events

This calendar is completely programmatic. You don't need to write `.ics` code manually!

1. Open the `events.json` file.
2. Add a new event using the following structure:
   ```json
   {
     "title": "Event Name",
     "start": "YYYY-MM-DD HH:mm",
     "end": "YYYY-MM-DD HH:mm",
     "description": "Details about the event (spawns, raid bosses, bonuses)."
   }
   ```
3. Run the generator script in your terminal:
   ```bash
   node generate.js
   ```
4. Commit and push the changes to GitHub. The GitHub Pages server will automatically update the `.ics` file for all subscribed devices!

---
<div align="center">
  <i>Gotta catch 'em all! ⚡</i>
</div>
