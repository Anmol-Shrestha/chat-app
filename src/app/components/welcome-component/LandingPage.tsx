"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Target,
  FileText,
  Brain,
  Check,
} from "lucide-react";
import Link from "next/link";

export default function LockedInLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Work Breakdown Structure",
      description:
        "Break down complex subjects into manageable chunks. Let LockedIn organize your learning path so you can focus on understanding.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Information Retrieval",
      description:
        "Find what you need, when you need it. Quick access to your study materials without the manual search.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Learning Reports",
      description:
        "Track your progress with detailed insights. Know exactly where you stand and what needs attention.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Create Quizzes",
      description:
        "Test your knowledge with auto-generated quizzes. Reinforce learning through active recall and practice.",
    },
  ];

  const benefits = [
    "Focus on learning, not organizing",
    "Save hours on study prep",
    "Track measurable progress",
    "Learn faster and retain more",
  ];

  return (
    <div className="min-h-screen">

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Learn Efficiently
            </h2>
            <p className="text-xl opacity-80">
              Stop wasting time on organization. Let LockedIn do the heavy lifting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 border rounded-xl transition hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#DC6668] to-[#65141B] rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="opacity-80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple, Powerful, Effective
            </h2>
            <p className="text-xl opacity-80">
              Get started in minutes, not hours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#DC6668] to-[#65141B] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {step === 1 && "Add Your Subject"}
                  {step === 2 && "Let AI Organize"}
                  {step === 3 && "Focus & Learn"}
                </h3>
                <p className="opacity-80">
                  {step === 1 && "Tell LockedIn what you're studying and your goals"}
                  {step === 2 && "Watch as your study plan takes shape automatically"}
                  {step === 3 && "Dive into learning while LockedIn handles the rest"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Why Students Love LockedIn
            </h2>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <Check className="w-6 h-6 text-[#DC6668] mt-1" />
                  <span className="ml-3 text-lg opacity-90">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <Link href="/api/auth/signin" className="mt-8 inline-block bg-gradient-to-r from-[#DC6668] to-[#65141B] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition">
              Try It Free Today
            </Link>
          </div>

          <div className="bg-gradient-to-r from-[#DC6668] to-[#65141B] rounded-2xl p-8 text-white">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <p className="text-lg italic mb-4">
                  "LockedIn cut my study prep time in half. I actually have time to learn now instead of just organizing notes."
                </p>
                <p className="font-semibold">
                  Sarah K., Computer Science Student
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <p className="text-lg italic mb-4">
                  "The quiz feature is a game changer. I retain so much more when I test myself regularly."
                </p>
                <p className="font-semibold">
                  Michael R., Medical Student
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-xl opacity-80 mb-8">
          Join thousands of students who are learning smarter with LockedIn
        </p>
        <Link href="/api/auth/signin" className="inline-block bg-gradient-to-r from-[#DC6668] to-[#65141B] text-white px-12 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition">
          Get Started Free
        </Link>
        <p className="opacity-60 mt-4">
          No credit card required
        </p>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-[#DC6668] to-[#65141B] text-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 LockedIn. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}