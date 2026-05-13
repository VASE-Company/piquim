import React from 'react';
import { navigate } from '../../utils/navigation';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function PiquimHeader({
  logoUrl = '/piquim/piquimlogo.png',
  navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogos', href: '/catalog' },
    { label: 'Nosotros', href: '/about' },
  ],
}) {
  const { cartCount } = useStore();
  const { user } = useAuth();

  return (
    <div className="bg-[#fffaf6] border-b border-[#e8dfd8] flex flex-col items-center justify-center px-[60px] py-[18px] w-full">
      <div
        className="flex items-center justify-between w-full px-[60px] py-[18px] rounded-[30px] border border-[#e8dfd8]"
        style={{ background: 'rgba(255,191,140,0.6)' }}
      >
        {/* Logo */}
        <button onClick={() => navigate('/')} className="shrink-0" style={{ height: 31, width: 108 }}>
          <img src={logoUrl} alt="Piquim" className="h-full w-full object-contain" />
        </button>

        {/* Nav links */}
        <nav className="flex gap-8 items-center flex-1 justify-center">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="text-[#1a1614] text-[14px] whitespace-nowrap hover:text-[#ff4d00] transition-colors"
              style={{ fontFamily: 'Helvetica Neue, sans-serif', fontWeight: 500 }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action icons + register */}
        <div className="flex items-center gap-[14px] shrink-0">
          <button className="text-[#1a1614] hover:text-[#ff4d00] transition-colors" aria-label="Buscar">
            <SearchIcon />
          </button>
          <button className="text-[#1a1614] hover:text-[#ff4d00] transition-colors" aria-label="Guardados">
            <BookmarkIcon />
          </button>
          <button
            className="relative text-[#1a1614] hover:text-[#ff4d00] transition-colors"
            onClick={() => navigate('/cart')}
            aria-label="Carrito"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff4d00] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => navigate(user ? '/profile' : '/signup')}
            className="flex items-center justify-center bg-[#ff4d00] rounded-full text-[#fffaf6] text-[14px] whitespace-nowrap hover:bg-[#e04400] transition-colors"
            style={{
              fontFamily: 'Gilroy, sans-serif',
              fontWeight: 700,
              height: 24,
              width: 100,
            }}
          >
            {user ? 'Mi cuenta' : 'Registrarse'}
          </button>
        </div>
      </div>
    </div>
  );
}
