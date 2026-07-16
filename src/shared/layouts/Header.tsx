"use client";

import {
  BackpackIcon,
  Cross2Icon,
  HamburgerMenuIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

import { Button, Input } from "@/shared/components";
import { Container } from "./Container";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="bg-foreground px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        Free delivery on thoughtful tech over $75.
      </div>
      <Container className="flex h-18 items-center gap-4">
        <Link
          href="/"
          aria-label="Orbital home"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-[-0.06em]"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-primary-bright text-sm text-white">o</span>
          orbital<span className="text-primary-bright">.</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex" aria-label="Primary navigation">
          <Link className="text-foreground" href="/shop">Shop</Link>
          <Link className="hover:text-foreground" href="/#collections">Collections</Link>
          <Link className="hover:text-foreground" href="/#deals">Deals</Link>
          <Link className="hover:text-foreground" href="/#about">About</Link>
        </nav>
        <form action="/shop" className="relative ml-auto hidden max-w-sm flex-1 md:block">
          <label className="sr-only" htmlFor="header-search">Search products</label>
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input id="header-search" name="q" placeholder="Search devices, gear, and more" className="rounded-full bg-slate-100 pl-10 shadow-none" />
        </form>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link aria-label="Wishlist" href="/shop" className="hidden rounded-full p-3 text-slate-600 hover:bg-slate-100 sm:inline-flex">
            <HeartIcon className="size-5" />
          </Link>
          <Link aria-label="Shopping bag" href="/shop" className="rounded-full p-3 text-slate-600 hover:bg-slate-100">
            <BackpackIcon className="size-5" />
          </Link>
          <span className="hidden sm:block">
            <Button variant="dark" className="h-10 min-h-10 px-4">
              <PersonIcon /> Sign in
            </Button>
          </span>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-full text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            {menuOpen ? <Cross2Icon className="size-5" /> : <HamburgerMenuIcon className="size-5" />}
          </button>
        </div>
      </Container>
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden">
          <nav className="grid gap-4 text-sm font-medium text-slate-700" aria-label="Mobile navigation">
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/#collections" onClick={() => setMenuOpen(false)}>Collections</Link>
            <Link href="/#deals" onClick={() => setMenuOpen(false)}>Deals</Link>
            <Link href="/#about" onClick={() => setMenuOpen(false)}>About</Link>
          </nav>
          <form action="/shop" className="relative mt-5 md:hidden">
            <label className="sr-only" htmlFor="mobile-header-search">Search products</label>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input id="mobile-header-search" name="q" placeholder="Search products" className="rounded-full bg-slate-100 pl-10" />
          </form>
        </div>
      )}
    </header>
  );
}
