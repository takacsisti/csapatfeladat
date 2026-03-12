document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'disabled') {
        body.classList.add('light-mode');
        darkModeToggle.textContent = 'Light mód';
    } else {
        body.classList.remove('light-mode');
        darkModeToggle.textContent = 'Dark mód';
    }
   
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('light-mode');
           
            if (body.classList.contains('light-mode')) {
                darkModeToggle.textContent = 'Light mód';
                localStorage.setItem('darkMode', 'disabled');
            } else {
                darkModeToggle.textContent = 'Dark mód';
                localStorage.setItem('darkMode', 'enabled');
            }
        });
    }

    const galleryItems = document.querySelectorAll('.gallery-item');
   
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.display = 'none';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="" alt="Lightbox kép">
        </div>
    `;
    document.body.appendChild(lightbox);
   
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close-lightbox');
   
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('href');
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
   
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
   
    closeBtn.addEventListener('click', closeLightbox);
   
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
   
    const featureCards = document.querySelectorAll('.feature-card, .game-card, .team-member');
   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
   
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
