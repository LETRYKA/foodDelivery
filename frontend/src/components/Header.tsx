import { Bell, MapPin, ShoppingBasket, UserRound } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full px-10  md:px-36 py-5 flex flex-row justify-between">
      <div className="flex justify-center items-center">
        <p className="text-2xl font-medium">
          Uber<strong className="text-[var(--primary)]">Eats</strong>
        </p>
      </div>
      <p className="hidden md:flex text-sm font-medium bg-[var(--background)] text-[var(--foreground)] py-2 px-5 rounded-full cursor-pointer justify-center items-center gap-2">
        <MapPin width={16} className="stroke-[var(--primary)]" /> 3517
        Washington Ave
      </p>
      <div className="flex justify-center items-center gap-2">
        <p className="h-10 w-auto aspect-square bg-[var(--foreground)] text-[var(--background)] rounded-full cursor-pointer flex justify-center items-center">
          <Bell width={15} />
        </p>
        <p className="h-10 w-auto aspect-square bg-[var(--foreground)] text-[var(--background)] rounded-full cursor-pointer flex justify-center items-center">
          <ShoppingBasket width={15} />
        </p>
        <Link href="/auth/sign-in">
          <p className="text-sm font-medium bg-[var(--foreground)] text-[var(--background)] py-2 px-5 rounded-full cursor-pointer flex justify-center items-center gap-2">
            <UserRound width={15} /> Login
          </p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
