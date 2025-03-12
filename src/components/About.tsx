'use client'
import React from 'react';
import { Container } from '@/components/Container';
import dynamic from 'next/dynamic';
import { FiDownload } from 'react-icons/fi';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function About() {
  const handleDownloadCV = () => {
    // Replace this URL with your actual CV file URL
    const cvUrl = '/cv.pdf';
    window.open(cvUrl, '_blank');
  };

  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-screen py-12">
        <div className="flex-1 h-[500px]">
          <ThreeScene />
        </div>
        <div className="flex-1 space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-5xl font-bold text-white">
                About Me
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              I am a passionate full-stack developer with expertise in modern web technologies.
              I love building beautiful, responsive, and user-friendly applications.
            </p>
          </div>
          
          <div className="space-y-4 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-semibold text-white">Download My CV</h2>
            <p className="text-gray-300">
              Get a detailed overview of my skills, experience, and achievements.
            </p>
            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
              <span className="font-medium">Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
