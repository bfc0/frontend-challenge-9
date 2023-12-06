import Comments from "@/components/comments";
const data = require("data.json")


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-verylightgray">
      <Comments data={data} />
    </main>
  )
}
