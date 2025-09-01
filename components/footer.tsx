"use client"

import React from "react"
import Link from "next/link"
import { Code2, Mail, MapPin, ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-slate-800">
      <div className="container px-4 mx-auto py-12">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <Code2 className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold">
                <span className="text-orange-400">404</span>
                <span className="text-cyan-400">studios</span>
              </span>
            </Link>
            <p className="text-gray-300 text-base leading-relaxed max-w-sm">
              Building next-generation web and mobile applications with cutting-edge design and seamless user experiences.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Home
              </Link>
              <Link href="/pricing" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Pricing
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Services
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Our Services</h3>
            <nav className="space-y-3">
              <div className="text-gray-300">Web Development</div>
              <div className="text-gray-300">Mobile Apps</div>
              <div className="text-gray-300">E-commerce Solutions</div>
              <div className="text-gray-300">UI/UX Design</div>
              <div className="text-gray-300">SEO Optimization</div>
              <div className="text-gray-300">Maintenance & Support</div>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-lg">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <div>404studios.dev@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Coimbatore, India</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-white font-medium">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button className="w-full sm:w-auto">
                  Subscribe
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Bottom Footer */}
      <div className="container px-4 mx-auto py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 404studios. All rights reserved. Built with passion in India.
          </div>
          <div className="flex space-x-6 text-sm">
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
