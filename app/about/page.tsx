export default async function About() {
  const res = await fetch("https://tinto-entertainment.vercel.app/api/about", { cache: "no-store" })
  const data = await res.json()

  return (
    <main style={{ padding: 20 }}>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </main>
  )
}
