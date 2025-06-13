# MailCommit - Email Template Designer

MailCommit is a web-based email template designer that allows users to create beautiful, responsive email templates using a drag-and-drop interface. This project is built with HTML, CSS, and JavaScript, and uses the Unlayer API for the email editor functionality.

## Features

- Intuitive drag-and-drop email editor
- Responsive design templates that work on all devices
- Pre-designed templates for quick starts
- Export HTML for use in any email service
- Save and load designs
- Custom blocks and components

## Getting Started

### Prerequisites

This is a static website that can be hosted on any web server or GitHub Pages. No special server-side requirements are needed.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/MailCommit.git
   ```

2. Navigate to the project directory:
   ```
   cd MailCommit
   ```

3. Open `index.html` in your browser or set up a local server.

### Deployment to GitHub Pages

To deploy this project to GitHub Pages:

1. Create a GitHub repository named `MailCommit`

2. Push your code to the repository:
   ```
   git remote add origin https://github.com/yourusername/MailCommit.git
   git branch -M main
   git push -u origin main
   ```

3. Go to your repository settings, navigate to the "Pages" section, and select the main branch as the source.

4. Your site will be published at `https://yourusername.github.io/MailCommit/`

## Project Structure

```
├── index.html              # Home page
├── designer.html           # Email template designer page
├── templates.html          # Pre-designed templates page
├── about.html              # About page
├── css/
│   ├── styles.css          # Main stylesheet
│   └── custom-editor.css   # Custom styles for the Unlayer editor
├── js/
│   ├── main.js             # Main JavaScript file
│   └── custom.js           # Custom JavaScript for the Unlayer editor
└── images/                 # Images and icons
    ├── hero-image.svg
    ├── drag-drop.svg
    ├── responsive.svg
    ├── export.svg
    ├── about-image.svg
    ├── team/               # Team member avatars
    └── templates/          # Template preview images
```

## Customization

### Adding New Templates

To add new templates:

1. Create a new template preview image in the `images/templates/` directory
2. Add the template to the templates grid in `templates.html`
3. Add the template design JSON in the `loadTemplate` function in `designer.html`

### Customizing the Editor

The Unlayer editor can be customized by modifying the configuration in `designer.html` and adding custom tools in `js/custom.js`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Unlayer](https://unlayer.com/) for the email editor API
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography