"use client";
import { useState } from "react";

export default function GalleryAdmin() {
  const [link, setLink] = useState("");
  const [msg, setMsg] = useState("");

  async function save() {
    await fetch("/api/gallery", {
      method: "POST",
      body: JSON.stringify({ link }),
    });
    setMsg("Saved!");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Gallery</h1>
      <p>Paste Google Drive folder link:</p>

      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <button onClick={save}>Save</button>
      <p>{msg}</p>
    </div>
  );
}
