import fs from "fs"
import path from "path"

/* ================= VERCEL SAFE STORAGE ================= */

const baseDir =
  process.env.VERCEL === "1"
    ? "/tmp/tinto-data"
    : path.join(process.cwd(), "data")

const eventsFile = path.join(baseDir, "events.json")
const settingsFile = path.join(baseDir, "settings.json")
const aboutFile = path.join(baseDir, "about.json")
const brandFile = path.join(baseDir, "brand.json")
const galleryFile = path.join(baseDir, "gallery.json")
const auditFile = path.join(baseDir, "audit.json")

/* ================= CORE SAFE IO ================= */

function safeRead(file: string, fallback: any) {
  try {
    if (!fs.existsSync(file)) return fallback
    const raw = fs.readFileSync(file, "utf8")
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function safeWrite(file: string, data: any) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  } catch {}
}

function ensureFiles() {
  try {
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true })

    if (!fs.existsSync(eventsFile)) safeWrite(eventsFile, [])
    if (!fs.existsSync(settingsFile)) safeWrite(settingsFile, { color: "#FFE53B" })
    if (!fs.existsSync(aboutFile))
      safeWrite(aboutFile, {
        title: "About Tinto Entertainment",
        description: "We organize premium events and concerts.",
      })
    if (!fs.existsSync(brandFile))
      safeWrite(brandFile, {
        primary: "#FFE53B",
        accent: "#FF005B",
        glow: 0.8,
        background: "linear-gradient(120deg,#FFE53B,#FF005B)",
        text: "#ffffff",
        logo: "/logo.png",
      })
    if (!fs.existsSync(galleryFile)) safeWrite(galleryFile, { link: "" })
    if (!fs.existsSync(auditFile)) safeWrite(auditFile, [])
  } catch {}
}

/* ================= EVENTS ================= */

export function getEvents() {
  ensureFiles()
  return safeRead(eventsFile, [])
}

export function saveEvents(events: any[]) {
  ensureFiles()
  safeWrite(eventsFile, events)
}

/* ================= BRAND ================= */

export function getBrand() {
  ensureFiles()
  return safeRead(brandFile, {})
}

export function setBrand(data: any) {
  ensureFiles()
  const updated = { ...getBrand(), ...data }
  safeWrite(brandFile, updated)
}

/* ================= SETTINGS ================= */

export function getSettings() {
  ensureFiles()
  return safeRead(settingsFile, { color: "#FFE53B" })
}

export function setColor(color: string) {
  ensureFiles()
  safeWrite(settingsFile, { color })
}

/* ================= ABOUT ================= */

export function getAbout() {
  ensureFiles()
  return safeRead(aboutFile, {})
}

export function updateAbout(data: any) {
  ensureFiles()
  safeWrite(aboutFile, data)
}

/* ================= GALLERY ================= */

export function getGallery() {
  ensureFiles()
  return safeRead(galleryFile, { link: "" })
}

export function setGallery(link: string) {
  ensureFiles()
  safeWrite(galleryFile, { link })
}

/* ================= AUDIT ================= */

export function getAudit() {
  ensureFiles()
  return safeRead(auditFile, [])
}

export function addAudit(entry: any) {
  ensureFiles()
  const logs = getAudit()
  logs.unshift(entry)
  safeWrite(auditFile, logs)
}
