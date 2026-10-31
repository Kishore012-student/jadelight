/* =========================================================
   JADE LIGHT — GLOBAL SCRIPT
   Vanilla JS + GSAP + ScrollTrigger
========================================================= */



/* =========================================================
   LUCIDE ICONS
======================================================== */

window.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        lucide.createIcons();
    }
});

/* =========================================================
   SECURITY REVEAL
========================================================= */

const reveal =
    document.getElementById("securityReveal");

if (reveal) {

    const imageText =
        reveal.querySelector(".security-image-text");

    if (imageText) {

        reveal.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    reveal.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                imageText.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                imageText.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

                reveal.classList.add(
                    "is-active"
                );

            }
        );


        reveal.addEventListener(
            "mouseleave",
            () => {

                reveal.classList.remove(
                    "is-active"
                );

            }
        );

    }

}


/* =========================================================
   GSAP CHECK
========================================================= */

const hasGSAP =
    typeof gsap !== "undefined";

const hasScrollTrigger =
    typeof ScrollTrigger !== "undefined";


if (hasGSAP && hasScrollTrigger) {

    gsap.registerPlugin(
        ScrollTrigger
    );

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           ABOUT PAGE — HERO
        ====================================================== */

        const hero =
            document.querySelector(
                ".about-hero"
            );

        const heroCharacter =
            document.querySelector(
                ".hero-character"
            );

        const character =
            document.querySelector(
                ".hero-character img"
            );


        if (
            hasGSAP &&
            hero &&
            heroCharacter &&
            character
        ) {


            /* ================================================
               HERO TIMELINE
            ================================================= */

            const heroTimeline =
                gsap.timeline({

                    defaults: {
                        ease:
                            "power3.out"
                    }

                });


            /* ================================================
               TEXT REVEAL
            ================================================= */

            heroTimeline.from(
                ".about-eyebrow",
                {

                    y: 25,

                    opacity: 0,

                    duration: 0.7

                }
            );


            heroTimeline.from(
                ".hero-copy h1",
                {

                    y: 45,

                    opacity: 0,

                    duration: 0.9

                },
                "-=0.35"
            );


            heroTimeline.from(
                ".hero-copy p",
                {

                    y: 22,

                    opacity: 0,

                    duration: 0.65

                },
                "-=0.45"
            );


            heroTimeline.from(
                ".hero-copy .gold-button",
                {

                    y: 18,

                    opacity: 0,

                    duration: 0.55

                },
                "-=0.35"
            );


            /* ================================================
               CHARACTER — STABLE INITIAL STATE

               IMPORTANT:
               GSAP is now the only thing controlling
               transform on the character.
            ================================================= */

            gsap.set(
                character,
                {

                    opacity: 0,

                    x: 0,

                    y: 30,

                    scale: 0.98,

                    force3D: true

                }
            );


            /* ================================================
               CHARACTER REVEAL

               Wait for actual image loading.
            ================================================= */

            let characterRevealed =
                false;


            const revealCharacter =
                () => {

                    if (
                        characterRevealed
                    ) {
                        return;
                    }

                    characterRevealed =
                        true;


                    gsap.to(
                        character,
                        {

                            opacity: 1,

                            x: 0,

                            y: 0,

                            scale: 1,

                            duration: 1.2,

                            ease:
                                "power3.out",

                            overwrite:
                                true

                        }
                    );

                };


            /* ================================================
               IMAGE LOAD SAFETY
            ================================================= */

            if (
                character.complete &&
                character.naturalWidth > 0
            ) {

                revealCharacter();

            } else {

                character.addEventListener(
                    "load",
                    revealCharacter,
                    {
                        once: true
                    }
                );

                character.addEventListener(
                    "error",
                    () => {

                        console.warn(
                            "Jade Light character image failed to load."
                        );

                    },
                    {
                        once: true
                    }
                );

            }


            /* ================================================
               HERO PARALLAX

               VERY SMALL MOVEMENT
               X = 6px
               Y = 3px

               So character won't float too much.
            ================================================= */

            let parallaxAnimation;


            hero.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        hero.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        0.5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        0.5;


                    if (
                        parallaxAnimation
                    ) {
                        parallaxAnimation.kill();
                    }


                    parallaxAnimation =
                        gsap.to(
                            character,
                            {

                                x:
                                    x * 6,

                                y:
                                    y * 3,

                                duration:
                                    0.7,

                                ease:
                                    "power2.out",

                                overwrite:
                                    false

                            }
                        );

                }
            );


            /* ================================================
               RESET PARALLAX
            ================================================= */

            hero.addEventListener(
                "mouseleave",
                () => {

                    if (
                        parallaxAnimation
                    ) {
                        parallaxAnimation.kill();
                    }


                    gsap.to(
                        character,
                        {

                            x: 0,

                            y: 0,

                            duration:
                                0.8,

                            ease:
                                "power3.out",

                            overwrite:
                                true

                        }
                    );

                }
            );

            /* =====================================================
               ABOUT HERO — INTERACTIVE PARTICLE CANVAS & AURA GLOW
            ====================================================== */
            const particleCanvas = document.getElementById("heroParticlesCanvas");
            if (particleCanvas) {
                const ctx = particleCanvas.getContext("2d");
                let particles = [];
                let animFrameId;
                const particleCount = 42;
                let mouseX = 0;
                let mouseY = 0;
                let isMouseOverHero = false;

                function resizeCanvas() {
                    const rect = particleCanvas.parentElement.getBoundingClientRect();
                    const dpr = window.devicePixelRatio || 1;
                    particleCanvas.width = (rect.width + 120) * dpr;
                    particleCanvas.height = (rect.height + 120) * dpr;
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                }

                class GlowParticle {
                    constructor(w, h) {
                        this.init(w, h, true);
                    }

                    init(w, h, randomY = false) {
                        this.x = Math.random() * w;
                        this.y = randomY ? Math.random() * h : h + 10;
                        this.radius = 1.2 + Math.random() * 2.8;
                        this.speedY = 0.35 + Math.random() * 0.75;
                        this.speedX = (Math.random() - 0.5) * 0.5;
                        this.alpha = 0.15 + Math.random() * 0.75;
                        this.maxAlpha = this.alpha;
                        this.life = 0;
                        this.maxLife = 180 + Math.random() * 240;
                        this.hue = Math.random() > 0.4 ? "emerald" : "gold";
                        this.pulseRate = 0.02 + Math.random() * 0.03;
                    }

                    update(w, h) {
                        this.y -= this.speedY;
                        this.x += this.speedX + Math.sin(this.life * 0.03) * 0.4;
                        this.life++;

                        // Interactive cursor deflection
                        if (isMouseOverHero) {
                            const dx = this.x - mouseX;
                            const dy = this.y - mouseY;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < 90 && dist > 0) {
                                const force = (90 - dist) / 90;
                                this.x += (dx / dist) * force * 1.8;
                                this.y += (dy / dist) * force * 1.8;
                            }
                        }

                        // Fade in and out
                        const progress = this.life / this.maxLife;
                        if (progress < 0.2) {
                            this.alpha = (progress / 0.2) * this.maxAlpha;
                        } else if (progress > 0.7) {
                            this.alpha = ((1 - progress) / 0.3) * this.maxAlpha;
                        }

                        if (this.life >= this.maxLife || this.y < -20 || this.x < -20 || this.x > w + 20) {
                            this.init(w, h, false);
                        }
                    }

                    draw(ctx) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

                        if (this.hue === "emerald") {
                            ctx.fillStyle = `rgba(0, 204, 150, ${this.alpha})`;
                            ctx.shadowColor = "rgba(0, 224, 164, 0.9)";
                            ctx.shadowBlur = this.radius * 4;
                        } else {
                            ctx.fillStyle = `rgba(211, 170, 93, ${this.alpha})`;
                            ctx.shadowColor = "rgba(211, 170, 93, 0.9)";
                            ctx.shadowBlur = this.radius * 4;
                        }

                        ctx.fill();
                        ctx.restore();
                    }
                }

                function initParticles() {
                    resizeCanvas();
                    const w = particleCanvas.parentElement.offsetWidth + 120;
                    const h = particleCanvas.parentElement.offsetHeight + 120;
                    particles = [];
                    for (let i = 0; i < particleCount; i++) {
                        particles.push(new GlowParticle(w, h));
                    }
                }

                function animateParticles() {
                    const w = particleCanvas.parentElement.offsetWidth + 120;
                    const h = particleCanvas.parentElement.offsetHeight + 120;
                    ctx.clearRect(0, 0, w, h);

                    for (let i = 0; i < particles.length; i++) {
                        particles[i].update(w, h);
                        particles[i].draw(ctx);
                    }

                    animFrameId = requestAnimationFrame(animateParticles);
                }

                initParticles();
                animateParticles();

                window.addEventListener("resize", () => {
                    resizeCanvas();
                });

                hero.addEventListener("mousemove", (e) => {
                    const rect = particleCanvas.getBoundingClientRect();
                    mouseX = e.clientX - rect.left;
                    mouseY = e.clientY - rect.top;
                    isMouseOverHero = true;
                });

                hero.addEventListener("mouseleave", () => {
                    isMouseOverHero = false;
                });
            }

        }


        /* =====================================================
           ABOUT PAGE — SECTION REVEALS
        ====================================================== */

        if (
            hasGSAP &&
            hasScrollTrigger
        ) {


            /* ================================================
               WHO WE ARE
            ================================================= */

            const whoSection =
                document.querySelector(
                    ".who-section"
                );


            if (whoSection) {

                gsap.from(
                    ".who-heading",
                    {

                        scrollTrigger: {

                            trigger:
                                ".who-section",

                            start:
                                "top 75%"

                        },

                        y: 60,

                        opacity: 0,

                        duration: 1,

                        ease:
                            "power3.out"

                    }
                );


                gsap.from(
                    ".who-content",
                    {

                        scrollTrigger: {

                            trigger:
                                ".who-section",

                            start:
                                "top 70%"

                        },

                        y: 45,

                        opacity: 0,

                        duration: 1,

                        delay: 0.15,

                        ease:
                            "power3.out"

                    }
                );

            }


            /* ================================================
               PURPOSE
            ================================================= */

            const purposeSection =
                document.querySelector(
                    ".purpose-section"
                );


            if (purposeSection) {

                gsap.from(
                    ".purpose-left",
                    {

                        scrollTrigger: {

                            trigger:
                                ".purpose-section",

                            start:
                                "top 75%"

                        },

                        x: -60,

                        opacity: 0,

                        duration: 1,

                        ease:
                            "power3.out"

                    }
                );


                gsap.from(
                    ".purpose-right",
                    {

                        scrollTrigger: {

                            trigger:
                                ".purpose-section",

                            start:
                                "top 70%"

                        },

                        x: 60,

                        opacity: 0,

                        duration: 1,

                        ease:
                            "power3.out"

                    }
                );

            }


            /* ================================================
               PRINCIPLES CARDS
            ================================================= */

            const principlesSection =
                document.querySelector(
                    ".principles-section"
                );


            if (principlesSection) {

                gsap.from(
                    ".principle-card",
                    {

                        scrollTrigger: {

                            trigger:
                                ".principles-section",

                            start:
                                "top 75%"

                        },

                        y: 50,

                        opacity: 0,

                        duration: 0.8,

                        stagger: 0.12,

                        ease:
                            "power3.out"

                    }
                );

            }


            /* ================================================
               INTEGRATED
            ================================================= */

            const integratedSection =
                document.querySelector(
                    ".integrated-section"
                );


            if (integratedSection) {

                gsap.from(
                    ".integrated-copy",
                    {

                        scrollTrigger: {

                            trigger:
                                ".integrated-section",

                            start:
                                "top 75%"

                        },

                        x: -50,

                        opacity: 0,

                        duration: 1,

                        ease:
                            "power3.out"

                    }
                );


                gsap.from(
                    ".capability-system",
                    {

                        scrollTrigger: {

                            trigger:
                                ".integrated-section",

                            start:
                                "top 70%"

                        },

                        scale: 0.8,

                        opacity: 0,

                        duration: 1.2,

                        ease:
                            "power3.out"

                    }
                );

            }


          /* ================================================
   LEADERSHIP — STRATEGIC MENTORSHIP
================================================= */

const leadershipSection =
    document.querySelector(
        ".leadership-section"
    );


if (
    hasGSAP &&
    hasScrollTrigger &&
    leadershipSection
) {


    /* ============================================
       SECTION TITLE
    ============================================ */

    gsap.from(
        ".leadership-title > *",
        {

            scrollTrigger: {

                trigger:
                    leadershipSection,

                start:
                    "top 78%",

                once:
                    true

            },

            opacity: 0,

            y: 35,

            duration: 0.8,

            stagger: 0.12,

            ease:
                "power3.out"

        }
    );


    /* ============================================
       MAIN PANEL
    ============================================ */

    gsap.from(
        ".leadership-panel",
        {

            scrollTrigger: {

                trigger:
                    leadershipSection,

                start:
                    "top 70%",

                once:
                    true

            },

            opacity: 0,

            y: 45,

            scale: 0.985,

            duration: 1,

            ease:
                "power3.out"

        }
    );


    /* ============================================
       LEFT CONTENT
    ============================================ */

    gsap.from(
        ".leadership-side > *",
        {

            scrollTrigger: {

                trigger:
                    leadershipSection,

                start:
                    "top 65%",

                once:
                    true

            },

            opacity: 0,

            x: -25,

            duration: 0.65,

            stagger: 0.08,

            ease:
                "power3.out"

        }
    );


    /* ============================================
       QUOTE
    ============================================ */

    gsap.from(
        ".leadership-message > *",
        {

            scrollTrigger: {

                trigger:
                    leadershipSection,

                start:
                    "top 65%",

                once:
                    true

            },

            opacity: 0,

            y: 25,

            duration: 0.7,

            stagger: 0.1,

            ease:
                "power3.out"

        }
    );


    /* ============================================
       RIGHT DESCRIPTION
    ============================================ */

    gsap.from(
        ".leadership-description > *",
        {

            scrollTrigger: {

                trigger:
                    leadershipSection,

                start:
                    "top 62%",

                once:
                    true

            },

            opacity: 0,

            x: 25,

            duration: 0.65,

            stagger: 0.08,

            ease:
                "power3.out"

        }
    );


    /* ============================================
       BOTTOM LINE
    ============================================ */

    gsap.from(
        ".leadership-bottom",
        {

            scrollTrigger: {

                trigger:
                    leadershipSection,

                start:
                    "top 60%",

                once:
                    true

            },

            opacity: 0,

            y: 15,

            duration: 0.6,

            ease:
                "power2.out"

        }
    );

}
            /* ================================================
               REGIONAL
            ================================================= */

            const regionalSection =
                document.querySelector(
                    ".regional-section"
                );


            if (regionalSection) {

                gsap.from(
                    ".regional-copy",
                    {

                        scrollTrigger: {

                            trigger:
                                ".regional-section",

                            start:
                                "top 75%"

                        },

                        x: -50,

                        opacity: 0,

                        duration: 1,

                        ease:
                            "power3.out"

                    }
                );


                gsap.from(
                    ".regional-network",
                    {

                        scrollTrigger: {

                            trigger:
                                ".regional-section",

                            start:
                                "top 70%"

                        },

                        scale: 0.85,

                        opacity: 0,

                        duration: 1.2,

                        ease:
                            "power3.out"

                    }
                );

            }


            /* ================================================
               ABOUT FINAL CTA
            ================================================= */

            const aboutFinalCTA =
                document.querySelector(
                    ".about-final-cta"
                );


            if (aboutFinalCTA) {

                gsap.from(
                    ".about-final-cta .cta-content",
                    {

                        scrollTrigger: {

                            trigger:
                                ".about-final-cta",

                            start:
                                "top 75%"

                        },

                        x: -50,

                        opacity: 0,

                        duration: 1,

                        ease:
                            "power3.out"

                    }
                );


                gsap.from(
                    ".about-final-cta .cta-character",
                    {

                        scrollTrigger: {

                            trigger:
                                ".about-final-cta",

                            start:
                                "top 70%"

                        },

                        x: 80,

                        opacity: 0,

                        duration: 1.2,

                        ease:
                            "power3.out"

                    }
                );

            }

        }


        /* =====================================================
           CORE SOLUTIONS — JADE SPARKLES
        ====================================================== */

        const sparkleContainer =
            document.querySelector(
                ".jade-sparkles"
            );

        const solutionCenter =
            document.querySelector(
                ".solution-center"
            );


        if (
            hasGSAP &&
            sparkleContainer &&
            solutionCenter
        ) {


            /* ================================================
               CREATE SPARKLES
            ================================================= */

            const sparkleCount =
                18;


            for (
                let i = 0;
                i < sparkleCount;
                i++
            ) {

                const sparkle =
                    document.createElement(
                        "span"
                    );

                sparkle.classList.add(
                    "jade-sparkle"
                );

                sparkleContainer.appendChild(
                    sparkle
                );

            }


            const sparkles =
                sparkleContainer.querySelectorAll(
                    ".jade-sparkle"
                );


            /* ================================================
               SPARKLE ANIMATION
            ================================================= */

            function animateSparkle(
                sparkle
            ) {

                const centerX =
                    50;

                const centerY =
                    50;


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    55 +
                    Math.random() *
                    100;


                const startX =
                    centerX +
                    Math.cos(angle) *
                    7;


                const startY =
                    centerY +
                    Math.sin(angle) *
                    7;


                const endX =
                    centerX +
                    Math.cos(angle) *
                    distance /
                    4;


                const endY =
                    centerY +
                    Math.sin(angle) *
                    distance /
                    4;


                const duration =
                    1.8 +
                    Math.random() *
                    2.2;


                const delay =
                    Math.random() *
                    2;


                gsap.set(
                    sparkle,
                    {

                        left:
                            `${startX}%`,

                        top:
                            `${startY}%`,

                        scale: 0,

                        opacity: 0

                    }
                );


                const timeline =
                    gsap.timeline({

                        delay:

                            delay,

                        onComplete:
                            () => {

                                animateSparkle(
                                    sparkle
                                );

                            }

                    });


                timeline.to(
                    sparkle,
                    {

                        scale:
                            0.7 +
                            Math.random() *
                            0.8,

                        opacity:
                            0.9,

                        duration:
                            0.25,

                        ease:
                            "power2.out"

                    }
                );


                timeline.to(
                    sparkle,
                    {

                        left:
                            `${endX}%`,

                        top:
                            `${endY}%`,

                        scale:
                            0.15,

                        opacity:
                            0,

                        duration:
                            duration,

                        ease:
                            "power1.out"

                    }
                );

            }


            sparkles.forEach(
                animateSparkle
            );

        }


        /* =====================================================
           HOW WE WORK
        ====================================================== */

        const howWorkSection =
            document.querySelector(
                ".how-work-section"
            );


        if (
            hasGSAP &&
            hasScrollTrigger &&
            howWorkSection
        ) {


            /* ================================================
               HEADER
            ================================================= */

            gsap.from(
                ".how-work-header > *",
                {

                    scrollTrigger: {

                        trigger:
                            ".how-work-section",

                        start:
                            "top 75%",

                        once:
                            true

                    },

                    opacity: 0,

                    y: 35,

                    duration: 0.8,

                    stagger: 0.12,

                    ease:
                        "power3.out"

                }
            );


            /* ================================================
               CONNECTING LINE
            ================================================= */

            const timelinePath =
                document.querySelector(
                    ".timeline-line"
                );


            if (timelinePath) {

                const pathLength =
                    timelinePath.getTotalLength();


                gsap.set(
                    timelinePath,
                    {

                        strokeDasharray:
                            pathLength,

                        strokeDashoffset:
                            pathLength

                    }
                );


                gsap.to(
                    timelinePath,
                    {

                        strokeDashoffset:
                            0,

                        duration:
                            2.2,

                        ease:
                            "power2.inOut",

                        scrollTrigger: {

                            trigger:
                                ".process-timeline",

                            start:
                                "top 70%",

                            once:
                                true

                        }

                    }
                );

            }


            /* ================================================
               CARDS
            ================================================= */

            gsap.from(
                ".work-card",
                {

                    scrollTrigger: {

                        trigger:
                            ".process-timeline",

                        start:
                            "top 75%",

                        once:
                            true

                    },

                    opacity: 0,

                    y: 35,

                    duration: 0.7,

                    stagger: 0.15,

                    ease:
                        "power3.out"

                }
            );


            /* ================================================
               FOOTER
            ================================================= */

            gsap.from(
                ".how-work-footer",
                {

                    scrollTrigger: {

                        trigger:
                            ".how-work-footer",

                        start:
                            "top 90%",

                        once:
                            true

                    },

                    opacity: 0,

                    y: 20,

                    duration: 0.7,

                    ease:
                        "power2.out"

                }
            );

        }


        /* =====================================================
           PRINCIPLES — CONNECTED FLOW
        ====================================================== */

        const principlesSection =
            document.querySelector(
                ".principles-section"
            );

        const principlesLine =
            document.querySelector(
                ".principles-line"
            );

        const principlesGlow =
            document.querySelector(
                ".principles-line-glow"
            );

        const principleCards =
            document.querySelectorAll(
                ".principle-card"
            );

        const travelDot =
            document.querySelector(
                ".principle-travel-dot"
            );


        if (
            hasGSAP &&
            hasScrollTrigger &&
            principlesSection &&
            principlesLine &&
            principleCards.length
        ) {


            /* ================================================
               LINE LENGTH
            ================================================= */

            const lineLength =
                principlesLine.getTotalLength();


            gsap.set(
                principlesLine,
                {

                    strokeDasharray:
                        lineLength,

                    strokeDashoffset:
                        lineLength

                }
            );


            if (principlesGlow) {

                gsap.set(
                    principlesGlow,
                    {

                        strokeDasharray:
                            lineLength,

                        strokeDashoffset:
                            lineLength,

                        opacity: 0

                    }
                );

            }


            /* ================================================
               CARD INITIAL STATE
            ================================================= */

            gsap.set(
                principleCards,
                {

                    opacity: 0,

                    y: 35,

                    scale: 0.97

                }
            );


            if (travelDot) {

                gsap.set(
                    travelDot,
                    {

                        opacity: 0

                    }
                );

            }


            /* ================================================
               MAIN TIMELINE
            ================================================= */

            const principlesTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            principlesSection,

                        start:
                            "top 70%",

                        once:
                            true

                    }

                });


            /* ================================================
               LINE DRAW
            ================================================= */

            principlesTimeline.to(
                principlesLine,
                {

                    strokeDashoffset:
                        0,

                    duration:
                        2.4,

                    ease:
                        "power2.inOut"

                }
            );


            /* ================================================
               GLOW
            ================================================= */

            if (principlesGlow) {

                principlesTimeline.to(
                    principlesGlow,
                    {

                        strokeDashoffset:
                            0,

                        opacity:
                            0.5,

                        duration:
                            2.4,

                        ease:
                            "power2.inOut"

                    },
                    "<"
                );

            }


            /* ================================================
               CARD 01
            ================================================= */

            principlesTimeline.to(
                ".principle-01",
                {

                    opacity: 1,

                    y: 0,

                    scale: 1,

                    duration: 0.65,

                    ease:
                        "power3.out"

                },
                "-=1.8"
            );


            /* ================================================
               CARD 02
            ================================================= */

            principlesTimeline.to(
                ".principle-02",
                {

                    opacity: 1,

                    y: 0,

                    scale: 1,

                    duration: 0.65,

                    ease:
                        "power3.out"

                },
                "-=.35"
            );


            /* ================================================
               CARD 03
            ================================================= */

            principlesTimeline.to(
                ".principle-03",
                {

                    opacity: 1,

                    y: 0,

                    scale: 1,

                    duration: 0.65,

                    ease:
                        "power3.out"

                },
                "-=.35"
            );


            /* ================================================
               CARD 04
            ================================================= */

            principlesTimeline.to(
                ".principle-04",
                {

                    opacity: 1,

                    y: 0,

                    scale: 1,

                    duration: 0.65,

                    ease:
                        "power3.out"

                },
                "-=.35"
            );


            /* ================================================
               TRAVELLING DOT

               Native SVG animation.
               No MotionPathPlugin required.
            ================================================= */

            if (travelDot) {

                const dotProgress = {
                    value: 0
                };


                principlesTimeline.to(
                    travelDot,
                    {

                        opacity:
                            1,

                        duration:
                            0.2

                    },
                    "-=2.2"
                );


                principlesTimeline.to(
                    dotProgress,
                    {

                        value:
                            1,

                        duration:
                            2.4,

                        ease:
                            "power1.inOut",

                        onUpdate:
                            () => {

                                const point =
                                    principlesLine.getPointAtLength(
                                        dotProgress.value *
                                        lineLength
                                    );


                                const svg =
                                    principlesLine.closest(
                                        "svg"
                                    );


                                if (!svg) {
                                    return;
                                }


                                const svgRect =
                                    svg.getBoundingClientRect();


                                const viewBox =
                                    svg.viewBox
                                        .baseVal;


                                const x =
                                    (
                                        point.x /
                                        viewBox.width
                                    ) *
                                    svgRect.width;


                                const y =
                                    (
                                        point.y /
                                        viewBox.height
                                    ) *
                                    svgRect.height;


                                const flowRect =
                                    principlesSection
                                        .querySelector(
                                            ".principles-flow"
                                        )
                                        .getBoundingClientRect();


                                travelDot.style.left =
                                    `${
                                        x +
                                        svgRect.left -
                                        flowRect.left
                                    }px`;


                                travelDot.style.top =
                                    `${
                                        y +
                                        svgRect.top -
                                        flowRect.top
                                    }px`;

                            }

                    },
                    "<"
                );


                /* ============================================
                   DOT FADE
                ============================================ */

                principlesTimeline.to(
                    travelDot,
                    {

                        opacity:
                            0,

                        duration:
                            0.25

                    }
                );

            }


            /* ================================================
               FINAL GLOW
            ================================================= */

            if (principlesGlow) {

                principlesTimeline.to(
                    principlesGlow,
                    {

                        opacity:
                            0,

                        duration:
                            0.5

                    }
                );

            }

        }


        /* =====================================================
           PREMIUM REGIONAL PRESENCE
        ====================================================== */

        const premiumRegionalSection =
            document.querySelector(
                ".regional-section"
            );

        const routes =
            document.querySelectorAll(
                ".region-route"
            );

        const nodes =
            document.querySelectorAll(
                ".region-node"
            );


        if (
            hasGSAP &&
            hasScrollTrigger &&
            premiumRegionalSection &&
            routes.length
        ) {


            /* ================================================
               PARTICLES
            ================================================= */

            const particles = {

                singapore:
                    document.querySelector(
                        ".particle-singapore"
                    ),

                indonesia:
                    document.querySelector(
                        ".particle-indonesia"
                    ),

                thailand:
                    document.querySelector(
                        ".particle-thailand"
                    ),

                india:
                    document.querySelector(
                        ".particle-india"
                    ),

                uae:
                    document.querySelector(
                        ".particle-uae"
                    ),

                saudi:
                    document.querySelector(
                        ".particle-saudi"
                    )

            };


            /* ================================================
               ROUTE LENGTH
            ================================================= */

            routes.forEach(
                (route) => {

                    const length =
                        route.getTotalLength();


                    gsap.set(
                        route,
                        {

                            strokeDasharray:
                                length,

                            strokeDashoffset:
                                length

                        }
                    );

                }
            );


            /* ================================================
               MASTER TIMELINE
            ================================================= */

            const regionalTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            premiumRegionalSection,

                        start:
                            "top top",

                        end:
                            "+=1900",

                        scrub:
                            1,

                        pin:
                            true,

                        anticipatePin:
                            1

                    }

                });


            /* ================================================
               CONTENT REVEAL
            ================================================= */

            regionalTimeline.fromTo(
                ".regional-content",
                {

                    opacity:
                        0,

                    y:
                        35

                },
                {

                    opacity:
                        1,

                    y:
                        0,

                    duration:
                        0.7,

                    ease:
                        "power3.out"

                }
            );


            /* ================================================
               HELPER
            ================================================= */

            function addRegionalRoute(
                index,
                nodeSelector,
                particle
            ) {

                const route =
                    routes[index];


                if (!route) {
                    return;
                }


                regionalTimeline.to(
                    route,
                    {

                        strokeDashoffset:
                            0,

                        duration:
                            0.8,

                        ease:
                            "none"

                    }
                );


                if (
                    nodeSelector
                ) {

                    regionalTimeline.to(
                        nodeSelector,
                        {

                            opacity:
                                1,

                            y:
                                0,

                            duration:
                                0.3,

                            ease:
                                "power2.out"

                        },
                        "<0.45"
                    );

                }


                animateParticle(
                    particle,
                    regionalTimeline,
                    route
                );

            }


            /* ================================================
               SIX CONNECTIONS
            ================================================= */

            addRegionalRoute(
                0,
                ".node-singapore",
                particles.singapore
            );


            addRegionalRoute(
                1,
                ".node-indonesia",
                particles.indonesia
            );


            addRegionalRoute(
                2,
                ".node-thailand",
                particles.thailand
            );


            addRegionalRoute(
                3,
                ".node-india",
                particles.india
            );


            addRegionalRoute(
                4,
                ".node-uae",
                particles.uae
            );


            addRegionalRoute(
                5,
                ".node-saudi",
                particles.saudi
            );


            /* ================================================
               FINAL EMPHASIS
            ================================================= */

            regionalTimeline.to(
                routes,
                {

                    strokeOpacity:
                        0.42,

                    duration:
                        0.5,

                    stagger:
                        0.03,

                    ease:
                        "power2.out"

                }
            );


            /* ================================================
               SCROLL INDICATOR
            ================================================= */

            gsap.to(
                ".scroll-line",
                {

                    scaleX:
                        0.3,

                    scrollTrigger: {

                        trigger:
                            premiumRegionalSection,

                        start:
                            "top top",

                        end:
                            "+=1900",

                        scrub:
                            true

                    }

                }
            );

        }


        /* =====================================================
           FINAL CTA — LEGACY SUPPORT
        ====================================================== */

        const finalCTA =
            document.querySelector(
                ".final-cta-section"
            );


        if (
            hasGSAP &&
            hasScrollTrigger &&
            finalCTA
        ) {

            gsap.from(
                ".cta-content > *",
                {

                    scrollTrigger: {

                        trigger:
                            ".final-cta-section",

                        start:
                            "top 70%",

                        once:
                            true

                    },

                    opacity:
                        0,

                    y:
                        35,

                    duration:
                        0.8,

                    stagger:
                        0.12,

                    ease:
                        "power3.out"

                }
            );


            gsap.from(
                ".final-cta-section .cta-character",
                {

                    scrollTrigger: {

                        trigger:
                            ".final-cta-section",

                        start:
                            "top 75%",

                        once:
                            true

                    },

                    opacity:
                        0,

                    y:
                        20,

                    scale:
                        0.98,

                    duration:
                        1.2,

                    ease:
                        "power3.out"

                }
            );

        }


        /* =====================================================
           REFRESH SCROLLTRIGGER AFTER PAGE LOAD
           
           Helps when images change section dimensions.
        ====================================================== */

        if (
            hasGSAP &&
            hasScrollTrigger
        ) {

            window.addEventListener(
                "load",
                () => {

                    ScrollTrigger.refresh();

                }
            );

        }

    }
);


