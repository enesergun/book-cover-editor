# Book Cover Customizer

A dynamic Next.js application that fetches New York Times bestseller books and lets users create and customize book cover images with draggable title and author text, preview, and download.

## Features

- Fetch top hardcover fiction books from the New York Times API.
- Select a book (title and author).
- Upload a custom image for the cover.
- Add and position title and author text on the image.
- Customize text style: font size, color, and letter spacing.
- Save the customized cover and preview it.
- Download the final cover as a PNG file.

## Tech Stack

- Next.js 13 (App Router)
- React & TypeScript
- Tailwind CSS
- html2canvas-pro
- react-draggable
- New York Times Books API
- Next.js Server Actions for form handling

## Getting Started

### Prerequisites

- Node.js (>=14)
- Yarn or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dev-challenge-growth-frontend.git
cd dev-challenge-growth-frontend
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Create a `.env.local` file in the project root and add your New York Times API key:
```
API_KEY=YOUR_NYT_API_KEY
```

### Running the Development Server

```bash
yarn dev
# or
npm run dev
```

Open http://localhost:3000 in your browser.

## Usage

1. Choose a book from the fetched NYT bestseller list.
2. Upload a base image for the cover.
3. Click on the title or author text to activate style controls.
4. Drag the title and author text to position them on the cover.
5. Adjust font size, color, and letter spacing.
6. Save and proceed to preview.
7. Download the final cover as a PNG.

## Project Structure

```
.
├── app
│   ├── page.tsx            # Home page (book selection)
│   ├── edit-cover/page.tsx # Cover editing page
│   └── preview/page.tsx    # Preview and download page
├── components              # Reusable React components
├── models                  # TypeScript models and interfaces
├── actions                 # Next.js server actions
└── lib                     # Utility functions
```

## License

This project is private.
