import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <h1 className="text-2xl font-bold">Hello World From Home</h1>

      <Button asChild>
        <Link href="/platform">Platform</Link>
      </Button>
    </div>
  )
}
