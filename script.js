        // ═══════ INTRO OVERLAY — Auto dismiss ═══════
        setTimeout(() => {
            document.getElementById('introOverlay').classList.add('hidden');
            // Trigger confetti after intro
            setTimeout(triggerConfetti, 500);
        }, 3000);

        // ═══════ SVG STARS BACKGROUND ═══════
        (function createStars() {
            const svgBg = document.querySelector('#svgBg svg');
            const starCount = 60;
            for (let i = 0; i < starCount; i++) {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', Math.random() * 100 + '%');
                circle.setAttribute('cy', Math.random() * 100 + '%');
                circle.setAttribute('r', Math.random() * 2 + 0.5);
                circle.setAttribute('fill', Math.random() > 0.5 ? '#f5c518' : '#ffe066');
                circle.setAttribute('opacity', Math.random() * 0.5 + 0.1);
                circle.innerHTML = `<animate attributeName="opacity" values="${Math.random() * 0.3 + 0.1};${Math.random() * 0.8 + 0.4};${Math.random() * 0.3 + 0.1}" dur="${Math.random() * 4 + 2}s" repeatCount="indefinite"/>`;
                svgBg.appendChild(circle);
            }
        })();

        // ═══════ CONFETTI BURST ═══════
        function triggerConfetti() {
            const container = document.getElementById('confettiContainer');
            const colors = ['#f5c518', '#ffe066', '#e8688a', '#e8912a', '#c94070', '#f8a4b8', '#ffb347', '#fef5e0'];
            const shapes = ['circle', 'rect'];

            for (let i = 0; i < 80; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = Math.random() * 100 + '%';
                piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                piece.style.width = Math.random() * 12 + 6 + 'px';
                piece.style.height = Math.random() * 12 + 6 + 'px';
                piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                piece.style.animationDuration = Math.random() * 3 + 2 + 's';
                piece.style.animationDelay = Math.random() * 2 + 's';
                piece.style.opacity = '1';
                container.appendChild(piece);
            }

            // Remove confetti after animation
            setTimeout(() => {
                container.innerHTML = '';
            }, 7000);
        }

        // ═══════ LIGHTBOX ═══════
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxClose = document.getElementById('lightboxClose');

        document.querySelectorAll('.gallery-card img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                lightboxImg.src = e.target.src;
                lightbox.classList.add('active');
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightboxClose || lightboxClose.contains(e.target)) {
                lightbox.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') lightbox.classList.remove('active');
        });

        // ═══════ SCROLL REVEAL (Intersection Observer) ═══════
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observe gallery cards
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.style.opacity = '0';
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        });

        // ═══════ CLICK SPARKLE EFFECT ═══════
        document.addEventListener('click', (e) => {
            for (let i = 0; i < 6; i++) {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    width: 6px;
                    height: 6px;
                    background: ${['#f5c518', '#ffe066', '#e8688a', '#e8912a'][Math.floor(Math.random() * 4)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: twinkle 0.8s ease-out forwards;
                    transform: translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 60}px);
                `;
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 800);
            }
        });

        // ═══════ 3D BUTTERFLIES ═══════
        (function createButterflies() {
            const overlay = document.getElementById('butterflyOverlay');
            const palettes = ['palette-golden', 'palette-rose', 'palette-sunset', 'palette-cream'];
            const flights = ['butterflyFly1', 'butterflyFly2', 'butterflyFly3', 'butterflyFly4'];
            const butterflyCount = 12;

            for (let i = 0; i < butterflyCount; i++) {
                const butterfly = document.createElement('div');
                butterfly.className = `butterfly ${palettes[i % palettes.length]}`;

                const size = 0.6 + Math.random() * 0.8; // scale between 0.6 and 1.4
                const flight = flights[Math.floor(Math.random() * flights.length)];
                const duration = 18 + Math.random() * 22; // 18-40s flight
                const delay = Math.random() * 20; // stagger start
                const flapSpeed = 0.2 + Math.random() * 0.25; // 0.2-0.45s flap

                butterfly.style.cssText = `
                    width: ${40 * size}px;
                    height: ${44 * size}px;
                    animation: ${flight} ${duration}s ease-in-out ${delay}s infinite;
                    opacity: 0;
                `;

                butterfly.innerHTML = `
                    <div class="butterfly-wings">
                        <div class="wing wing-left" style="animation-duration: ${flapSpeed}s;">
                            <div class="wing-upper"></div>
                            <div class="wing-lower"></div>
                        </div>
                        <div class="wing wing-right" style="animation-duration: ${flapSpeed}s;">
                            <div class="wing-upper"></div>
                            <div class="wing-lower"></div>
                        </div>
                    </div>
                    <div class="butterfly-body"></div>
                `;

                overlay.appendChild(butterfly);
            }
        })();
