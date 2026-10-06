# fexkode

fexkode is a React-based web application built with Vite. The project includes a public website, blog/article functionality, an admin section, contact form integration, SEO configuration, Google Analytics, and integration with Sanity CMS for content management.

## Technologies Used

* React 19
* Vite
* React Router
* Tailwind CSS
* Portable Text
* Express
* JSON Web Token (JWT)
* EmailJS
* React Helmet Async
* Lucide React

## Project Structure

```text
fexkode/
├── public/
│   ├── feed.xml
│   ├── sitemap.xml
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SectionHeading.jsx
│   │   └── SEO.jsx
│   │
│   ├── data/
│   │   └── blog/
│   │       ├── index.js
│   │       └── posts/
│   │
│   ├── pages/
│   │   ├── AdminArticleEdit.jsx
│   │   ├── AdminArticleNew.jsx
│   │   ├── AdminArticles.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Contact.jsx
│   │   └── ...
│   │
│   ├── Sanity/
│   │   └── client.js
│   │
│   ├── Sections/
│   │   └── Home/
│   │
│   ├── seo/
│   ├── utils/
│   │   └── analytics.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server.js
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Main Features

### Website

The application contains pages for:

* Home
* About
* Services
* Cloud Services
* Solutions
* Industries
* Case Studies
* Blog
* Contact
* Privacy Policy
* Cookies
* Terms and Conditions

### Services

The project includes dedicated pages for:

* Cloud Migration
* Cloud Security
* Data Cloud Platform
* DevOps Automation
* Kubernetes & Containers
* Managed Cloud


### Admin

The project contains an admin section for managing articles.

Admin-related pages include:

* Admin Login
* Admin Dashboard
* Admin Articles
* New Article
* Edit Article

Protected routes are handled through `ProtectedRoute.jsx`.





## Running the Frontend

Navigate to the frontend directory:

```bash
cd Nexkode
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server will provide the local URL in the terminal.

## Available Frontend Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run server
```



Install dependencies:

```bash
npm install



## Environment Variables

The frontend uses environment variables for configuration and admin-related validation.

Create a `.env.local` file in the frontend project directory and provide the required values.

Do not commit or share `.env.local` when it contains passwords, tokens, API keys, or other sensitive information.

## Additional Configuration

The project also contains documentation for:

* Contact form setup: `CONTACT_FORM_SETUP.md`
* Google Analytics setup: `GOOGLE_ANALYTICS_SETUP.md`

Refer to those files for their respective configuration steps.

## Production Build

To create a production build of the frontend:

```bash
cd Nexkode
npm install
npm run build
```

The generated production files are placed in the `dist/` directory.

## Notes

`node_modules` is not required to be included when sharing the project. Dependencies can be installed using:

```bash
npm install
```

