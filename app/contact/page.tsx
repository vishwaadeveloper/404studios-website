"use client"

import type React from "react"

import { ArrowRight, Mail, MapPin, Phone, Clock, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContactForm } from "@/src/features/contact"

const iconMap = {
  Mail,
  Phone,
  MapPin,
  Clock
};

export default function ContactPage() {
  const {
    formData,
    currentStep,
    selectedTimeSlot,
    handleInputChange,
    nextStep,
    prevStep,
    handleSubmit,
    setSelectedTimeSlot,
    contactInfo,
    availableTimeSlots,
    projectTypes,
    budgetRanges,
    timelineOptions,
    packageOptions,
    isStepValid,
    totalSteps,
    selectedSlot
  } = useContactForm();

  const getIconColorClass = (color: string) => {
    const colorMap = {
      cyan: 'text-cyan-400',
      purple: 'text-purple-400',
      pink: 'text-pink-400'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-cyan-400';
  };

  const getIconBgClass = (color: string) => {
    const colorMap = {
      cyan: 'bg-cyan-500/20 group-hover:bg-cyan-500/30',
      purple: 'bg-purple-500/20 group-hover:bg-purple-500/30',
      pink: 'bg-pink-500/20 group-hover:bg-pink-500/30'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-cyan-500/20 group-hover:bg-cyan-500/30';
  };

  return (
    <div className="relative min-h-screen">

      {/* Header */}
      <section className="relative pt-20 pb-10 md:pt-24 md:pb-16 animate-fade-in-up">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="border-cyan-500 text-cyan-500 px-3 py-1.5 text-sm backdrop-blur-sm bg-black/20 animate-pulse-glow"
              >
                Get In Touch
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x">
                Contact Us
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-fade-in-up animation-delay-200">
                Ready to start your project? Get in touch for a consultation and detailed quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6 animate-fade-in-left">
              {/* Glassmorphism Contact Card */}
              <Card className="border-slate-800 bg-slate-900/30 backdrop-blur-md hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Get In Touch</CardTitle>
                  <CardDescription>We&apos;d love to hear about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    {contactInfo.map((info, index) => {
                      const IconComponent = iconMap[info.icon as keyof typeof iconMap];
                      const values = Array.isArray(info.value) ? info.value : [info.value];
                      
                      return (
                        <div key={index} className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
                          <div className={`rounded-full p-2 transition-colors duration-300 ${getIconBgClass(info.color)}`}>
                            <IconComponent className={`h-5 w-5 ${getIconColorClass(info.color)}`} />
                          </div>
                          <div>
                            <p className="text-white font-medium">{info.label}</p>
                            {values.map((value, valueIndex) => (
                              <p key={valueIndex} className="text-gray-400">{value}</p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Booking Calendar */}
              <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Book a Consultation</CardTitle>
                  <CardDescription>Schedule a free 30-minute consultation call</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {availableTimeSlots.map((slot, index) => (
                        <div key={slot.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                          <button
                            onClick={() => setSelectedTimeSlot(slot.id)}
                            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 relative overflow-hidden ${
                              selectedTimeSlot === slot.id
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg transform scale-105"
                                : "bg-slate-800/80 border-slate-700 text-gray-300 hover:bg-slate-700/90 hover:border-cyan-500/60 hover:text-white hover:transform hover:scale-[1.02]"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center space-y-1 relative z-10">
                              <div
                                className={`font-semibold text-sm ${
                                  selectedTimeSlot === slot.id ? "text-white" : "text-cyan-400"
                                }`}
                              >
                                {slot.date}
                              </div>
                              <div
                                className={`text-xs ${
                                  selectedTimeSlot === slot.id ? "text-cyan-100" : "text-gray-400"
                                }`}
                              >
                                {slot.time}
                              </div>
                            </div>
                            {selectedTimeSlot === slot.id && (
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 animate-pulse" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                    {selectedSlot && (
                      <div className="rounded-lg border border-cyan-500/50 bg-cyan-500/10 p-4 animate-fade-in">
                        <div className="flex items-center space-x-2">
                          <Check className="h-5 w-5 text-cyan-400" />
                          <div>
                            <p className="text-white font-medium">Slot Selected</p>
                            <p className="text-cyan-400 text-sm">
                              {selectedSlot.date} at {selectedSlot.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Multi-step Quote Request Form */}
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)] transition-all duration-300 animate-fade-in-right">
              <CardHeader>
                <CardTitle className="text-white">Request a Quote</CardTitle>
                <CardDescription>Tell us about your project requirements</CardDescription>

                {/* Progress Bar */}
                <div className="flex items-center space-x-2 mt-4">
                  {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                          step <= currentStep
                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white transform scale-110"
                            : "bg-slate-800 text-gray-400"
                        }`}
                      >
                        {step}
                      </div>
                      {step < totalSteps && (
                        <div
                          className={`w-12 h-0.5 mx-2 transition-all duration-500 ${
                            step < currentStep ? "bg-gradient-to-r from-cyan-500 to-purple-600" : "bg-slate-800"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 transition-colors duration-300"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 transition-colors duration-300"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 transition-colors duration-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-white">
                            Company
                          </Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 transition-colors duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Project Details */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <Label htmlFor="projectType" className="text-white">
                          Project Type *
                        </Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) => handleInputChange("projectType", value)}
                        >
                          <SelectTrigger className="bg-slate-800/80 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors duration-300">
                            <SelectValue placeholder="Select project type" className="text-gray-300" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
                            {projectTypes.map((type) => (
                              <SelectItem
                                key={type.value}
                                value={type.value}
                                className="text-gray-200 hover:bg-cyan-500/20 focus:bg-cyan-500/20 focus:text-cyan-100 cursor-pointer"
                              >
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-white">
                            Budget Range
                          </Label>
                          <Select
                            value={formData.budget}
                            onValueChange={(value) => handleInputChange("budget", value)}
                          >
                            <SelectTrigger className="bg-slate-800/80 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors duration-300">
                              <SelectValue placeholder="Select budget" className="text-gray-300" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
                              {budgetRanges.map((range) => (
                                <SelectItem
                                  key={range.value}
                                  value={range.value}
                                  className="text-gray-200 hover:bg-cyan-500/20 focus:bg-cyan-500/20 focus:text-cyan-100 cursor-pointer"
                                >
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeline" className="text-white">
                            Timeline
                          </Label>
                          <Select
                            value={formData.timeline}
                            onValueChange={(value) => handleInputChange("timeline", value)}
                          >
                            <SelectTrigger className="bg-slate-800/80 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors duration-300">
                              <SelectValue placeholder="Select timeline" className="text-gray-300" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
                              {timelineOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="text-gray-200 hover:bg-cyan-500/20 focus:bg-cyan-500/20 focus:text-cyan-100 cursor-pointer"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredPackage" className="text-white">
                          Preferred Package
                        </Label>
                        <Select
                          value={formData.preferredPackage}
                          onValueChange={(value) => handleInputChange("preferredPackage", value)}
                        >
                          <SelectTrigger className="bg-slate-800/80 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors duration-300">
                            <SelectValue placeholder="Select package" className="text-gray-300" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
                            {packageOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-gray-200 hover:bg-cyan-500/20 focus:bg-cyan-500/20 focus:text-cyan-100 cursor-pointer"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Project Description */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-white">
                          Project Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                          className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 transition-colors duration-300 min-h-[120px] resize-none"
                          required
                        />
                      </div>
                      <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
                        <h4 className="text-white font-medium mb-2">Review Your Information</h4>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p><span className="text-cyan-400">Name:</span> {formData.name}</p>
                          <p><span className="text-cyan-400">Email:</span> {formData.email}</p>
                          {formData.phone && <p><span className="text-cyan-400">Phone:</span> {formData.phone}</p>}
                          {formData.company && <p><span className="text-cyan-400">Company:</span> {formData.company}</p>}
                          {formData.projectType && <p><span className="text-cyan-400">Project:</span> {projectTypes.find(p => p.value === formData.projectType)?.label}</p>}
                          {formData.budget && <p><span className="text-cyan-400">Budget:</span> {budgetRanges.find(b => b.value === formData.budget)?.label}</p>}
                          {formData.timeline && <p><span className="text-cyan-400">Timeline:</span> {timelineOptions.find(t => t.value === formData.timeline)?.label}</p>}
                          {selectedSlot && <p><span className="text-cyan-400">Consultation:</span> {selectedSlot.date} at {selectedSlot.time}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Navigation */}
                  <div className="flex justify-between pt-4">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-800/50 hover:border-cyan-500/50 hover:text-white transition-colors duration-300"
                      >
                        Previous
                      </Button>
                    )}
                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid(currentStep)}
                        className="ml-auto bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!isStepValid(currentStep)}
                        className="ml-auto bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Submit Request
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(56, 189, 248, 0.6);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}
