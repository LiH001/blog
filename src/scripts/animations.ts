import { gsap } from 'gsap';

const mm = gsap.matchMedia();

mm.add(
  {
    allowMotion: '(prefers-reduced-motion: no-preference)',
    reduceMotion: '(prefers-reduced-motion: reduce)'
  },
  (context) => {
    const reduceMotion = context.conditions?.reduceMotion;
    const heroItems = gsap.utils.toArray<HTMLElement>('[data-animate="hero"]');
    const cardItems = gsap.utils.toArray<HTMLElement>('[data-animate="card"]');
    const floatItems = gsap.utils.toArray<HTMLElement>('[data-float]');
    const waveItems = gsap.utils.toArray<HTMLElement>('[data-wave]');

    document.documentElement.dataset.animations = reduceMotion ? 'reduced' : 'ready';

    if (reduceMotion) {
      gsap.set([...heroItems, ...cardItems], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      });
      return;
    }

    gsap.defaults({ ease: 'power3.out' });
    gsap.set([...heroItems, ...cardItems], {
      autoAlpha: 0,
      y: 34,
      filter: 'blur(10px)'
    });

    const revealStatic = (items: HTMLElement[]) => {
      gsap.set(items, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        filter: 'blur(0px)'
      });
    };

    window.setTimeout(() => {
      const visibleCards = cardItems.filter((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top < window.innerHeight * 1.15 && rect.bottom > -80;
      });

      revealStatic([...heroItems, ...visibleCards]);
    }, 1800);

    gsap
      .timeline({ delay: 0.18 })
      .to(heroItems, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.92,
        stagger: 0.11
      });

    const revealCard = (card: HTMLElement, index = 0) => {
      gsap.to(card, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.72,
        delay: Math.min(index * 0.08, 0.32),
        overwrite: 'auto'
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = cardItems.indexOf(entry.target as HTMLElement);
          revealCard(entry.target as HTMLElement, index);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    cardItems.forEach((card) => observer.observe(card));

    floatItems.forEach((item, index) => {
      gsap.to(item, {
        y: index % 2 === 0 ? -8 : 7,
        rotation: index % 2 === 0 ? 1.5 : -1.5,
        duration: 2.4 + index * 0.18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    gsap.to(waveItems, {
      scaleY: 0.35,
      transformOrigin: 'center bottom',
      duration: 0.74,
      stagger: {
        each: 0.12,
        repeat: -1,
        yoyo: true
      },
      ease: 'sine.inOut'
    });

    gsap.utils.toArray<HTMLElement>('[data-tilt-card]').forEach((card) => {
      card.style.transformStyle = 'preserve-3d';

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotationY: x * 4,
          rotationX: y * -4,
          transformPerspective: 900,
          duration: 0.32,
          overwrite: 'auto'
        });
      });

      card.addEventListener('pointerenter', () => {
        gsap.to(card, { y: -8, scale: 1.018, duration: 0.32, overwrite: 'auto' });
      });

      card.addEventListener('pointerleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.46,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      });
    });
  }
);