/* =========================================================
   REGIONAL PARTICLE FUNCTION
========================================================= */

function animateParticle(
    particle,
    timeline,
    path
) {

    if (
        !particle ||
        !timeline ||
        !path
    ) {
        return;
    }


    const pathLength =
        path.getTotalLength();


    const progress = {
        value: 0
    };


    timeline.to(
        progress,
        {

            value:
                1,

            duration:
                0.7,

            ease:
                "power1.inOut",

            onUpdate:
                () => {

                    const point =
                        path.getPointAtLength(
                            progress.value *
                            pathLength
                        );


                    particle.style.left =
                        `${
                            point.x /
                            800 *
                            100
                        }%`;


                    particle.style.top =
                        `${
                            point.y /
                            650 *
                            100
                        }%`;

                }

        }
    );


    timeline.to(
        particle,
        {

            opacity:
                1,

            duration:
                0.15

        },
        "<"
    );


    timeline.to(
        particle,
        {

            opacity:
                0,

            duration:
                0.15

        }
    );

} 
    /* =====================================================
   CLOSING — FINAL STRATEGIC CTA
===================================================== */

const closingSection =
    document.querySelector(
        ".closing-section"
    );


if (
    hasGSAP &&
    hasScrollTrigger &&
    closingSection
) {

    const closingCard =
        closingSection.querySelector(
            ".closing-card"
        );

    const closingContent =
        closingSection.querySelector(
            ".closing-content"
        );

    const closingMeta =
        closingSection.querySelector(
            ".closing-meta"
        );


    /* ============================================
       CARD REVEAL
    ============================================ */

    gsap.from(
        closingCard,
        {

            scrollTrigger: {

                trigger:
                    closingSection,

                start:
                    "top 78%",

                once:
                    true

            },

            opacity: 0,

            y: 45,

            scale: .97,

            duration: 1,

            ease:
                "power3.out"

        }
    );


    /* ============================================
       CONTENT REVEAL
    ============================================ */

    if (closingContent) {

        gsap.from(
            closingContent.children,
            {

                scrollTrigger: {

                    trigger:
                        closingSection,

                    start:
                        "top 72%",

                    once:
                        true

                },

                opacity: 0,

                y: 28,

                duration: .7,

                stagger: .12,

                ease:
                    "power3.out"

            }
        );

    }


    /* ============================================
       META REVEAL
    ============================================ */

    if (closingMeta) {

        gsap.from(
            closingMeta,
            {

                scrollTrigger: {

                    trigger:
                        closingSection,

                    start:
                        "top 68%",

                    once:
                        true

                },

                opacity: 0,

                y: 12,

                duration: .6,

                ease:
                    "power2.out"

            }
        );

    }


    /* ============================================
       MOUSE PARALLAX
       Very subtle
    ============================================ */

    if (
        window.matchMedia(
            "(hover: hover)"
        ).matches
    ) {

        closingSection.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    closingSection
                        .getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    .5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;


                gsap.to(
                    ".flow-shape-one",
                    {

                        x:
                            x * 18,

                        y:
                            y * 10,

                        duration:
                            .8,

                        ease:
                            "power2.out",

                        overwrite:
                            "auto"

                    }
                );


                gsap.to(
                    ".flow-shape-two",
                    {

                        x:
                            x * -12,

                        y:
                            y * -7,

                        duration:
                            1,

                        ease:
                            "power2.out",

                        overwrite:
                            "auto"

                    }
                );


                gsap.to(
                    ".closing-card-light",
                    {

                        x:
                            x * 15,

                        y:
                            y * 10,

                        duration:
                            1.2,

                        ease:
                            "power2.out",

                        overwrite:
                            "auto"

                    }
                );

            }
        );


        closingSection.addEventListener(
            "mouseleave",
            () => {

                gsap.to(
                    [
                        ".flow-shape-one",
                        ".flow-shape-two",
                        ".closing-card-light"
                    ],
                    {

                        x: 0,

                        y: 0,

                        duration: 1,

                        ease:
                            "power3.out"

                    }
                );

            }
        );

    }

}
/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const hamburger =
    document.querySelector(".hamburger");

