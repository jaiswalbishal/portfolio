// Initialize EmailJS with your Public Key
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('Gru1VZy80bJO0IlhJ');

        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                    
                    const navCollapse = document.querySelector('.navbar-collapse');
                    if (navCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navCollapse);
                        bsCollapse.hide();
                    }
                });
            });

            const form = document.getElementById('contactForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = document.getElementById('submitBtn');
                const btnText = document.getElementById('btnText');
                const btnLoading = document.getElementById('btnLoading');
                const formMessage = document.getElementById('formMessage');
                
                // Show loading state
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline';
                submitBtn.disabled = true;
                formMessage.style.display = 'none';
                
                // Replace these with your actual EmailJS IDs
                const serviceID = 'service_x72q2tf';
                const templateID = 'template_8rfowbg';
                
                emailjs.sendForm(serviceID, templateID, form)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show success message
                        formMessage.style.display = 'block';
                        formMessage.style.color = '#10b981';
                        formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                        
                        // Reset form
                        form.reset();
                        
                        // Reset button
                        btnText.style.display = 'inline';
                        btnLoading.style.display = 'none';
                        submitBtn.disabled = false;
                        
                        // Hide message after 5 seconds
                        setTimeout(function() {
                            formMessage.style.display = 'none';
                        }, 5000);
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message
                        formMessage.style.display = 'block';
                        formMessage.style.color = '#ef4444';
                        formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
                        
                        // Reset button
                        btnText.style.display = 'inline';
                        btnLoading.style.display = 'none';
                        submitBtn.disabled = false;
                    });
            });

            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.style.backgroundColor = 'rgba(15, 23, 42, 1)';
                } else {
                    navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
                }
            });
        });
