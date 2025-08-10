document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;

                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const counterSection = document.querySelector('#counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }

    // Modal Logic
    const modal = document.getElementById('timeline-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    if (modal && closeButton && readMoreBtns.length > 0) {
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const content = this.parentElement;
                const title = content.querySelector('h3').textContent;
                const fullText = this.getAttribute('data-fulltext');
                
                modalTitle.textContent = title;
                modalBody.textContent = fullText;
                modal.style.display = 'block';
            });
        });

        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
// Skills Tabs Logic
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabLinks.length > 0 && tabContents.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const tabId = link.getAttribute('data-tab');

                // Deactivate all tabs and contents
                tabLinks.forEach(item => item.classList.remove('active'));
                tabContents.forEach(item => item.classList.remove('active'));

                // Activate the clicked tab and corresponding content
                link.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
});
    // Advanced Mobile Nav Logic
    const hamburger = document.getElementById('hamburger-menu');
    const closeNavBtn = document.getElementById('close-nav');
    const overlay = document.getElementById('mobile-nav-overlay');
    const mainContent = document.querySelector('main');
    const overlayLinks = document.querySelectorAll('.overlay-content a');

    if (hamburger && closeNavBtn && overlay && mainContent) {
        hamburger.addEventListener('click', () => {
            overlay.style.width = '100%';
            mainContent.classList.add('blur');
            document.body.classList.add('overlay-active');
        });

        const closeNav = () => {
            overlay.style.width = '0%';
            mainContent.classList.remove('blur');
            document.body.classList.remove('overlay-active');
        };

        closeNavBtn.addEventListener('click', closeNav);
        
        overlayLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }
