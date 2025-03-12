'use client'
import React from 'react';
import { Container } from './Container';

export default function About() {
  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-screen py-12">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">About Me</h1>
          <p className="text-lg">
            I am a passionate full-stack developer with expertise in modern web technologies.
            I love building beautiful, responsive, and user-friendly applications.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full h-[400px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
            <p className="text-lg font-medium">3D Scene Coming Soon</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
