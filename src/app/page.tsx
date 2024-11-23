import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Link href="/toggles">
        <Button variant="outline" size="lg">
          Toggles
        </Button>
      </Link>
    </main>
  )
}