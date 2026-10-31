/* ---------- text reveal: split headline into words ---------- */
  function splitWords(el){
    if(el.dataset.split) return;
    el.dataset.split = 'true';
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = '';
    words.forEach(function(w,i){
      var outer = document.createElement('span');
      outer.className = 'reveal-word';
      outer.style.setProperty('--i', i);
      var inner = document.createElement('span');
      inner.textContent = w + '\u00A0';
      outer.appendChild(inner);
      el.appendChild(outer);
    });
    el.classList.add('reveal-text');
  }

  if(window.gsap && window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger); }

  /* ---------- GSAP: Industries mega-hero entrance + mini-grid stagger ---------- */
  function initIndustriesMegaHero(){
    var hero = document.getElementById('industriesMegaHero');
    if(!hero || hero.dataset.gsapDone || !window.gsap) return;
    hero.dataset.gsapDone = 'true';

    gsap.set('#industriesMegaHero .mega-hero-text > *', {opacity:0, y:24});
    gsap.set('#industriesMegaHero .mini-industry-grid .mini-card', {opacity:0, y:30});
    gsap.set('#industriesMegaHero .mega-hero-footer', {opacity:0});
    gsap.set('#industriesMegaHero .mega-hero-bg img', {scale:1.12});

    var tl = gsap.timeline({defaults:{ease:'power3.out'}});
    tl.to('#industriesMegaHero .mega-hero-bg img', {scale:1, duration:1.6, ease:'power2.out'}, 0)
      .to('#industriesMegaHero .mega-hero-text > *', {opacity:1, y:0, duration:.9, stagger:.12}, .2)
      .to('#industriesMegaHero .mini-industry-grid .mini-card', {opacity:1, y:0, duration:.6, stagger:.05}, .55)
      .to('#industriesMegaHero .mega-hero-footer', {opacity:1, duration:.6}, '-=.3');

    if(window.ScrollTrigger){
      gsap.to('#industriesMegaHero .mega-hero-bg img', {
        yPercent:8, ease:'none',
        scrollTrigger:{ trigger:hero, start:'top top', end:'bottom top', scrub:true }
      });
    }
  }

  /* ---------- single shared observer for all scroll reveals ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.18});

  function wireEyebrowLine(el){
    if(el.dataset.lined) return;
    el.dataset.lined = 'true';
    var line = document.createElement('span');
    line.className = 'eyebrow-line';
    el.appendChild(line);
    io.observe(el);
  }

  /* ---------- wire up a page's animations the first time it is shown ---------- */
  function initPage(name){
    var root = document.getElementById('page-'+name);
    if(!root) return;

    /* text reveal on every heading */
    root.querySelectorAll('h1, h2').forEach(function(el){
      splitWords(el);
      if(!el.dataset.observed){ el.dataset.observed = 'true'; io.observe(el); }
    });

    /* fade-rise reveal on cards / list items */
    root.querySelectorAll('.cell, .value-card, .step-cell, .leader-card, .form-card, .chip, .enquiry-item, .direct-card, .industry-card').forEach(function(el){
      if(!el.dataset.observed){
        el.dataset.observed = 'true';
        el.classList.add('reveal');
        io.observe(el);
      }
    });

    /* line-draw accent under every eyebrow label */
    root.querySelectorAll('.eyebrow').forEach(wireEyebrowLine);

    /* auto badge numbers for Industries cards (no eyebrow-num in markup) */
    if(name === 'industries'){
      initIndustriesMegaHero();
      root.querySelectorAll('.grid-3 .cell').forEach(function(el, i){
        if(el.dataset.badged) return;
        el.dataset.badged = 'true';
        var badge = document.createElement('span');
        badge.className = 'card-badge';
        badge.textContent = String(i+1).padStart(2,'0');
        el.insertBefore(badge, el.firstChild);
      });
    }

    /* image masking: colour-panel wipe on the callout band */
    root.querySelectorAll('.band').forEach(function(el){
      if(!el.dataset.observed){ el.dataset.observed = 'true'; el.classList.add('mask-reveal'); io.observe(el); }
    });

    /* image masking: circular reveal on the leadership avatar */
    root.querySelectorAll('.leader-avatar').forEach(function(el){
      if(!el.dataset.observed){ el.dataset.observed = 'true'; el.classList.add('mask-circle'); io.observe(el); }
    });

    /* line drawing: connector across the "How We Work" steps */
    var stepsBox = root.querySelector('.steps');
    if(stepsBox && !stepsBox.dataset.lined){
      stepsBox.dataset.lined = 'true';
      var svgNS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'steps-line');
      svg.setAttribute('viewBox', '0 0 1000 3');
      svg.setAttribute('preserveAspectRatio', 'none');
      var path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', 'M0,1.5 L1000,1.5');
      svg.appendChild(path);
      stepsBox.appendChild(svg);
      io.observe(svg);
    }

    /* image masking: hero character wipe reveal (fires on page-load, not scroll) */
    root.querySelectorAll('.figure').forEach(function(fig){
      if(!fig.dataset.masked){
        fig.dataset.masked = 'true';
        fig.classList.add('mask-hidden');
        setTimeout(function(){ fig.classList.add('in'); }, 260);
      }
    });
  }

  /* ---------- page switching ---------- */
  function showPage(name){
    document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
    document.getElementById('page-'+name).classList.add('active');
    document.querySelectorAll('.nav-links button').forEach(function(b){
      b.classList.toggle('current', b.getAttribute('data-page') === name);
    });
    window.scrollTo({top:0, behavior:'instant'});
    initPage(name);
  }

  /* ---------- scroll transformation: hero parallax + header shadow ---------- */
  var ticking = false;
  window.addEventListener('scroll', function(){
    var homePage = document.getElementById('page-home');
    if(!homePage || !homePage.classList.contains('active')) return;
    if(!ticking){
      requestAnimationFrame(function(){
        var y = window.scrollY;
        var visual = document.querySelector('#page-home .hero-visual');
        var text = document.querySelector('#page-home .hero-text');
        if(visual) visual.style.transform = 'translateY(' + Math.min(y*0.12, 60) + 'px)';
        if(text) text.style.opacity = Math.max(1 - y/420, 0);
        var header = document.querySelector('header');
        if(header) header.classList.toggle('scrolled', y > 10);
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});

  initPage('home');

if (window.lucide) {
    lucide.createIcons();
}


/* =========================================================
   JADE LIGHT CONTACT PAGE — GSAP / FORM INTERACTIONS
   ========================================================= */

function initJadeLightContact(){

  var root = document.getElementById('page-contact');

  if(
    !root ||
    root.dataset.jlInit === 'true'
  ){
    return;
  }

  root.dataset.jlInit = 'true';


  /* ---------- LUCIDE ---------- */

  if(window.lucide){
    lucide.createIcons();
  }


  /* ---------- GSAP HERO ---------- */

  if(window.gsap){

    gsap.set(
      '.jl-contact-hero-copy > *',
      {
        opacity:0,
        y:22
      }
    );

    gsap.set(
      '.jl-contact-hero-art',
      {
        opacity:0,
        scale:1.04
      }
    );


    var tl = gsap.timeline({
      defaults:{
        ease:'power3.out'
      }
    });


    tl.to(
      '.jl-contact-hero-art',
      {
        opacity:1,
        scale:1,
        duration:1.15,
        ease:'power2.out'
      }
    )

    .to(
      '.jl-contact-hero-copy > *',
      {
        opacity:1,
        y:0,
        duration:.7,
        stagger:.12
      },
      '-=.7'
    );


    /* ---------- HERO PARALLAX ---------- */

    if(window.ScrollTrigger){

      gsap.to(
        '.jl-contact-hero-art img',
        {
          yPercent:6,
          ease:'none',

          scrollTrigger:{
            trigger:'.jl-contact-hero',
            start:'top top',
            end:'bottom top',
            scrub:true
          }
        }
      );

    }


    /* ---------- CARD REVEALS ---------- */

    gsap.utils
      .toArray('#page-contact .jl-reveal')
      .forEach(function(el){

        gsap.to(
          el,
          {
            opacity:1,
            y:0,
            duration:.75,
            ease:'power3.out',

            scrollTrigger:
              window.ScrollTrigger
              ?
              {
                trigger:el,
                start:'top 88%',
                once:true
              }
              :
              undefined
          }
        );

      });


    /* ---------- CTA PARALLAX ---------- */

    if(window.ScrollTrigger){

      gsap.to(
        '.jl-cta-art img',
        {
          scale:1.06,
          ease:'none',

          scrollTrigger:{
            trigger:'.jl-cta-card',
            start:'top bottom',
            end:'bottom top',
            scrub:true
          }
        }
      );

    }

  }


  /* ---------- ENQUIRY TYPE SELECTION ---------- */

  root
    .querySelectorAll('.jl-enquiry-item')
    .forEach(function(item){

      item.addEventListener(
        'click',
        function(){

          root
            .querySelectorAll('.jl-enquiry-item')
            .forEach(function(x){

              x.classList.remove('selected');

            });


          item.classList.add('selected');


          var service =
            document.getElementById('jlService');

          var wanted =
            item.dataset.service;


          if(service){

            service.value = wanted;

          }


          /* Small GSAP click animation */

          if(window.gsap){

            gsap.fromTo(
              item,

              {
                x:0
              },

              {
                x:6,
                duration:.12,
                yoyo:true,
                repeat:1
              }
            );

          }

        }
      );

    });


/* ---------- FORM ---------- */

var form = document.getElementById('jlContactForm');
var success = document.getElementById('jlFormSuccess');
var modal = document.getElementById('jlSuccessModal');
var modalText = document.getElementById('jlModalText');
var lastFocus = null;

function openModal() {
  lastFocus = document.activeElement;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  var btn = modal.querySelector('.jl-modal-btn');
  if (btn) btn.focus();
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

if (modal) {
  modal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });
}

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var btn = form.querySelector('.jl-submit');
    var data = Object.fromEntries(new FormData(form));

    btn.disabled = true;
    success.classList.remove('show');

    try {
      var res = await fetch('http://localhost:3000/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Request failed: ' + res.status);

      form.reset();
      openModal();

    } catch (err) {
      console.error(err);
      success.textContent = 'Something went wrong. Please try again.';
      success.classList.add('show');
      setTimeout(function () { success.classList.remove('show'); }, 4500);
    } finally {
      btn.disabled = false;
    }
  });
}

}


