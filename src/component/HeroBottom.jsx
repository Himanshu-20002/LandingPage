'use client';

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HeroBottom() {
    const buttonRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        // Create the animation and pause it initially
        animationRef.current = gsap.to(".outro h1", {
            y: 100,
            opacity: 0.5,
            color: "black",
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
            duration: 2,
            paused: true, // Start paused
        });
    }, []);

    const handleClick = () => {
        // Play the animation on button click
        if (animationRef.current) {
            animationRef.current.play();
        }
    };

    return (
        <section className="outro h-[100dvh] w-screen overflow-hidden">
            <h1>Join the team building faster with Byewind</h1>
            <p className="hero-footer-text">© 2025 All rights reserved.</p>
            <button
                className="hero-footer-button bg-amber-300 border-2 border-black text-black font-bold px-4 py-2 rounded-lg hover:bg-amber-400 transition duration-300 ease-in-out"
                onClick={handleClick}
                ref={buttonRef}
            >
                Get Started
            </button>
        </section>
    );
}