const navLinks =
    document.querySelector(".nav-links");


if (hamburger && navLinks) {

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen =
            navLinks.classList.toggle("mobile-open");

        hamburger.setAttribute(
            "aria-expanded",
            isOpen
        );

        hamburger.classList.toggle(
            "is-open",
            isOpen
        );

    });

    // Close when clicking any nav link
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-open");
            hamburger.classList.remove("is-open");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove("mobile-open");
            hamburger.classList.remove("is-open");
            hamburger.setAttribute("aria-expanded", "false");
        }
    });

}

/* =========================================================
   JADE LIGHT — HOME PAGE SCROLL ANIMATIONS
   ---------------------------------------------------------
   IMPORTANT:
   HOW WE WORK       → untouched
   REGIONAL PRESENCE → untouched
   FINAL CTA         → untouched

   HERO:
   Text animation only.
   NO background zoom.
   NO video parallax.
   NO overlay animation.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    /* =====================================================
       CHECK HOME PAGE
    ===================================================== */

    const homeHero =
        document.querySelector(".hero");

    if (!homeHero) {
        return;
    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reduceMotion) {
        return;
    }


    /* =====================================================
       RESPONSIVE VALUES
    ===================================================== */

    const isMobile =
        window.matchMedia(
            "(max-width: 700px)"
        ).matches;


    /* =====================================================
       HERO — INITIAL TEXT REVEAL
       -----------------------------------------------------
       Background video is NOT touched.
    ===================================================== */

    const heroContent =
        document.querySelector(".hero-content");

    const heroHeading =
        document.querySelector(".hero-content h1");

    const heroParagraph =
        document.querySelector(".hero-content p");

    const heroButtons =
        document.querySelector(".hero-buttons");


    if (heroContent) {

        gsap.set(
            heroHeading,
            {
                opacity: 0,
                y: isMobile ? 35 : 55
            }
        );

        gsap.set(
            heroParagraph,
            {
                opacity: 0,
                y: isMobile ? 20 : 28
            }
        );

        gsap.set(
            heroButtons,
            {
                opacity: 0,
                y: isMobile ? 15 : 20
            }
        );


        const heroTimeline =
            gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });


        if (heroHeading) {

            heroTimeline.to(
                heroHeading,
                {
                    opacity: 1,
                    y: 0,
                    duration: 1
                }
            );

        }


        if (heroParagraph) {

            heroTimeline.to(
                heroParagraph,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7
                },
                "-=0.55"
            );

        }


        if (heroButtons) {

            heroTimeline.to(
                heroButtons,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6
                },
                "-=0.4"
            );

        }

    }


    /* =====================================================
       HERO — SCROLL TEXT EFFECT ONLY
       -----------------------------------------------------
       Video / overlay / background:
       NOTHING HAPPENS.
    ===================================================== */

    if (heroContent) {

        gsap.to(
            heroContent,
            {
                y: isMobile ? -45 : -80,
                opacity: 0,

                ease: "none",

                scrollTrigger: {

                    trigger: homeHero,

                    start: "top top",

                    end: "65% top",

                    scrub: 1

                }
            }
        );

    }


    /* =====================================================
       ABOUT SECTION
       -----------------------------------------------------
       Left content enters from left.
       Right values enter from right.
    ===================================================== */

    const aboutSection =
        document.querySelector(
            ".about-section"
        );


    if (aboutSection) {

        const aboutContent =
            aboutSection.querySelector(
                ".about-content"
            );

        const aboutSide =
            aboutSection.querySelector(
                ".about-side"
            );

        const aboutHeading =
            aboutSection.querySelector(
                ".about-content h2"
            );

        const aboutParagraphs =
            aboutSection.querySelectorAll(
                ".about-content p"
            );

        const aboutButton =
            aboutSection.querySelector(
                ".about-button"
            );


        /* ================================================
           LEFT CONTENT
        ================================================= */

        if (aboutContent) {

            gsap.from(
                aboutContent,
                {
                    opacity: 0,
                    x: isMobile ? 0 : -65,
                    y: isMobile ? 40 : 0,

                    duration: 1,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: aboutSection,

                        start: "top 75%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           HEADING
        ================================================= */

        if (aboutHeading) {

            gsap.from(
                aboutHeading,
                {
                    opacity: 0,
                    y: 35,

                    duration: 0.8,

                    delay: 0.12,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: aboutSection,

                        start: "top 72%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           PARAGRAPHS
        ================================================= */

        if (aboutParagraphs.length) {

            gsap.from(
                aboutParagraphs,
                {
                    opacity: 0,
                    y: 25,

                    duration: 0.65,

                    stagger: 0.12,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: aboutSection,

                        start: "top 65%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           BUTTON
        ================================================= */

        if (aboutButton) {

            gsap.from(
                aboutButton,
                {
                    opacity: 0,
                    y: 20,

                    duration: 0.65,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: aboutSection,

                        start: "top 60%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           RIGHT VALUES
        ================================================= */

        if (aboutSide) {

            gsap.from(
                aboutSide,
                {
                    opacity: 0,
                    x: isMobile ? 0 : 75,
                    y: isMobile ? 35 : 0,

                    duration: 1.1,

                    delay: 0.15,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: aboutSection,

                        start: "top 68%",

                        once: true

                    }
                }
            );

        }

    }


    /* =====================================================
       SOLUTIONS SECTION
       -----------------------------------------------------
       Cards reveal one by one.
       Jade center appears softly.
    ===================================================== */

    const solutionsSection =
        document.querySelector(
            ".solutions-section"
        );


    if (solutionsSection) {

        const solutionsTop =
            solutionsSection.querySelector(
                ".solutions-top"
            );

        const solutionCards =
            solutionsSection.querySelectorAll(
                ".sol-card"
            );

        const solutionCenter =
            solutionsSection.querySelector(
                ".solution-center"
            );


        /* ================================================
           HEADER
        ================================================= */

        if (solutionsTop) {

            gsap.from(
                solutionsTop,
                {
                    opacity: 0,
                    y: 25,

                    duration: 0.75,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: solutionsSection,

                        start: "top 80%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           SOLUTION CARDS
        ================================================= */

        if (solutionCards.length) {

            gsap.from(
                solutionCards,
                {
                    opacity: 0,
                    y: 55,
                    scale: 0.96,

                    duration: 0.8,

                    stagger: 0.13,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: solutionsSection,

                        start: "top 68%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           JADE CENTER
        ================================================= */

        if (solutionCenter) {

            gsap.from(
                solutionCenter,
                {
                    opacity: 0,
                    scale: 0.82,

                    duration: 1.15,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: solutionsSection,

                        start: "top 65%",

                        once: true

                    }
                }
            );

        }

    }


    /* =====================================================
       APPROACH SECTION
       -----------------------------------------------------
       Security visual from left.
       Content from right.
    ===================================================== */

    const approachSection =
        document.querySelector(
            ".approach-section"
        );


    if (approachSection) {

        const approachLeft =
            approachSection.querySelector(
                ".approach-left"
            );

        const approachRight =
            approachSection.querySelector(
                ".approach-right"
            );

        const approachLabel =
            approachSection.querySelector(
                ".approach-label"
            );

        const approachHeading =
            approachSection.querySelector(
                ".approach-right h2"
            );

        const approachLine =
            approachSection.querySelector(
                ".approach-line"
            );

        const approachParagraphs =
            approachSection.querySelectorAll(
                ".approach-right p"
            );

        const approachButton =
            approachSection.querySelector(
                ".approach-right .about-button"
            );


        /* ================================================
           LEFT SECURITY VISUAL
        ================================================= */

        if (approachLeft) {

            gsap.from(
                approachLeft,
                {
                    opacity: 0,
                    x: isMobile ? 0 : -70,
                    y: isMobile ? 35 : 0,

                    duration: 1.1,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: approachSection,

                        start: "top 72%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           RIGHT CONTENT
        ================================================= */

        if (approachRight) {

            gsap.from(
                approachRight,
                {
                    opacity: 0,
                    x: isMobile ? 0 : 70,
                    y: isMobile ? 35 : 0,

                    duration: 1,

                    delay: 0.1,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: approachSection,

                        start: "top 70%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           LABEL
        ================================================= */

        if (approachLabel) {

            gsap.from(
                approachLabel,
                {
                    opacity: 0,
                    y: 20,

                    duration: 0.55,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: approachSection,

                        start: "top 68%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           HEADING
        ================================================= */

        if (approachHeading) {

            gsap.from(
                approachHeading,
                {
                    opacity: 0,
                    y: 30,

                    duration: 0.8,

                    delay: 0.1,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: approachSection,

                        start: "top 65%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           GREEN LINE
        ================================================= */

        if (approachLine) {

            gsap.from(
                approachLine,
                {
                    scaleX: 0,

                    transformOrigin:
                        "left center",

                    duration: 0.7,

                    delay: 0.2,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: approachSection,

                        start: "top 63%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           PARAGRAPHS
        ================================================= */

        if (approachParagraphs.length) {

            gsap.from(
                approachParagraphs,
                {
                    opacity: 0,
                    y: 22,

                    duration: 0.65,

                    stagger: 0.12,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: approachSection,

                        start: "top 60%",

                        once: true

                    }
                }
            );

        }


        /* ================================================
           BUTTON
        ================================================= */

        if (approachButton) {

            gsap.from(
                approachButton,
                {
                    opacity: 0,
                    y: 18,

                    duration: 0.6,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: approachSection,

                        start: "top 55%",

                        once: true

                    }
                }
            );

        }

    }


    /* =====================================================
       INDUSTRIES SECTION — SECTOR INDEX
       -----------------------------------------------------
       Masked heading reveal, row-by-row rule draw,
       sticky counter, cursor bubble, scrubbed rail.
    ===================================================== */

    const industriesSection =
        document.querySelector(
            ".industries-section"
        );

    if (industriesSection) {
        const atelierRows = industriesSection.querySelectorAll(".ind-atelier-row");
        const atelierHeader = industriesSection.querySelector(".ind-atelier-header");

        // 1. GSAP ScrollTrigger Entrance for Header
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && atelierHeader) {
            gsap.fromTo(atelierHeader, 
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: atelierHeader,
                        start: "top 88%",
                        once: true
                    }
                }
            );
        }

        // 2. Staggered Entrance for Editorial Rows
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && atelierRows.length) {
            gsap.fromTo(atelierRows,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.04,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".ind-atelier-list",
                        start: "top 88%",
                        once: true
                    }
                }
            );
        }
    }


    /* =====================================================
       REFRESH
       -----------------------------------------------------
       Important after images are loaded.
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            ScrollTrigger.refresh();

        }
    );

});