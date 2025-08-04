"use client"

import Link from "next/link"
import { Code2, Mail, Phone, MapPin, ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 border-t border-slate-800/50 z-10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent z-0" />

      {/* Main Footer Content */}
      <div className="relative z-20 container px-3 sm:px-4 md:px-6 lg:px-8 mx-auto py-8 sm:py-12 md:py-16">
        <div className="grid gap-6 sm:gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
              <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                404studios
              </span>
            </Link>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Building next-generation web and mobile applications with cutting-edge design and seamless user
              experiences.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-white font-semibold text-base sm:text-lg">Quick Links</h3>
            <nav className="space-y-2 sm:space-y-3">
              <Link
                href="/"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base"
              >
                Home
              </Link>
              <Link
                href="/features"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base"
              >
                Features & Tiers
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base"
              >
                Pricing
              </Link>
              <Link
                href="/services"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-white font-semibold text-base sm:text-lg">Our Services</h3>
            <nav className="space-y-2 sm:space-y-3">
              <div className="text-gray-300 text-sm sm:text-base">Web Development</div>
              <div className="text-gray-300 text-sm sm:text-base">Mobile Apps</div>
              <div className="text-gray-300 text-sm sm:text-base">E-commerce Solutions</div>
              <div className="text-gray-300 text-sm sm:text-base">UI/UX Design</div>
              <div className="text-gray-300 text-sm sm:text-base">SEO Optimization</div>
              <div className="text-gray-300 text-sm sm:text-base">Maintenance & Support</div>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-white font-semibold text-base sm:text-lg">Get In Touch</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm sm:text-base">
                  <div>vishwaadeveloper@gmail.com</div>
                  <div>abinayaa.dev@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm sm:text-base">
                  <div>+91 7845890089</div>
                  <div>+91 9489153545</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">Coimbatore, India</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-white font-medium text-sm sm:text-base">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 focus:border-cyan-500 transition-colors duration-300 text-sm flex-1"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition-all duration-300 text-sm px-4 w-full sm:w-auto"
                >
                  Subscribe
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-800/50 relative z-20" />

      {/* Bottom Footer */}
      <div className="relative z-20 container px-3 sm:px-4 md:px-6 lg:px-8 mx-auto py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © 2024 404studios. All rights reserved. Built with passion in India.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
