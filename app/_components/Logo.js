import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image quality={90} height="60" width="60" src={logo} alt="Solace logo" />
      <span className="text-xl font-semibold text-primary-100">Solace</span>
    </Link>
  );
}

export default Logo;
