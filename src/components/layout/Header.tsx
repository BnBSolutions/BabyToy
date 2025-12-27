import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, ChevronDown, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: t.nav.shop,
      href: '/shop',
      submenu: [
        { label: t.nav.newArrivals, href: '/shop?filter=new' },
        { label: t.nav.bestSellers, href: '/shop?filter=bestseller' },
        { label: t.nav.comforters, href: '/shop/comforters' },
        { label: t.nav.plushToys, href: '/shop/plush' },
        { label: t.nav.puppets, href: '/shop/puppets' },
        { label: t.nav.musicBoxes, href: '/shop/music-boxes' },
      ],
    },
    { label: t.nav.collections, href: '/collections' },
    { label: t.nav.gifts, href: '/gifts' },
    { label: t.nav.brand, href: '/about' },
    { label: t.nav.help, href: '/help' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-lg shadow-soft'
            : 'bg-background'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <MobileMenu 
                  navItems={navItems} 
                  onClose={() => setIsMobileMenuOpen(false)} 
                />
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2"
            >
              <span className="font-display text-2xl lg:text-3xl font-semibold text-foreground">
                Doudou
              </span>
              <span className="font-display text-lg lg:text-xl text-primary font-medium">
                & Compagnie
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                item.submenu ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="nav-link flex items-center gap-1 text-sm font-medium">
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="center" 
                      className="w-48 bg-popover border border-border shadow-medium"
                    >
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.label} asChild>
                          <Link
                            to={subItem.href}
                            className="w-full cursor-pointer"
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`nav-link text-sm font-medium ${isActive(item.href) ? 'active text-foreground' : ''}`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <Search className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hidden lg:flex"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>

              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

// Mobile Menu Component
interface MobileMenuProps {
  navItems: { label: string; href: string; submenu?: { label: string; href: string }[] }[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, onClose }) => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-semibold">Menu</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.nav.search}
              className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${expandedItem === item.label ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {expandedItem === item.label && (
                    <div className="ml-4 space-y-1 animate-fade-in">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          onClick={onClose}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={onClose}
                  className="block px-3 py-3 rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Theme</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="gap-2"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-4 w-4" />
                Dark
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                Light
              </>
            )}
          </Button>
        </div>
        <LanguageSwitcher isMobile />
      </div>
    </div>
  );
};

export default Header;
