# Developer Portfolio Website

A modern, responsive portfolio website for software developers to showcase their skills, projects, and contact information.

## Features

- Responsive design that works on all devices
- Clean and modern UI with animations
- Sections for Home, About, Skills, Works, and Contact
- Resume download functionality
- Project filtering by category
- Contact form with EmailJS integration
- Smooth scrolling and animations

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome for icons
- EmailJS for contact form functionality

## Setup

1. Clone this repository
2. Open `index.html` in your browser
3. Customize the content to match your information

## EmailJS Setup for Contact Form

The contact form uses EmailJS to send messages directly to your email without a backend server. Follow these steps to set it up:

1. **Create an EmailJS Account**:
   - Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account

2. **Connect an Email Service**:
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps
   - Note the Service ID (e.g., "service_abc123")

3. **Create an Email Template**:
   - Go to "Email Templates" in your dashboard
   - Click "Create New Template"
   - Design your template with the following variables:
     - `{{name}}` - The sender's name
     - `{{email}}` - The sender's email
     - `{{subject}}` - The message subject
     - `{{message}}` - The message content
     - `{{time}}` - The time the message was sent
   - Save your template and note the Template ID (e.g., "template_xyz789")

4. **Update Your Website Code**:
   - In `index.html`: Replace "YOUR_PUBLIC_KEY" with your actual EmailJS public key (found in Account > API Keys)
   - In `script.js`: Replace "YOUR_SERVICE_ID" with your actual service ID
   - In `script.js`: Replace "YOUR_TEMPLATE_ID" with your actual template ID

## Customization

### Personal Information

Edit the following in `index.html`:

- Name and title in the Home section
- About Me text and details
- Skills and proficiency levels
- Project information and images
- Contact details

### Resume

Replace the file at `assets/resume.pdf` with your own resume.

### Profile and Project Images

Replace the images in the `assets` folder with your own:
- `profile.jpg` - Your profile picture
- `about.jpg` - Image for the About section
- `hero-bg.jpg` - Background image for the hero section
- Project images (e.g., `movie-recommender.jpg`, `chatbot.jpg`, etc.)

