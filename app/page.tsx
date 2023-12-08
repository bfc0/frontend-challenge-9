import Comments from "@/components/comments";
const data = require("data.json")


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:px-24 md:py-12 bg-verylightgray w-full">
      <Comments data={data} />
    </main>
  )
}
