// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });

    // Preloader mejorado
    const preloader = document.querySelector('.preloader');
    const loaderBar = document.querySelector('.loader-bar');
    const loaderPercentage = document.querySelector('.loader-percentage');
    let progress = 0;
    let imagesLoaded = 0;
    const totalImages = document.querySelectorAll('img').length;

    // Función para actualizar el preloader
    const updateLoader = () => {
        progress += (100 - progress) * 0.05;
        loaderBar.style.width = `${progress}%`;
        loaderPercentage.textContent = Math.round(progress);

        if (progress >= 99.9) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 300);
        } else {
            requestAnimationFrame(updateLoader);
        }
    };

    // Cargar imágenes y actualizar progreso
    const loadImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                    progress = (imagesLoaded / totalImages) * 50;
                });
            }
        });
    };

    loadImages();
    requestAnimationFrame(updateLoader);

    // Navegación sticky y menú móvil mejorado
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navContent = document.querySelector('.nav-content');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;
    let isMenuOpen = false;

    // Función para manejar el scroll
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        // No ocultar el nav si el menú está abierto
        if (!isMenuOpen) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        }
        
        // Ajustar opacidad del fondo
        const opacity = Math.min(currentScroll / 200, 0.95);
        nav.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        
        // Ajustar box-shadow
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);

    // Toggle menú móvil mejorado
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active');
        navContent.classList.toggle('active');
        document.body.classList.toggle('no-scroll');

        // Animar líneas del menú
        const lines = menuToggle.querySelectorAll('.menu-line');
        if (isMenuOpen) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (isMenuOpen) {
                toggleMenu();
            }

            // Scroll suave a la sección
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animaciones de los valores
    const valorItems = document.querySelectorAll('.valor-item');
    
    valorItems.forEach(item => {
        const icon = item.querySelector('.icon-primary');
        const particles = item.querySelectorAll('.icon-particles span');
        
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
            particles.forEach((particle, index) => {
                setTimeout(() => {
                    particle.style.opacity = '1';
                    particle.style.transform = `translate(${(index - 1) * 20}px, ${(index - 1) * 20}px)`;
                }, index * 100);
            });
        });

        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
            particles.forEach(particle => {
                particle.style.opacity = '0';
                particle.style.transform = 'translate(0, 0)';
            });
        });
    });

    // Servicios Cards - Efectos mejorados
    const servicioCards = document.querySelectorAll('.servicio-card');
    
    servicioCards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        const btnCotizar = card.querySelector('.btn-cotizar');
        
        card.addEventListener('mouseenter', () => {
            cardInner.style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mouseleave', () => {
            cardInner.style.transform = 'rotateY(0)';
        });

        if (btnCotizar) {
            btnCotizar.addEventListener('click', (e) => {
                e.preventDefault();
                const servicio = card.querySelector('.servicio-title').textContent;
                const contactoSection = document.querySelector('#contacto');
                const mensaje = document.querySelector('#mensaje');
                
                contactoSection.scrollIntoView({ behavior: 'smooth' });
                mensaje.value = `Estoy interesado en el servicio de ${servicio}`;
                mensaje.focus();
            });
        }
    });

    // Formulario de contacto mejorado
    const contactForm = document.querySelector('.contacto-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validación mejorada
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            const errors = [];

            // Validar nombre
            if (!data.nombre || data.nombre.length < 2) {
                errors.push('Por favor, ingrese un nombre válido');
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                errors.push('Por favor, ingrese un email válido');
            }

            // Validar teléfono
            const phoneRegex = /^\d{9,}$/;
            if (!phoneRegex.test(data.telefono)) {
                errors.push('Por favor, ingrese un teléfono válido');
            }

            // Validar mensaje
            if (!data.mensaje || data.mensaje.length < 10) {
                errors.push('Por favor, ingrese un mensaje más detallado');
            }

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            // Envío del formulario
            try {
                const submitButton = contactForm.querySelector('.btn-enviar');
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                // Simular envío (reemplazar con tu lógica real)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Éxito
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();

                // Animación de éxito
                submitButton.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                submitButton.classList.add('success');

                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span>Enviar consulta ahora</span><i class="fas fa-paper-plane"></i>';
                    submitButton.classList.remove('success');
                }, 3000);

            } catch (error) {
                alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
                const submitButton = contactForm.querySelector('.btn-enviar');
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Enviar consulta ahora</span><i class="fas fa-paper-plane"></i>';
            }
        });
    }

    // Animación de números en la timeline
    const pasoNumeros = document.querySelectorAll('.paso-numero');
    
    const animateNumber = (element) => {
        const number = parseInt(element.textContent);
        let current = 0;
        const increment = number / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number;
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }, 30);
    };

    // Observer para los números
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    pasoNumeros.forEach(numero => numberObserver.observe(numero));

    // Parallax effect en el hero
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    window.addEventListener('scroll', () => {
        if (heroContent && heroImage) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.35;
            
            heroContent.style.transform = `translate3d(0, ${rate}px, 0)`;
            heroImage.style.transform = `translate3d(0, ${rate * 0.8}px, 0)`;
        }
    });

    // Lazy loading de imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('fade-in');
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    lazyImages.forEach(lazyLoad);

    // Animaciones de partículas para los iconos
    const createParticles = (element, count = 10) => {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            element.appendChild(particle);

            const size = Math.random() * 3 + 1;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 2 + 1;
            const distance = Math.random() * 50 + 50;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                duration: velocity,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    };

    // Aplicar efectos de partículas a los botones
    document.querySelectorAll('.btn-primary, .btn-cotizar').forEach(button => {
        button.addEventListener('click', (e) => {
            createParticles(button);
        });
    });
});

// Función para manejar errores de carga de imágenes
const handleImageError = (img) => {
    img.onerror = () => {
        img.src = 'placeholder.jpg';
        img.alt = 'Imagen no disponible';
        console.warn(`Error al cargar la imagen: ${img.dataset.src || img.src}`);
    };
};

// Aplicar manejo de errores a todas las imágenes
document.querySelectorAll('img').forEach(handleImageError);