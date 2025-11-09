   const htmlElement = document.documentElement;
        const themeToggle = document.getElementById('theme-toggle');
        const card = document.getElementById('portfolio-card');

        function getInitialTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
            return 'dark'; 
        }

        function updateToggleIcon(theme) {
            if (typeof lucide === 'undefined') {
                return;
            }
            
            themeToggle.innerHTML = '';
            const iconSize = 24;
            
            lucide.createIcons();

            if (theme === 'light') {
                if (lucide.moon) {
                    themeToggle.insertAdjacentHTML('beforeend', lucide.moon({ width: iconSize, height: iconSize }).toSvg());
                }
            } 
            else {
                if (lucide.sun) {
                    themeToggle.insertAdjacentHTML('beforeend', lucide.sun({ width: iconSize, height: iconSize }).toSvg());
                }
            }
        }

        function applyTheme(theme) {
            htmlElement.classList.remove('light', 'dark');
            htmlElement.classList.add(theme);
            localStorage.setItem('theme', theme);
            updateToggleIcon(theme);
        }

        function smoothScroll(e) {
            if (this.hash !== "") {
                e.preventDefault();

                const hash = this.hash;

                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const initialTheme = getInitialTheme();
            applyTheme(initialTheme); 
            
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault(); 
                const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                applyTheme(newTheme);
            });

            const navLinks = document.querySelectorAll('.nav-links-container a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', smoothScroll);
            });
        });
        