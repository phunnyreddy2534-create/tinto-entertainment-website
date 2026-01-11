import fs from "fs"
import path from "path"

const baseDir = process.env.VERCEL
  ? "/tmp/tinto-data"
  : path.join(process.cwd(), "data")

const dataDir = baseDir
const eventsFile = path.join(dataDir, "events.json")
const settingsFile = path.join(dataDir, "settings.json")
const aboutFile = path.join(dataDir, "about.json")
const brandFile = path.join(dataDir, "brand.json")
const galleryFile = path.join(dataDir, "gallery.json")

function ensureFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

  if (!fs.existsSync(eventsFile)) fs.writeFileSync(eventsFile, "[]")

  if (!fs.existsSync(settingsFile))
    fs.writeFileSync(settingsFile, JSON.stringify({ color: "#FFE53B" }, null, 2))

  if (!fs.existsSync(aboutFile))
    fs.writeFileSync(
      aboutFile,
      JSON.stringify(
        {
          title: "About Tinto Entertainment",
          description: "We organize premium events and concerts.",
        },
        null,
        2
      )
    )

  if (!fs.existsSync(brandFile))
    fs.writeFileSync(
      brandFile,
      JSON.stringify(
        {
          primary: "#FFE53B",
          accent: "#FF005B",
          glow: 0.8,
          background: "linear-gradient(120deg,#FFE53B,#FF005B)",
          text: "#ffffff",
          logo: "/logo.png",
        },
        null,
        2
      )
    )

  if (!fs.existsSync(galleryFile))
    fs.writeFileSync(galleryFile, JSON.stringify({ link: "" }, null, 2))
}

/* ================= EVENTS ================= */

export function getEvents() {
  ensureFiles()
  return JSON.parse(fs.readFileSync(eventsFile, "utf8"))
}

export function saveEvents(events: any[]) {
  ensureFiles()
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2))
}

/* ================= BRAND ================= */

export function getBrand() {
  ensureFiles()
  return JSON.parse(fs.readFileSync(brandFile, "utf8"))
}

export function setBrand(data: any) {
  ensureFiles()
  const brand = getBrand()
  const updated = { ...brand, ...data }
  fs.writeFileSync(brandFile, JSON.stringify(updated, null, 2))
}

/* ================= SETTINGS ================= */

export function getSettings() {
  ensureFiles()
  return JSON.parse(fs.readFileSync(settingsFile, "utf8"))
}

export function setColor(color: string) {
  ensureFiles()
  const settings = getSettings()
  settings.color = color
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2))
}

/* ================= ABOUT ================= */

export function getAbout() {
  ensureFiles()
  return JSON.parse(fs.readFileSync(aboutFile, "utf8"))
}

export function updateAbout(data: any) {
  ensureFiles()
  fs.writeFileSync(aboutFile, JSON.stringify(data, null, 2))
}

/* ================= GALLERY ================= */

export function getGallery() {
  ensureFiles()
  return JSON.parse(fs.readFileSync(galleryFile, "utf8"))
}

export function setGallery(link: string) {
  ensureFiles()
  fs.writeFileSync(galleryFile, JSON.stringify({ link }, null, 2))
}


trigger vercel rebuild
