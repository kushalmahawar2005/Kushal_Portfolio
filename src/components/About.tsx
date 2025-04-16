'use client'
import React from 'react';
import { Container } from '@/components/Container';
import dynamic from 'next/dynamic';
import { FiDownload } from 'react-icons/fi';
import Image from 'next/image'

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function About() {
  const handleDownloadCV = () => {
    // Replace this URL with your actual CV file URL
    const cvUrl = '/cv.pdf';
    window.open(cvUrl, '_blank');
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo Section */}
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <Image
              src="/profile.jpg"
              alt="Kushal's Photo"
              fill
              className="object-cover rounded-2xl shadow-xl"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              I am a passionate full-stack developer with expertise in modern web technologies.
              My journey in software development started with a curiosity to build things that make a difference.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              With a strong foundation in both frontend and backend development,
              I create scalable and user-friendly applications that solve real-world problems.
            </p>
            <div className="flex gap-4">
              <a
                href="/resume.pdf"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
