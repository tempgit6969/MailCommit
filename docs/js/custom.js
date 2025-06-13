/**
 * Custom JavaScript for extending the Unlayer editor
 */

(function() {
    // Custom tools and blocks for the Unlayer editor
    
    // Example: Custom social media block
    unlayer.registerTool({
        name: 'custom_social',
        label: 'Social Media',
        icon: 'fa-share-alt',
        supportedDisplayModes: ['web', 'email'],
        options: {
            socialLinks: {
                title: 'Social Links',
                position: 1,
                options: {
                    facebook: {
                        label: 'Facebook',
                        defaultValue: true,
                        widget: 'toggle'
                    },
                    twitter: {
                        label: 'Twitter',
                        defaultValue: true,
                        widget: 'toggle'
                    },
                    instagram: {
                        label: 'Instagram',
                        defaultValue: true,
                        widget: 'toggle'
                    },
                    linkedin: {
                        label: 'LinkedIn',
                        defaultValue: true,
                        widget: 'toggle'
                    },
                    youtube: {
                        label: 'YouTube',
                        defaultValue: false,
                        widget: 'toggle'
                    },
                    pinterest: {
                        label: 'Pinterest',
                        defaultValue: false,
                        widget: 'toggle'
                    }
                }
            },
            iconSize: {
                label: 'Icon Size',
                defaultValue: 32,
                widget: 'counter',
                properties: {
                    min: 16,
                    max: 64,
                    step: 4
                }
            },
            iconSpacing: {
                label: 'Icon Spacing',
                defaultValue: 10,
                widget: 'counter',
                properties: {
                    min: 0,
                    max: 40,
                    step: 2
                }
            },
            alignment: {
                label: 'Alignment',
                defaultValue: 'center',
                widget: 'alignment'
            },
            color: {
                label: 'Icon Color',
                defaultValue: '#333333',
                widget: 'color_picker'
            }
        },
        values: {},
        renderer: {
            Viewer: function(values) {
                // Render the social icons based on the selected options
                const socialIcons = {
                    facebook: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/facebook.svg',
                    twitter: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/twitter.svg',
                    instagram: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/instagram.svg',
                    linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg',
                    youtube: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/youtube.svg',
                    pinterest: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/pinterest.svg'
                };
                
                const socialLinks = values.socialLinks || {};
                const iconSize = values.iconSize || 32;
                const iconSpacing = values.iconSpacing || 10;
                const alignment = values.alignment || 'center';
                const color = values.color || '#333333';
                
                let html = `<div style="text-align: ${alignment}; padding: 10px 0;">`;
                
                Object.keys(socialIcons).forEach(platform => {
                    if (socialLinks[platform]) {
                        html += `
                            <a href="#" style="display: inline-block; margin: 0 ${iconSpacing/2}px;">
                                <img src="${socialIcons[platform]}" 
                                     width="${iconSize}" 
                                     height="${iconSize}" 
                                     style="filter: invert(1) brightness(0.5) sepia(1) hue-rotate(${getHueRotate(color)}) saturate(${getSaturation(color)});"
                                     alt="${platform}">
                            </a>
                        `;
                    }
                });
                
                html += '</div>';
                return html;
            },
            exporters: {
                web: function(values) {
                    return this.Viewer(values);
                },
                email: function(values) {
                    return this.Viewer(values);
                }
            }
        }
    });
    
    // Example: Custom testimonial block
    unlayer.registerTool({
        name: 'testimonial',
        label: 'Testimonial',
        icon: 'fa-comment',
        supportedDisplayModes: ['web', 'email'],
        options: {
            quote: {
                label: 'Quote',
                defaultValue: 'This product is amazing! I highly recommend it to everyone.',
                widget: 'text_editor'
            },
            author: {
                label: 'Author',
                defaultValue: 'John Doe',
                widget: 'text'
            },
            role: {
                label: 'Role',
                defaultValue: 'CEO, Company Name',
                widget: 'text'
            },
            avatar: {
                label: 'Avatar',
                defaultValue: {
                    url: 'https://via.placeholder.com/100',
                    width: 100,
                    height: 100
                },
                widget: 'image'
            },
            layout: {
                label: 'Layout',
                defaultValue: 'standard',
                widget: 'dropdown',
                properties: {
                    options: [
                        { label: 'Standard', value: 'standard' },
                        { label: 'Centered', value: 'centered' },
                        { label: 'Left Aligned', value: 'left' }
                    ]
                }
            },
            backgroundColor: {
                label: 'Background Color',
                defaultValue: '#f5f7fa',
                widget: 'color_picker'
            },
            textColor: {
                label: 'Text Color',
                defaultValue: '#333333',
                widget: 'color_picker'
            },
            accentColor: {
                label: 'Accent Color',
                defaultValue: '#4a6cf7',
                widget: 'color_picker'
            }
        },
        values: {},
        renderer: {
            Viewer: function(values) {
                const quote = values.quote || 'This product is amazing! I highly recommend it to everyone.';
                const author = values.author || 'John Doe';
                const role = values.role || 'CEO, Company Name';
                const avatar = values.avatar || { url: 'https://via.placeholder.com/100', width: 100, height: 100 };
                const layout = values.layout || 'standard';
                const backgroundColor = values.backgroundColor || '#f5f7fa';
                const textColor = values.textColor || '#333333';
                const accentColor = values.accentColor || '#4a6cf7';
                
                let html = '';
                
                switch (layout) {
                    case 'centered':
                        html = `
                            <div style="background-color: ${backgroundColor}; padding: 30px; text-align: center; border-radius: 8px;">
                                <div style="margin-bottom: 20px;">
                                    <img src="${avatar.url}" width="80" height="80" style="border-radius: 50%; border: 3px solid ${accentColor};">
                                </div>
                                <div style="font-size: 18px; color: ${textColor}; margin-bottom: 15px; position: relative; padding: 0 20px;">
                                    <span style="font-size: 60px; color: ${accentColor}; opacity: 0.3; position: absolute; top: -20px; left: 0;">&ldquo;</span>
                                    ${quote}
                                    <span style="font-size: 60px; color: ${accentColor}; opacity: 0.3; position: absolute; bottom: -50px; right: 0;">&rdquo;</span>
                                </div>
                                <div style="margin-top: 20px;">
                                    <div style="font-weight: bold; color: ${textColor};">${author}</div>
                                    <div style="color: ${accentColor};">${role}</div>
                                </div>
                            </div>
                        `;
                        break;
                    case 'left':
                        html = `
                            <div style="background-color: ${backgroundColor}; padding: 30px; border-radius: 8px;">
                                <div style="display: flex; align-items: flex-start;">
                                    <div style="margin-right: 20px;">
                                        <img src="${avatar.url}" width="80" height="80" style="border-radius: 50%; border: 3px solid ${accentColor};">
                                    </div>
                                    <div>
                                        <div style="font-size: 18px; color: ${textColor}; margin-bottom: 15px; position: relative;">
                                            ${quote}
                                        </div>
                                        <div>
                                            <div style="font-weight: bold; color: ${textColor};">${author}</div>
                                            <div style="color: ${accentColor};">${role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    default: // standard
                        html = `
                            <div style="background-color: ${backgroundColor}; padding: 30px; border-radius: 8px;">
                                <div style="font-size: 18px; color: ${textColor}; margin-bottom: 20px; position: relative; padding: 0 20px;">
                                    <span style="font-size: 60px; color: ${accentColor}; opacity: 0.3; position: absolute; top: -20px; left: 0;">&ldquo;</span>
                                    ${quote}
                                    <span style="font-size: 60px; color: ${accentColor}; opacity: 0.3; position: absolute; bottom: -50px; right: 0;">&rdquo;</span>
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <div style="margin-right: 15px;">
                                        <img src="${avatar.url}" width="60" height="60" style="border-radius: 50%; border: 3px solid ${accentColor};">
                                    </div>
                                    <div>
                                        <div style="font-weight: bold; color: ${textColor};">${author}</div>
                                        <div style="color: ${accentColor};">${role}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                }
                
                return html;
            },
            exporters: {
                web: function(values) {
                    return this.Viewer(values);
                },
                email: function(values) {
                    return this.Viewer(values);
                }
            }
        }
    });
    
    // Helper functions for the social icons
    function getHueRotate(hexColor) {
        // Convert hex to RGB
        const r = parseInt(hexColor.slice(1, 3), 16) / 255;
        const g = parseInt(hexColor.slice(3, 5), 16) / 255;
        const b = parseInt(hexColor.slice(5, 7), 16) / 255;
        
        // Convert RGB to HSL
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h;
        
        if (max === min) {
            h = 0; // achromatic
        } else {
            const d = max - min;
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        // Return hue in degrees
        return Math.round(h * 360) + 'deg';
    }
    
    function getSaturation(hexColor) {
        // A simple approximation for saturation
        const r = parseInt(hexColor.slice(1, 3), 16) / 255;
        const g = parseInt(hexColor.slice(3, 5), 16) / 255;
        const b = parseInt(hexColor.slice(5, 7), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        
        if (max === min) {
            return 0; // achromatic
        } else {
            const d = max - min;
            return l > 0.5 ? d / (2 - max - min) : d / (max + min);
        }
    }
})();