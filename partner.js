/* =========================================================
   AURAE PARTNERS PAGE
   GSAP + ScrollTrigger
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        console.warn("GSAP not loaded.");
        return;
    }

    if (typeof ScrollTrigger === "undefined") {
        console.warn("GSAP ScrollTrigger not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    /* =========================================================
   HERO INTRO
========================================================= */

const hero = document.querySelector(".aurae-hero");

if (hero) {

    const heroButton = document.querySelector(".aurae-hero-button");

    /* -----------------------------------------------------
       INITIAL BUTTON STATE
       Hidden before animation starts
    ----------------------------------------------------- */

    if (heroButton) {
        gsap.set(heroButton, {
            autoAlpha: 0,
            y: 35
        });
    }


    /* -----------------------------------------------------
       HERO TIMELINE
    ----------------------------------------------------- */

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });


    heroTimeline

        /* BACKGROUND */

        .from(".aurae-hero-bg", {
            scale: 1.12,
            duration: 2.2,
            ease: "power3.out"
        })


        /* NAV / BRAND */

        .from(".aurae-hero-brand", {
            y: -25,
            opacity: 0,
            duration: 0.8
        }, "-=1.5")


        /* LABEL */

        .from(".aurae-hero-label", {
            y: 35,
            opacity: 0,
            duration: 0.7
        }, "-=0.7")


        /* TITLE */

        .from(".hero-title-line", {
            y: 90,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out"
        }, "-=0.35")


        /* DESCRIPTION */

        .from(".aurae-hero-description", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.5");


    /* -----------------------------------------------------
       HERO BUTTON
       Separate animation — prevents visibility conflict
    ----------------------------------------------------- */

    if (heroButton) {

        heroTimeline.to(heroButton, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
            clearProps: "transform"
        }, "-=0.2");

    }


    /* -----------------------------------------------------
       SIDE TEXT
    ----------------------------------------------------- */

    heroTimeline.from(".aurae-hero-side", {
        x: 35,
        opacity: 0,
        duration: 0.8
    }, "-=0.6")


    /* -----------------------------------------------------
       SCROLL INDICATOR
    ----------------------------------------------------- */

    .from(".aurae-scroll", {
        opacity: 0,
        duration: 0.5
    }, "-=0.3");


    /* =====================================================
       HERO BACKGROUND SCROLL
    ===================================================== */

    gsap.to(".aurae-hero-bg", {
        yPercent: 8,
        ease: "none",

        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });


    /* =====================================================
       HERO CONTENT SCROLL
    ===================================================== */

    gsap.to(".aurae-hero-content", {
        y: -120,
        opacity: 0,
        ease: "none",

        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "70% top",
            scrub: 1
        }
    });


    /* =====================================================
       SIDE TEXT SCROLL
    ===================================================== */

    gsap.to(".aurae-hero-side", {
        y: -80,
        opacity: 0.25,
        ease: "none",

        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "70% top",
            scrub: 1
        }
    });


    /* =====================================================
       SCROLL LINE
    ===================================================== */

    gsap.to(".aurae-scroll-line span", {
        x: 32,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "power1.inOut"
    });


    /* =====================================================
       SCROLL ARROW
    ===================================================== */

    gsap.to(".aurae-scroll-arrow", {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut"
    });


    /* =====================================================
       HERO BUTTON MAGNETIC
    ===================================================== */

    if (heroButton && window.innerWidth > 700) {

        heroButton.addEventListener("mousemove", (event) => {

            const rect =
                heroButton.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            gsap.to(heroButton, {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.3,
                ease: "power2.out"
            });

        });


        heroButton.addEventListener("mouseleave", () => {

            gsap.to(heroButton, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1,.4)"
            });

        });

    }

}
    /* =========================================================
       ABOUT
    ========================================================= */

    const aboutSection =
        document.querySelector(".aurae-about");

    if (aboutSection) {

        gsap.from(".about-label", {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
                trigger: aboutSection,
                start: "top 78%",
                toggleActions: "play none none reverse"
            }
        });


        gsap.from(".aurae-about-heading h2", {
            y: 100,
            opacity: 0,
            duration: 1.1,
            ease: "power4.out",

            scrollTrigger: {
                trigger: aboutSection,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });


        gsap.from(".aurae-about-content", {
            x: 70,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
                trigger: aboutSection,
                start: "top 72%",
                toggleActions: "play none none reverse"
            }
        });


        gsap.from(".aurae-about-side", {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: aboutSection,
                start: "top 72%",
                toggleActions: "play none none reverse"
            }
        });


        gsap.from(".about-image-wrap", {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.1,
            ease: "power4.out",

            scrollTrigger: {
                trigger: aboutSection,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });


        gsap.from(".about-side-caption span", {
            y: 15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",

            scrollTrigger: {
                trigger: ".aurae-about-side",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

    }


    /* =========================================================
       SERVICES
    ========================================================= */

    const servicesSection =
        document.querySelector(".aurae-services");

    if (servicesSection) {

        gsap.from(".services-label", {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
                trigger: servicesSection,
                start: "top 78%",
                toggleActions: "play none none reverse"
            }
        });


        gsap.from(".services-heading-row h2", {
            y: 70,
            opacity: 0,
            duration: 1,
            ease: "power4.out",

            scrollTrigger: {
                trigger: servicesSection,
                start: "top 74%",
                toggleActions: "play none none reverse"
            }
        });


        gsap.from(".services-grid .service-card", {
            y: 80,
            opacity: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 82%",
                toggleActions: "play none none reverse"
            }
        });


        gsap.from(".services-bottom", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".services-bottom",
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });

    }


    /* =========================================================
       APPROACH
    ========================================================= */

    const approachSection =
        document.querySelector(".aurae-approach-section");

    if (approachSection) {

        /* LABEL */

        gsap.from(".aurae-approach-label", {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",

            scrollTrigger: {
                trigger: approachSection,
                start: "top 78%",
                toggleActions: "play none none reverse"
            }
        });


        /* BIG TEXT */

        gsap.from(".aurae-approach-display span", {
            x: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",

            scrollTrigger: {
                trigger: approachSection,
                start: "top 72%",
                toggleActions: "play none none reverse"
            }
        });


        /* CENTER CONTENT */

        gsap.from(".aurae-approach-content", {
            x: 70,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
                trigger: approachSection,
                start: "top 72%",
                toggleActions: "play none none reverse"
            }
        });


        /* =========================================
           PROCESS — FIXED
        ========================================= */

        gsap.from(
    ".aurae-approach-process-item",
    {
        x: 35,

        duration: .6,

        stagger: .1,

        ease: "power3.out",

        clearProps: "transform",

        scrollTrigger: {
            trigger:
                ".aurae-approach-process",

            start: "top 78%",

            toggleActions:
                "play none none reverse"
        }
    }
);


        /* DECORATIVE CIRCLE */

        gsap.from(".aurae-approach-circle", {
            scale: 0.7,
            opacity: 0,
            duration: 1.4,
            ease: "power3.out",

            scrollTrigger: {
                trigger: approachSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });


        /* CIRCLE ROTATION */

        gsap.to(".aurae-approach-circle", {
            rotation: 360,
            duration: 35,
            repeat: -1,
            ease: "none"
        });

    }


    /* =========================================================
       PARTNERSHIP
       REVEAL ANIMATION
    ========================================================= */

    const partnershipSection =
        document.querySelector(".aurae-partnership-section");

    if (partnershipSection) {

        const partnershipHeader =
            partnershipSection.querySelector(
                ".aurae-partnership-header"
            );

        const partnershipMain =
            partnershipSection.querySelector(
                ".aurae-partnership-main"
            );

        const auraeBrand =
            partnershipSection.querySelector(
                ".aurae-partnership-aurae"
            );

        const os2Brand =
            partnershipSection.querySelector(
                ".aurae-partnership-os2"
            );

        const partnershipCenter =
            partnershipSection.querySelector(
                ".aurae-partnership-center"
            );

        const auraeServices =
            partnershipSection.querySelectorAll(
                ".aurae-partnership-aurae .aurae-partnership-service"
            );

        const os2Services =
            partnershipSection.querySelectorAll(
                ".aurae-partnership-os2 .aurae-partnership-service"
            );


        /* HEADER */

        if (partnershipHeader) {

            gsap.from(partnershipHeader, {
                y: 70,
                opacity: 0,
                duration: 1,
                ease: "power4.out",

                scrollTrigger: {
                    trigger: partnershipSection,
                    start: "top 75%",
                    toggleActions:
                        "play none none reverse"
                }
            });

        }


        /* MAIN PARTNERSHIP */

        if (partnershipMain) {

            const timeline =
                gsap.timeline({
                    scrollTrigger: {
                        trigger: partnershipSection,
                        start: "top 65%",
                        toggleActions:
                            "play none none reverse"
                    }
                });


            /* LEFT AURAE */

            if (auraeBrand) {

                timeline.from(auraeBrand, {
                    x: -100,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power4.out"
                });

            }


            /* CENTER */

            if (partnershipCenter) {

                timeline.from(partnershipCenter, {
                    scale: 0.7,
                    opacity: 0,
                    duration: 0.9,
                    ease: "back.out(1.5)"
                }, "-=0.55");

            }


            /* RIGHT OS2 */

            if (os2Brand) {

                timeline.from(os2Brand, {
                    x: 100,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power4.out"
                }, "-=0.65");

            }


            /* AURAE SERVICES */

            if (auraeServices.length) {

                timeline.from(auraeServices, {
                    y: 30,
                    opacity: 0,
                    duration: 0.55,
                    stagger: 0.08,
                    ease: "power3.out"
                }, "-=0.4");

            }


            /* OS2 SERVICES */

            if (os2Services.length) {

                timeline.from(os2Services, {
                    y: 30,
                    opacity: 0,
                    duration: 0.55,
                    stagger: 0.08,
                    ease: "power3.out"
                }, "-=0.5");

            }

        }
    }


    /* =========================================================
       PARTNERSHIP CANVAS
       CONNECTION LINES
    ========================================================= */

    const section =
        document.querySelector(".aurae-partnership-section");

    const canvas =
        document.getElementById("auraePartnershipCanvas");

        function isMobilePartner() {
    return window.innerWidth <= 700;
}


    if (section && canvas) {

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }


        let width = 0;
        let height = 0;
        let dpr = 1;

        let animationFrame = null;
        let isRunning = false;

        let lineProgress = 0;


        const red = "#da1f33";
        const gold = "#ffb600";


        /* LINE SETTINGS */

        const lineWidth = 1.2;

        const animationSpeed = 0.0018;

        const centerX = 0.5;

        const leftX = 0.18;
        const rightX = 0.82;


        /* RESIZE */

        function resizeCanvas() {

            const rect =
                section.getBoundingClientRect();

            width = Math.max(rect.width, 1);
            height = Math.max(rect.height, 1);

            dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            );


            canvas.width =
                Math.floor(width * dpr);

            canvas.height =
                Math.floor(height * dpr);


            canvas.style.width =
                `${width}px`;

            canvas.style.height =
                `${height}px`;


            ctx.setTransform(
                1,
                0,
                0,
                1,
                0,
                0
            );

            ctx.scale(dpr, dpr);

        }


        /* POINT */

        function point(x, y) {

            return {
                x: width * x,
                y: height * y
            };

        }


        /* FLOW LINE */

        function drawFlowLine({
            start,
            control1,
            control2,
            end,
            color,
            opacity = 0.65
        }) {

            const p1 = point(
                start.x,
                start.y
            );

            const p2 = point(
                control1.x,
                control1.y
            );

            const p3 = point(
                control2.x,
                control2.y
            );

            const p4 = point(
                end.x,
                end.y
            );


            /* MAIN LINE */

            ctx.beginPath();

            ctx.moveTo(
                p1.x,
                p1.y
            );

            ctx.bezierCurveTo(
                p2.x,
                p2.y,
                p3.x,
                p3.y,
                p4.x,
                p4.y
            );


            ctx.strokeStyle = color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";

            ctx.stroke();


            /* MOVING GLOW */

            const t =
                (lineProgress * 0.45) % 1;


            const glowPoint =
                getBezierPoint(
                    p1,
                    p2,
                    p3,
                    p4,
                    t
                );


            const gradient =
                ctx.createRadialGradient(
                    glowPoint.x,
                    glowPoint.y,
                    0,
                    glowPoint.x,
                    glowPoint.y,
                    20
                );


            gradient.addColorStop(
                0,
                color
            );

            gradient.addColorStop(
                1,
                "rgba(0,0,0,0)"
            );


            ctx.beginPath();

            ctx.arc(
                glowPoint.x,
                glowPoint.y,
                8,
                0,
                Math.PI * 2
            );


            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.18;

            ctx.fill();

            ctx.globalAlpha = 1;

        }


        /* BEZIER */

        function getBezierPoint(
            p0,
            p1,
            p2,
            p3,
            t
        ) {

            const inverse = 1 - t;

            return {

                x:
                    inverse * inverse * inverse * p0.x +
                    3 * inverse * inverse * t * p1.x +
                    3 * inverse * t * t * p2.x +
                    t * t * t * p3.x,

                y:
                    inverse * inverse * inverse * p0.y +
                    3 * inverse * inverse * t * p1.y +
                    3 * inverse * t * t * p2.y +
                    t * t * t * p3.y

            };

        }


        /* CONNECTIONS */

        function drawConnections() {

             if (isMobilePartner()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

            const center = centerX;


            /* AURAE UPPER */

            drawFlowLine({

                start: {
                    x: leftX,
                    y: 0.58
                },

                control1: {
                    x: 0.28,
                    y: 0.58
                },

                control2: {
                    x: 0.38,
                    y: 0.68
                },

                end: {
                    x: center,
                    y: 0.70
                },

                color: red,
                opacity: 0.62

            });


            /* AURAE LOWER */

            drawFlowLine({

                start: {
                    x: leftX,
                    y: 0.76
                },

                control1: {
                    x: 0.28,
                    y: 0.76
                },

                control2: {
                    x: 0.38,
                    y: 0.72
                },

                end: {
                    x: center,
                    y: 0.70
                },

                color: red,
                opacity: 0.62

            });


            /* OS2 UPPER */

            drawFlowLine({

                start: {
                    x: rightX,
                    y: 0.58
                },

                control1: {
                    x: 0.72,
                    y: 0.58
                },

                control2: {
                    x: 0.62,
                    y: 0.68
                },

                end: {
                    x: center,
                    y: 0.70
                },

                color: gold,
                opacity: 0.62

            });


            /* OS2 LOWER */

            drawFlowLine({

                start: {
                    x: rightX,
                    y: 0.76
                },

                control1: {
                    x: 0.72,
                    y: 0.76
                },

                control2: {
                    x: 0.62,
                    y: 0.72
                },

                end: {
                    x: center,
                    y: 0.70
                },

                color: gold,
                opacity: 0.62

            });

        }


        /* CENTER GLOW */

        function drawCenterPoint() {

            const x =
                width * 0.5;

            const y =
                height * 0.70;


            const glow =
                ctx.createRadialGradient(
                    x,
                    y,
                    0,
                    x,
                    y,
                    22
                );


            glow.addColorStop(
                0,
                "rgba(218, 31, 51, 0.45)"
            );

            glow.addColorStop(
                0.25,
                "rgba(218, 31, 51, 0.22)"
            );

            glow.addColorStop(
                0.6,
                "rgba(218, 31, 51, 0.07)"
            );

            glow.addColorStop(
                1,
                "rgba(218, 31, 51, 0)"
            );


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                22,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = glow;

            ctx.fill();


            /* RING */

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                4,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle =
                "rgba(218, 31, 51, 0.55)";

            ctx.lineWidth = 1;

            ctx.stroke();


            /* DOT */

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = red;

            ctx.shadowColor = red;
            ctx.shadowBlur = 10;

            ctx.fill();

            ctx.shadowBlur = 0;

        }


        /* RENDER */

        function render() {

            if (!isRunning) {
                return;
            }


            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            lineProgress += animationSpeed;


            if (lineProgress > 1) {
                lineProgress = 0;
            }


            drawConnections();

            drawCenterPoint();


            animationFrame =
                requestAnimationFrame(render);

        }


        /* START */

        function startAnimation() {

            if (isRunning) {
                return;
            }

            isRunning = true;

            render();

        }


        /* STOP */

        function stopAnimation() {

            isRunning = false;

            if (animationFrame) {

                cancelAnimationFrame(
                    animationFrame
                );

                animationFrame = null;

            }

        }


        /* RESIZE */

        let resizeTimer = null;

        window.addEventListener("resize", () => {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(() => {

                    stopAnimation();

                    resizeCanvas();

                    startAnimation();

                    ScrollTrigger.refresh();

                }, 150);

        });


        /* VISIBILITY */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    stopAnimation();

                } else {

                    startAnimation();

                }

            }
        );


        resizeCanvas();

        startAnimation();

    }


    /* =========================================================
       FINAL REFRESH
    ========================================================= */

    window.addEventListener("load", () => {

        setTimeout(() => {

            ScrollTrigger.refresh();

        }, 100);

    });

});


