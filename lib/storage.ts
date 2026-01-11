import fs from "fs"
import path from "path"

const dataDir = path.join(process.cwd(), "data")

const eventsFile = path.join(dataDir, "events.json")
const settingsFile = path.join(dataDir, "settings.json")
const aboutFile = path.join(dataDir, "about.json")
const brandFile = path.join(dataDir, "brand.json")
const galleryFile = path.join(dataDir, "gallery.json")
const auditFile = path.join(dataDir, "audit.json")

function ensure(file: string, defaultValue: any) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
  if (!fs.existsSync(file))
    fs.writeFileSync(file, JSON.stringify(defaultValue, null, 2))
}

function log(email: string, action: string, data: any) {
  ensure(auditFile, [])
  const logs = JSON.parse(fs.readFileSync(auditFile, "utf8"))

  logs.unshift({
    time: new Date().toISOString(),
    email,
    action,
    data,
  })

  fs.writeFileSync(auditFile, JSON.stringify(logs.slice(0, 500), null, 2))
}

/* EVENTS */
export function getEvents() {
  ensure(eventsFile, [])
  return JSON.parse(fs.readFileSync(eventsFile, "utf8"))
}

export function saveEvents(events: any[], admin = "system") {
  ensure(eventsFile, [])
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2))
  log(admin, "Updated events", events)
}

/* BRAND */
export function getBrand() {
  ensure(brandFile, {})
  return JSON.parse(fs.readFileSync(brandFile, "utf8"))
}

export function setBrand(data: any, admin = "system") {
  ensure(brandFile, {})
  const updated = { ...getBrand(), ...data }
  fs.writeFileSync(brandFile, JSON.stringify(updated, null, 2))
  log(admin, "Updated brand", data)
}

/* SETTINGS */
export function getSettings() {
  ensure(settingsFile, { color: "#FFE53B" })
  return JSON.parse(fs.readFileSync(settingsFile, "utf8"))
}

export function setColor(color: string, admin = "system") {
  const s = getSettings()
  s.color = color
  fs.writeFileSync(settingsFile, JSON.stringify(s, null, 2))
  log(admin, "Changed theme color", color)
}

/* ABOUT */
export function getAbout() {
  ensure(aboutFile, {})
  return JSON.parse(fs.readFileSync(aboutFile, "utf8"))
}

export function updateAbout(data: any, admin = "system") {
  fs.writeFileSync(aboutFile, JSON.stringify(data, null, 2))
  log(admin, "Updated about", data)
}

/* GALLERY */
export function getGallery() {
  ensure(galleryFile, { link: "" })
  return JSON.parse(fs.readFileSync(galleryFile, "utf8"))
}

export function setGallery(link: string, admin = "system") {
  fs.writeFileSync(galleryFile, JSON.stringify({ link }, null, 2))
  log(admin, "Updated gallery", link)
}

/* AUDIT */
export function getAudit() {
  ensure(auditFile, [])
  return JSON.parse(fs.readFileSync(auditFile, "utf8"))
}
