document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const searchInput = document.getElementById('movie-search');
    const searchButton = document.getElementById('search-button');
    const recommendButton = document.getElementById('recommend-button');
    const movieGrid = document.getElementById('movie-grid');
    const movieCards = document.querySelectorAll('.movie-card');
    const refreshButton = document.querySelector('.refresh-button');
    
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
    
    // Animate the gradient text on load
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        gradientText.style.opacity = '0';
        setTimeout(() => {
            gradientText.style.transition = 'opacity 1s ease-in-out';
            gradientText.style.opacity = '1';
        }, 300);
    }

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

    // Handle search functionality
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchValue = searchInput.value.trim();
            if (searchValue === '') {
                // Add shake animation to input field
                searchInput.classList.add('shake');
                setTimeout(() => {
                    searchInput.classList.remove('shake');
                }, 600);
                return;
            }
            
            // Normally you'd send this to the backend
            searchButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin mr-2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg> Searching...';
            
            // Simulate search (would be replaced with actual API call)
            setTimeout(() => {
                window.location.href = `/search?query=${encodeURIComponent(searchValue)}`;
            }, 1000);
        });
    }

    // Handle get more recommendations
    if (recommendButton) {
        recommendButton.addEventListener('click', function() {
            // Add animation to button
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin mr-2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg> Loading more...';
            
            // Simulate loading more recommendations (would be replaced with actual API call)
            setTimeout(() => {
                // Add new movie cards
                const newMovies = [
                    {
                        title: "Pulp Fiction",
                        posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                        rating: 8.9
                    },
                    {
                        title: "The Shawshank Redemption",
                        posterUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                        rating: 9.3
                    },
                    {
                        title: "Eternal Sunshine of the Spotless Mind",
                        posterUrl: "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_.jpg",
                        rating: 8.3
                    }
                ];
                
                // Create and add new movie cards
                newMovies.forEach(movie => {
                    const card = createMovieCard(movie);
                    movieGrid.appendChild(card);
                    // Add fade-in effect
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                });
                
                // Reset button text
                recommendButton.textContent = "Get More Recommendations";
            }, 1500);
        });
    }

    // Function to create a movie card
    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        card.innerHTML = `
            <div class="relative pb-[150%]">
                <img src="${movie.posterUrl}" alt="${movie.title}" class="absolute inset-0 w-full h-full object-cover">
                <div class="rating-badge">${movie.rating}</div>
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg truncate">${movie.title}</h3>
                <div class="flex items-center mt-2">
                    <span class="text-yellow-400">★★★★</span>
                    <span class="ml-1">${movie.rating}/10</span>
                </div>
            </div>
        `;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 2px rgba(255, 106, 61, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.5)';
        });
        
        return card;
    }
    
    // Handle refresh button
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            // Add spinning animation to button
            this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin mr-2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg> Loading...';
            
            // Simulate loading (would be replaced with actual API call)
            setTimeout(() => {
                // Randomize movie order
                const parent = document.getElementById('movie-grid');
                for (let i = parent.children.length - 1; i > 0; i--) {
                    parent.appendChild(parent.children[Math.floor(Math.random() * i)]);
                }
                
                // Reset button text and add fade effects
                refreshButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg> Refresh';
                
                // Animate cards
                Array.from(parent.children).forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }, 1000);
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
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
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
    `;
    document.head.appendChild(style);
});

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