/* section 6*/

/* =========================================================
   VISION & MISSION
========================================================= */

const visionSection =
    document.querySelector(".aurae-vision-section");


if (visionSection) {

    const visionLabel =
        visionSection.querySelector(
            ".vision-label"
        );

    const visionTitle =
        visionSection.querySelector(
            ".vision-title"
        );

    const visionLine =
        visionSection.querySelector(
            ".vision-small-line"
        );

    const visionIntro =
        visionSection.querySelector(
            ".vision-intro-text"
        );

    const visionMeta =
        visionSection.querySelector(
            ".vision-meta"
        );

    const visionCards =
        visionSection.querySelectorAll(
            ".vision-card"
        );


    /* =====================================================
       LABEL
    ===================================================== */

    if (visionLabel) {

        gsap.from(
            visionLabel,
            {
                x: -35,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: visionSection,
                    start: "top 78%",
                    toggleActions:
                        "play none none reverse"
                }
            }
        );

    }


    /* =====================================================
       TITLE
    ===================================================== */

    if (visionTitle) {

        gsap.from(
            visionTitle,
            {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power4.out",

                scrollTrigger: {
                    trigger: visionSection,
                    start: "top 72%",
                    toggleActions:
                        "play none none reverse"
                }
            }
        );

    }


    /* =====================================================
       RED LINE
    ===================================================== */

    if (visionLine) {

        gsap.from(
            visionLine,
            {
                scaleX: 0,
                transformOrigin:
                    "left center",

                duration: 0.7,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: visionSection,
                    start: "top 70%",
                    toggleActions:
                        "play none none reverse"
                }
            }
        );

    }


    /* =====================================================
       INTRO TEXT
    ===================================================== */

    if (visionIntro) {

        gsap.from(
            visionIntro,
            {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: visionSection,
                    start: "top 68%",
                    toggleActions:
                        "play none none reverse"
                }
            }
        );

    }


    /* =====================================================
       META
    ===================================================== */

    if (visionMeta) {

        gsap.from(
            visionMeta,
            {
                y: 20,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: visionSection,
                    start: "top 65%",
                    toggleActions:
                        "play none none reverse"
                }
            }
        );

    }


    /* =====================================================
       CARDS
    ===================================================== */

    if (visionCards.length) {

        gsap.from(
            visionCards,
            {
                y: 90,
                opacity: 0,
                duration: 1,
                stagger: 0.18,
                ease: "power4.out",

                scrollTrigger: {
                    trigger:
                        ".vision-cards",

                    start: "top 78%",

                    toggleActions:
                        "play none none reverse"
                }
            }
        );

    }


    /* =====================================================
       CARD IMAGE REVEAL
    ===================================================== */

    visionCards.forEach(
        (card) => {

            const image =
                card.querySelector(
                    ".vision-card-image img"
                );

            const icon =
                card.querySelector(
                    ".vision-icon"
                );


            if (image) {

                gsap.from(
                    image,
                    {
                        scale: 1.18,

                        duration: 1.5,

                        ease:
                            "power3.out",

                        scrollTrigger: {
                            trigger: card,

                            start: "top 82%",

                            toggleActions:
                                "play none none reverse"
                        }
                    }
                );

            }


            /* ICON */

            if (icon) {

                gsap.from(
                    icon,
                    {
                        scale: 0.6,
                        opacity: 0,
                        duration: 0.7,

                        ease:
                            "back.out(1.7)",

                        scrollTrigger: {
                            trigger: card,

                            start: "top 75%",

                            toggleActions:
                                "play none none reverse"
                        }
                    }
                );

            }

        }
    );

}