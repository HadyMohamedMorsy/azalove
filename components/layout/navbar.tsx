import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { CartDropdown } from "./navbar/cart-dropdown";
import { FavoritesDropdown } from "./navbar/favorites-dropdown";
import { NavigationLinks } from "./navbar/navigation-links";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Azalove</h1>
          </div>

          {/* Navigation Links */}
          <NavigationLinks />

          <div className="flex items-center gap-4">
            <FavoritesDropdown />
            <CartDropdown />

            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
