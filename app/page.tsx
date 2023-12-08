import Comments from "@/components/comments";
const data = require("data.json")


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 bg-verylightgray w-full">
      <Comments data={data} />
    </main>
  )
}
