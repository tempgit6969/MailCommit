/**
 * Main JavaScript file for MailCommit
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const setupMobileMenu = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '<span></span><span></span><span></span>';
            mobileBtn.setAttribute('aria-label', 'Toggle menu');
            
            const nav = header.querySelector('nav');
            if (nav) {
                // Ensure the nav is a direct child of header before using insertBefore
                const headerChildren = Array.from(header.children);
                if (headerChildren.includes(nav)) {
                    header.insertBefore(mobileBtn, nav);
                } else {
                    // If nav is not a direct child, append to the container inside header
                    const container = header.querySelector('.container');
                    if (container) {
                        container.insertBefore(mobileBtn, container.querySelector('nav'));
                    }
                }
                
                mobileBtn.addEventListener('click', function() {
                    this.classList.toggle('active');
                    nav.classList.toggle('active');
                });
            }
            
            // Add mobile menu styles
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    header .container {
                        position: relative;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                        background: none;
                        border: none;
                        width: 30px;
                        height: 30px;
                        position: absolute;
                        right: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                        z-index: 1001;
                    }
                    
                    .mobile-menu-btn span {
                        display: block;
                        width: 100%;
                        height: 3px;
                        background-color: var(--dark-color);
                        margin: 5px 0;
                        transition: all 0.3s ease;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -7px);
                    }
                    
                    nav {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        width: 250px;
                        height: 100vh;
                        background-color: #fff;
                        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
                        z-index: 1000;
                        transition: right 0.3s ease;
                        padding-top: 70px;
                    }
                    
                    nav.active {
                        right: 0;
                    }
                    
                    nav ul {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    nav ul li {
                        margin: 0;
                        width: 100%;
                    }
                    
                    nav ul li a {
                        display: block;
                        padding: 15px 20px;
                        border-bottom: 1px solid #eee;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Handle URL parameters for template loading
    const handleUrlParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const template = urlParams.get('template');
        
        if (template && window.location.pathname.includes('designer.html')) {
            // If we're on the designer page and have a template parameter,
            // we'll load the template when the editor is ready
            const checkEditorInterval = setInterval(() => {
                if (window.editor) {
                    clearInterval(checkEditorInterval);
                    loadTemplateFromParam(template);
                }
            }, 100);
            
            // Safety timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkEditorInterval);
            }, 5000);
        }
    };
    
    // Load template based on URL parameter
    const loadTemplateFromParam = (templateId) => {
        // In a real application, you would fetch the template from your server
        // For now, we'll just select the template in the dropdown and trigger the load
        const templateSelector = document.getElementById('templateSelector');
        if (templateSelector) {
            // Extract the template type from the ID (e.g., 'newsletter-1' -> 'newsletter')
            const templateType = templateId.split('-')[0];
            if (templateSelector.querySelector(`option[value="${templateType}"]`)) {
                templateSelector.value = templateType;
                document.getElementById('loadTemplate').click();
            }
        }
    };
    
    // Initialize functionality
    setupMobileMenu();
    handleUrlParams();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Custom JavaScript for the Unlayer editor
window.customJS = {
    // Add any custom functions for the editor here
    // These can be called from the editor using unlayer.setData()
    
    // Example: Custom image upload handler
    imageUploadHandler: function(file, onSuccess, onError) {
        // In a real application, you would upload the file to your server
        // For this demo, we'll create a data URL
        const reader = new FileReader();
        reader.onload = function() {
            onSuccess({ url: reader.result });
        };
        reader.onerror = function() {
            onError('Error reading file');
        };
        reader.readAsDataURL(file);
    },
    
    // Example: Custom link click handler
    linkClickHandler: function(link) {
        console.log('Link clicked:', link);
        // You can add custom behavior here
    }
};