document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('movie-search');
    const refreshTrendingBtn = document.getElementById('refresh-trending');
    const movieCards = document.querySelectorAll('.movie-card');
    
    // Add hover effects to movie cards
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add slight glow effect
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 2px rgba(255, 106, 61, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove the glow effect
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.5)';
        });
    });
    
    // Animate the gradient text on load
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        gradientText.style.opacity = '0';
        setTimeout(() => {
            gradientText.style.transition = 'opacity 1s ease-in-out';
            gradientText.style.opacity = '1';
        }, 300);
    }

    // Add rating badges to movie cards
    movieCards.forEach(card => {
        const imgContainer = card.querySelector('.relative');
        if (imgContainer) {
            const ratingBadge = document.createElement('div');
            ratingBadge.className = 'rating-badge';
            // Generate a random rating between 7.0 and 9.5
            const rating = (7 + Math.random() * 2.5).toFixed(1);
            ratingBadge.textContent = rating;
            imgContainer.appendChild(ratingBadge);
        }
    });

    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchValue = searchInput.value.trim();
            if (searchValue === '') {
                e.preventDefault();
                // Add shake animation to input field
                searchInput.classList.add('shake');
                setTimeout(() => {
                    searchInput.classList.remove('shake');
                }, 600);
            }
        });
    }

    // Handle refresh trending button
    if (refreshTrendingBtn) {
        refreshTrendingBtn.addEventListener('click', function() {
            // Add spinning animation to button
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin mr-2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg> Loading...';
            
            // Simulate loading (would be replaced with actual API call)
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }

    // Focus animation for search input
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('expanded');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('expanded');
        });
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add entry animations for movie cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    movieCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });

    // Add fade-in animation
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.6s ease-in-out;
    }
    
    .expanded input {
        transform: scale(1.02);
        box-shadow: 0 0 0 3px rgba(255, 106, 61, 0.3);
    }
    
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);


const hover_effect = document.querySelectorAll("#black_gradient");

// hover_effect.addEventListener('mouseover', () => {
//     document.querySelector("#movie-card_img").style.transform = "scale(1.5)";
// });


const hover_effects = document.querySelectorAll(".black_gradient");

hover_effects.forEach(e => {
    e.addEventListener('mouseenter', function() {
        const img = this.closest(".movie-card").querySelector(".movie-card_img");
        if (img) {
            img.style.transition = "transform 0.5s ease";
            img.style.transform = "scale(1.1)";
        }
    });
    e.addEventListener('mouseleave', function() {
        const img = this.closest(".movie-card").querySelector(".movie-card_img");
        if (img) {
            img.style.transition = "transform 0.5s ease";
            img.style.transform = "scale(1)";
        }
    });
});