/* =========================================================
   INITIALISE CONTACT PAGE
   ========================================================= */

var _originalShowPage = window.showPage;


window.showPage = function(name){

  _originalShowPage(name);


  if(name === 'contact'){

    setTimeout(
      initJadeLightContact,
      40
    );

  }

};


if(document.readyState === 'loading'){

  document.addEventListener(
    'DOMContentLoaded',
    function(){

      if(
        document.getElementById('page-contact')
      ){

        initJadeLightContact();

      }

    }
  );

}
else{

  if(
    document.getElementById('page-contact')
  ){

    initJadeLightContact();

  }

}

/* Industry cards entrance animation */
if (
  name === "industries" &&
  window.gsap &&
  window.ScrollTrigger
) {
  gsap.fromTo(
    root.querySelectorAll(".industry-card"),
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      clearProps: "transform"
    }
  );
}

/* =====================================================
   SOLUTIONS PAGE — DESKTOP FIXED HORIZONTAL SCROLL
===================================================== */

(function () {
  let solutionsMM = null;
  let solutionsPageReady = false;

  function resetSolutionsPosition() {
    const page = document.querySelector("#page-solutions");
    const track = page?.querySelector(".division-track");

    if (!page || !track || !window.gsap) return;

    gsap.set(track, {
      x: 0,
      xPercent: 0,
      clearProps: "transform"
    });
  }

  function initSolutionsPage() {
    const page = document.querySelector("#page-solutions");
    const track = page?.querySelector(".division-track");
    const scrollSection = page?.querySelector(".division-scroll");
    const divisions = page?.querySelectorAll(".solution-division");

    if (!page || !track || !scrollSection || !divisions.length) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    if (solutionsMM) {
      solutionsMM.revert();
      solutionsMM = null;
    }

    resetSolutionsPosition();

    solutionsMM = gsap.matchMedia();

    /* ================= DESKTOP ================= */

    solutionsMM.add("(min-width: 1051px)", function () {
      gsap.set(track, {
        display: "flex",
        width: "400%",
        minWidth: "400%",
        x: 0,
        xPercent: 0
      });

      gsap.set(divisions, {
        display: "grid",
        flex: "0 0 25%",
        width: "25%",
        minWidth: "25%",
        maxWidth: "25%",
        opacity: 1,
        visibility: "visible"
      });

      const getScrollDistance = function () {
        return Math.max(
          0,
          track.scrollWidth - window.innerWidth
        );
      };

      gsap.to(track, {
        x: function () {
          return -getScrollDistance();
        },
        ease: "none",
        overwrite: true,
        scrollTrigger: {
          id: "solutionsHorizontalScroll",
          trigger: scrollSection,
          start: "top top",
          end: function () {
            return "+=" + getScrollDistance();
          },
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      divisions.forEach(function (division) {
        const content = division.querySelectorAll(
          ".division-visual, .division-copy, .division-services"
        );

        gsap.fromTo(
          content,
          {
            y: 35,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: division,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    /* ================= TABLET + MOBILE ================= */

    solutionsMM.add("(max-width: 1050px)", function () {
      gsap.set(track, {
        display: "block",
        width: "100%",
        minWidth: "100%",
        clearProps: "transform"
      });

      gsap.set(divisions, {
        display: "grid",
        width: "100%",
        minWidth: "100%",
        maxWidth: "100%",
        opacity: 1,
        visibility: "visible"
      });

      divisions.forEach(function (division) {
        gsap.fromTo(
          division,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: division,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    ScrollTrigger.refresh();
    solutionsPageReady = true;
  }

  /* ================= HERO BUTTON FIX ================= */

  document.addEventListener("click", function (event) {
    const button = event.target.closest(".solutions-explore-btn");

    if (!button) return;

    event.preventDefault();

    const target = document.querySelector("#solutionsDivisions");

    if (!target) return;

    const targetTop =
      target.getBoundingClientRect().top +
      window.pageYOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });

    if (window.history && window.history.replaceState) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  });

  /* ================= PAGE NAVIGATION FIX ================= */

  const oldShowPage = window.showPage;

  window.showPage = function (pageName) {
    if (typeof oldShowPage === "function") {
      oldShowPage(pageName);
    }

    if (pageName === "solutions") {
      setTimeout(function () {
        initSolutionsPage();

        resetSolutionsPosition();

        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      }, 300);
    }
  };

  /* ================= INITIAL LOAD ================= */

  window.addEventListener("load", function () {
    setTimeout(function () {
      const page = document.querySelector("#page-solutions");

      if (
        page &&
        page.classList.contains("active")
      ) {
        initSolutionsPage();
      }
    }, 500);
  });

  /* ================= RESIZE ================= */

  window.addEventListener("resize", function () {
    const page = document.querySelector("#page-solutions");

    if (
      page &&
      page.classList.contains("active") &&
      window.ScrollTrigger
    ) {
      ScrollTrigger.refresh();
    }
  });
})();

var revealCards = document.querySelectorAll('#page-industries .industry-card');

revealCards.forEach(function (card, i) {
  card.style.transitionDelay = (i % 3) * 0.12 + 's';
});

var cardObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('card-in');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealCards.forEach(function (card) {
  cardObserver.observe(card);
});