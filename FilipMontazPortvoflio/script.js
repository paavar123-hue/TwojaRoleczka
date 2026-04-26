document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // High-performance Scroll Reveal with Intersection Observer
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 90, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission with AJAX
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.textContent;
            
            // Visual feedback
            submitBtn.textContent = 'Wsyłanie...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    form.classList.add('hidden');
                    successMsg.classList.remove('hidden');
                } else {
                    alert('Wystąpił błąd. Spróbuj ponownie później.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Wystąpił błąd połączenia.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Dynamic Tilt for Video Card (Subtle & Smooth)
    const videoCard = document.querySelector('.video-card-premium');
    if (videoCard && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
            videoCard.style.transform = `perspective(1200px) rotateY(${xAxis - 5}deg) rotateX(${yAxis}deg)`;
        });

        window.addEventListener('mouseenter', () => {
            videoCard.style.transition = 'none';
        });

        window.addEventListener('mouseleave', () => {
            videoCard.style.transition = '0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            videoCard.style.transform = `perspective(1200px) rotateY(-5deg) rotateX(0deg)`;
        });
    }
});
