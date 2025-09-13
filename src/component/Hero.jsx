'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from './Nav';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 217;
const videoFrames = { frame: 0 };
const images = [];

const currentFrame = (index) => `/frames/frame${(index + 1).toString().padStart(4, '0')}.jpg`;
const render = (canvasRef) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio || 1;
    const canvasWidth = canvas.width / pixelRatio;
    const canvasHeight = canvas.height / pixelRatio;

    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = images[videoFrames.frame];
    if (img && img.complete && img.naturalWidth > 0) {
        // Calculate scale for "cover", but clamp to image size
        const imageAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = canvasWidth / canvasHeight;
        let drawWidth, drawHeight, drawX, drawY;

        if (imageAspect > canvasAspect) {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imageAspect;
        } else {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imageAspect;
        }

   // "Cover" logic: always fill canvas, allow upscaling
        if (imageAspect > canvasAspect) {
            drawHeight = canvasHeight;
            drawWidth = drawHeight * imageAspect;
            drawX = (canvasWidth - drawWidth) / 2;
            drawY = 0;
        } else {
            drawWidth = canvasWidth;
            drawHeight = drawWidth / imageAspect;
            drawX = 0;
            drawY = (canvasHeight - drawHeight) / 2;
        }

        context.drawImage(
            img,
            0, 0, img.naturalWidth, img.naturalHeight,
            drawX * pixelRatio,
            drawY * pixelRatio,
            drawWidth * pixelRatio,
            drawHeight * pixelRatio
        );
    }
};
const Hero = () => {
    const canvasRef = useRef(null);
    const headerRef = useRef(null);
    const heroimgRef = useRef(null);
    const navRef = useRef(null);

    // ...existing code...
    useEffect(() => {
        const lenis = new Lenis();

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        let lastPixelRatio = window.devicePixelRatio;

        const setCanvasSize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const pixelRatio = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;
            // Set display size (CSS pixels)
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            // Set drawing buffer size (device pixels)
            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
            const context = canvas.getContext('2d');
            context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
            context.scale(pixelRatio, pixelRatio); // Scale for sharpness
            render(canvasRef); // Redraw current frame after resize/zoom
        };

        setCanvasSize();

        window.addEventListener('resize', setCanvasSize);

        // Listen for devicePixelRatio changes (zoom)
        const checkPixelRatio = () => {
            if (window.devicePixelRatio !== lastPixelRatio) {
                lastPixelRatio = window.devicePixelRatio;
                setCanvasSize();
            }
        };
        const pixelRatioInterval = setInterval(checkPixelRatio, 250);

        let imagesToLoad = frameCount;

        const onLoad = () => {
            imagesToLoad--;
            if (!imagesToLoad) {
                render(canvasRef);
                setupScrollTrigger();
            }
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new window.Image();
            img.onload = onLoad;
            img.onerror = function () {
                onLoad.call(this);
            };
            img.src = currentFrame(i);
            images.push(img);
        }

        return () => {
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            window.removeEventListener('resize', setCanvasSize);
            clearInterval(pixelRatioInterval);
        };
    }, []);
    // ...existing code...

    const setupScrollTrigger = () => {
        ScrollTrigger.create({
            trigger: ".hero",
            start: "top top",
            end: `+=${window.innerHeight * 7}px`,
            pin: true,
            scrub: 1,
            pinSpacing: true,
            onUpdate: (self) => {  // every time the userr scrolls the function will be run
                const progress = self.progress;
                const animationProgress = Math.min(progress / 0.9, 1);
                const targetFrame = Math.round(animationProgress * (frameCount - 1));
                videoFrames.frame = targetFrame;
                requestAnimationFrame(() => render(canvasRef));

                if(progress <= 0.1) {
                    const navProgress = progress / 0.1;
                    const opacity = 1 - navProgress;
                    gsap.set(navRef.current ,{ opacity: opacity });
                }else{
                    gsap.set(navRef.current, { opacity: 0 });
                }


                if(progress <=0.25){
                    const zProgress = progress / 0.25;
                    const translateZ = zProgress * -500;

                    let opacity = 1;
                    if(progress >= 0.2){
                        const fadeProgress = Math.min((progress - 0.2)/(0.25 - 0.2),1)
                        opacity = 1 - fadeProgress;
                    }
                    gsap.set(headerRef.current,{
                        transform:`translate(-50%, -50%) translateZ(${translateZ}px)`,
                        opacity,
                    })

                } else{
                    gsap.set(headerRef.current,{opacity:0});
                }
                 if(progress < 0.6){
                    gsap.set(heroimgRef.current ,{
                        transform: 'translateZ(1000px)',
                        opacity:0,
                    })
                }
                else if(progress >= 0.6 && progress <= 0.9 ){
                    const imgProgress = (progress - 0.6) /0.3;
                    const translateZ = 1000 -imgProgress * 1000;

                    let opacity = 0;
                    if (progress <= 0.8){
                        const opacityProgress = (progress - 0.6)/ 0.2
                        opacity = opacityProgress;
                    }else{
                        opacity = 1;

                    }

                    gsap.set(heroimgRef.current ,{
                        transform: `translateZ(${translateZ}px)`,
                        opacity,

                    })
                } else {
                    gsap.set(heroimgRef.current,{
                        transform:'translateZ(0px)',
                        opacity:1

                    })
                }


            }
        });
    };


    return (
        <div>
               <Nav ref={navRef} />
            <section className="hero">
                <canvas className="hero-canvas" ref={canvasRef} style={{ display: 'block' }} />
                <div className="hero-content">
                    <div className="header" ref={headerRef}>
                        <h1>Beautifully crafted <span className='text-gray-600'>U</span><span className='text-violet-600' >I</span> <span className='text-gray-600'>components</span> to elevate your web projects</h1>
                        <p className="hero-text font-bold">Powered by</p>
                        <div className='client-logos'>
                            <div className="client-logo">
                                <img src="/img/react.png" alt="Client 1" />
                                <span className='text-4xl text-black'>React</span>
                            </div>
                            <div className="client-logo">
                                <img src="/img/next.png" alt="Client 2" />
                                <span className='text-4xl text-black'>Next.js</span>
                            </div>
                            <div className="client-logo">
                                <img src="/img/tailwind.png" alt="Client 3" />
                                <span className='text-4xl text-black'>Tailwind</span>
                            </div>
                            <div className="client-logo">
                                <img src="/img/framer.png" alt="Client 4" />
                                <span className='text-4xl text-black'>GSAP</span>
                            </div>
                        </div>
                        <button className="hero-button bg-gray-200 p-2 rounded-lg text-black hover:bg-black hover:text-white">Browse Componet</button>
                    </div>
                </div>
                <div className="hero-img-container">
                    <div className="hero-img" ref={heroimgRef}>
                        <img src="/img/uiImage.png" alt="Hero" />
                    </div>
                </div>
            </section>

            <section className="outro  h-[100dvh] w-screen overflow-hidden ">
                <h1>Join the team building faster with UI Components</h1>
                <p className="hero-footer-text">© 2025  All rights reserved.</p>
            </section>
        </div>
    )
}

export default Hero