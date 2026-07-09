'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/lib/auth/navigation';

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-3 py-5">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition duration-200 ease-out-soft ${
              active
                ? 'bg-white/15 font-medium text-white'
                : 'text-white/75 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-white' : 'bg-white/40'}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto text-sm">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 transition duration-200 ease-out-soft ${
              active ? 'bg-white/20 font-medium text-white' : 'text-white/75 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
