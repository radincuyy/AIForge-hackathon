"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import { Sparkles, Zap, FileCode, Package, LogIn, TrendingUp, Briefcase, GraduationCap, Rocket, Mail, Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";
import { StarsCanvas } from "@/components/ui/stars-canvas";

export default function Home() {
  return (
    <>
      <Navigation />
      {/* Animated Stars Background */}
      <StarsCanvas
        transparent={false}
        maxStars={500}
        hue={260}
        brightness={0.6}
        speedMultiplier={0.1}
        twinkleIntensity={15}
        className="z-0"
      />
      <div className="relative z-10 min-h-screen bg-transparent">
        {/* Hero Section */}
        <div className="text-center py-12 sm:py-16 md:py-20 lg:py-24 px-4">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="AI Project Architect"
                width={150}
                height={150}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent px-4 pb-2 leading-tight">
              AI Project Architect
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
            Transform your ideas into complete projects with AI-powered tech
            stack recommendations, specifications, and boilerplate code
          </p>

          <div className="px-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignedIn>
              <Link href="/architect">
                <Button size="lg" className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 cursor-pointer w-full sm:w-auto">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Building Now
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 cursor-pointer w-full sm:w-auto">
                  <Package className="w-5 h-5 mr-2" />
                  Browse Templates
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 cursor-pointer w-full sm:w-auto">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In to Get Started
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Divider */}
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-16"></div>
        </div>

        {/* Features Section */}
        <main className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features to accelerate your development workflow
            </p>
          </div>

          {/* Features Grid - No Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-16">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-lg">
                  <Package className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Template Library
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Browse 10+ production-ready starter templates for various tech stacks
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-lg">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Smart Tech Stack
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI analyzes your needs and recommends the perfect technologies
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group sm:col-span-2 md:col-span-1">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-pink-500 to-violet-600 p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-lg">
                  <FileCode className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Technical Specs
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Generate comprehensive technical documentation automatically
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-16"></div>

          {/* Why Choose AIForge Section - Simple List */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why Choose AIForge?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for developers who want to move fast without compromising quality
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex-shrink-0">
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Save Hours of Setup Time</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Skip the tedious configuration and boilerplate setup. Get a production-ready codebase in minutes, not hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex-shrink-0">
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">AI-Powered Intelligence</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our AI understands your project requirements and suggests the best tech stack and architecture patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex-shrink-0">
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Best Practices Built-In</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every template follows industry standards with proper folder structure, TypeScript, and modern tooling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex-shrink-0">
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Complete Documentation</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Auto-generated technical specs and documentation help your team understand the architecture instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-16"></div>

          {/* Use Cases Section - Horizontal Layout */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Who Is It For?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Perfect for developers at any stage of their journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Startup Founders</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Launch your MVP faster with production-ready templates. Focus on your product, not infrastructure setup.
                </p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Professional Developers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Accelerate client projects with battle-tested templates. Deliver faster without sacrificing code quality.
                </p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Learning Developers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Study well-structured codebases and learn best practices from production-ready examples.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-16"></div>

          {/* Final CTA */}
          <div className="text-center max-w-2xl mx-auto">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-violet-600" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join developers who are accelerating their projects with AI-powered tools
            </p>

            <SignedIn>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/architect">
                  <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try AI Architect
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto cursor-pointer">
                    <Package className="w-5 h-5 mr-2" />
                    View Templates
                  </Button>
                </Link>
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="cursor-pointer">
                  <LogIn className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-20">
          <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Logo & Description */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src="/logo.png"
                    alt="AIForge"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="font-bold text-lg">AIForge</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered project architect that helps developers build better software faster.
                </p>
                {/* Social Icons */}
                <div className="flex gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:hello@aiforge.dev"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link href="/architect" className="text-muted-foreground hover:text-foreground transition-colors">
                      AI Architect
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-muted-foreground text-center">
                © 2025 AIForge. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
