"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Home, Sparkles, FolderOpen, Package } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AIForge"
              width={64}
              height={64}
              className="rounded-lg"
            />
            <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AIForge
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size="sm"
              >
                <Home className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline cursor-pointer">Home</span>
              </Button>
            </Link>
            <SignedIn>
              <Link href="/templates">
                <Button
                  variant={pathname === "/templates" ? "default" : "ghost"}
                  size="sm"
                >
                  <Package className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline cursor-pointer">Templates</span>
                </Button>
              </Link>
              <Link href="/architect">
                <Button
                  variant={pathname === "/architect" ? "default" : "ghost"}
                  size="sm"
                >
                  <Sparkles className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline cursor-pointer">Architect</span>
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant={pathname.startsWith("/projects") ? "default" : "ghost"}
                  size="sm"
                >
                  <FolderOpen className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline cursor-pointer">Projects</span>
                </Button>
              </Link>
            </SignedIn>
          </div>

          {/* Auth & Theme */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignedOut>
              <SignInButton>
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
