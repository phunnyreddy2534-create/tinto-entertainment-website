"use client";
import { useState } from "react";

export default function GalleryAdmin() {
  const [link, setLink] = useState("");

  async function save() {
    await fetch("/api/gallery", {
      method: "POST",
      body: JSON.stringify({ link }),
    });
    alert("Saved");
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Gallery Drive Link</h2>
      <input
        style={{ padding: 10, width: 400 }}
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Paste Google Drive Link"
      />
      <button onClick={save}>Save</button>
    </div>
  );
}
