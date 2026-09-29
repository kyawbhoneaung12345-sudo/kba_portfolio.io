 <!-- Liquid Pill Animation & Scroll Sync Script -->


 document.addEventListener('DOMContentLoaded', () => {
            const navItems = document.querySelectorAll('.hyper-nav-item');
            const pill = document.getElementById('liquidPill');
            const sections = document.querySelectorAll('section[id]');
            let isClicking = false; 

            function movePillTo(element) {
                if (!element) return;
                
                const elLeft = element.offsetLeft;
                const elWidth = element.offsetWidth;

                pill.style.setProperty('--target-width', `${elWidth}px`);
                pill.classList.add('stretching');
                
                pill.style.transform = `translateX(${elLeft}px)`;
                pill.style.width = `${elWidth}px`;

                setTimeout(() => {
                    pill.classList.remove('stretching');
                }, 250);
            }

            if (navItems.length > 0) {
                setTimeout(() => {
                    movePillTo(document.querySelector('.hyper-nav-item.active') || navItems[0]);
                }, 50);
            }

            const observerOptions = {
                root: null,
                rootMargin: '-40% 0px -40% 0px', 
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                if (isClicking) return; 

                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.getAttribute('id');
                        const activeNav = document.querySelector(`.hyper-nav-item[href="#${currentId}"]`);
                        
                        if (activeNav) {
                            navItems.forEach(nav => nav.classList.remove('active'));
                            activeNav.classList.add('active');
                            movePillTo(activeNav);
                        }
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                observer.observe(section);
            });

            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    isClicking = true; 
                    
                    navItems.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    movePillTo(this);

                    setTimeout(() => {
                        isClicking = false;
                    }, 800); 
                });
            });
        });