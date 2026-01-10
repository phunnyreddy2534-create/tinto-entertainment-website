let events: any[] = []
let settings = { color: "#facc15" }

export function getEvents() {
  return events
}

export function addEvent(event: any) {
  events.push(event)
}

export function getSettings() {
  return settings
}

export function setColor(color: string) {
  settings.color = color
}
let about = {
  title: "About Tinto Entertainment",
  description: "We organize premium events and concerts."
}

export function getAbout() {
  return about
}

export function updateAbout(data: any) {
  about = data
}
