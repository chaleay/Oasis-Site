import Link from "next/link";
import { auth } from "@/app/_lib/auth";

export default async function Navigation() {
  // makes the route dynamic
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                alt={session.user.name}
                className="h-8 rounded-full"
                src={session.user.image}
                referrerPolicy="no-referrer"
              ></img>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
