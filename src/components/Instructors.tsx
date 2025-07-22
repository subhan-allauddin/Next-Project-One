'use client';

import React from 'react';
import { WavyBackground } from './ui/wavy-background';
import { AnimatedTooltip } from './ui/animated-tooltip';

const people = [
  {
    id: 1,
    name: "Umer",
    designation: "Software Engineer",
    image: "/Images/CEOOFASRASOFTMUHAMMADUMER.png"
  },
  {
    id: 2,
    name: "Sir Ubaid",
    designation: "Mern Stack Developer",
    image: "/Images/ubaidbhai.png"
  },
  {
    id: 3,
    name: "Muhammad Subhan",
    designation: "Frontend Developer",
    image: "/Images/Subhan Pics Shahlimar Garden-removebg-preview.jpg"
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80"
  }
];

function Instructors() {
  return (
    <div className='relative h-[65rem] overflow-hidden flex items-center justify-center'>
      <WavyBackground className='w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full'>
        <h2 className='text-2xl md:text-4xl lg:7xl text-white font-bold text-center mb-10'>
          Meet Our Instructors
        </h2>
        <p className='text-base md:text-lg text-white text-center mb-10'>
          Discover the talented professionals who will guide your musical journey
        </p>
        <div className='flex flex-row items-center justify-center mb-10 w-full'>
          <AnimatedTooltip items={people} />
        </div>
      </WavyBackground>
    </div>
  );
}

export default Instructors;
