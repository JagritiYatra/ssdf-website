import Link from "next/link";
import Button from "@/components/ui/Button";
import { Home, Rocket } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-navy-50">
      <div className="text-center px-4">
        <Rocket className="mx-auto mb-6 text-golden-400" size={64} />
        <h1 className="text-6xl font-extrabold text-navy-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-navy-600 mb-2">
          Page Not Found
        </h2>
        <p className="text-navy-500 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for seems to have launched into orbit.
          Let&apos;s get you back on track.
        </p>
        <Link href="/">
          <Button size="lg">
            <Home className="mr-2" size={18} /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
