import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const eventsFile = path.join(dataDir, "events.json");
const settingsFile = path.join(dataDir, "settings.json");
const aboutFile = path.join(dataDir, "about.json");

function ensureFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  if (!fs.existsSync(eventsFile)) fs.writeFileSync(eventsFile, "[]");
  if (!fs.existsSync(settingsFile))
    fs.writeFileSync(settingsFile, JSON.stringify({ color: "#FFE53B" }));
  if (!fs.existsSync(aboutFile))
    fs.writeFileSync(
      aboutFile,
      JSON.stringify({
        title: "About Tinto Entertainment",
        description: "We organize premium events and concerts.",
      })
    );
}

/* ================= EVENTS ================= */

export function getEvents() {
  ensureFiles();
  return JSON.parse(fs.readFileSync(eventsFile, "utf8"));
}

export function saveEvents(events: any[]) {
  ensureFiles();
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
}

/* ================= BRAND ================= */

export function getSettings() {
  ensureFiles();
  return JSON.parse(fs.readFileSync(settingsFile, "utf8"));
}

export function setColor(color: string) {
  ensureFiles();
  const settings = getSettings();
  settings.color = color;
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
}

/* ================= ABOUT ================= */

export function getAbout() {
  ensureFiles();
  return JSON.parse(fs.readFileSync(aboutFile, "utf8"));
}

export function updateAbout(data: any) {
  ensureFiles();
  fs.writeFileSync(aboutFile, JSON.stringify(data, null, 2));
}
