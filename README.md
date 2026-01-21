# QR Studio - Professional QR Code Generator

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</div>

<br />

<div align="center">
  <h3>✨ Professional QR Code Generator • Free & Unlimited • No Registration Required</h3>
  <p>A modern, feature-rich QR code generator built with Next.js and TypeScript</p>
  
  <a href="https://qrcode-creator-app.netlify.app/" target="_blank">
    <strong>🚀 Live Demo</strong>
  </a>
</div>

<br />

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=QR+Studio+Screenshot" alt="QR Studio Interface" />
</div>

## ✨ Features

### 📱 Multiple QR Code Types

- **WiFi QR Codes** - Share network credentials instantly (WPA/WEP/Open)
- **Payment QR Codes** - Generate UPI payment codes with amount and notes
- **Event QR Codes** - Create calendar events with location and time
- **URL QR Codes** - Link to websites, social media, or any web resource
- **Plain Text QR Codes** - Encode any custom text or message

### 🎨 Customization Options

- **Adjustable Size** - Generate QR codes from 200px to 600px
- **Color Schemes** - Support for custom foreground and background colors
- **Dark Mode** - Beautiful dark theme with smooth transitions
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### ⚡ Technical Highlights

- **High-Quality Output** - PNG format with configurable resolution
- **Error Correction** - Level H error correction for maximum reliability
- **Instant Generation** - Fast QR code creation with real-time preview
- **No Backend Required** - All processing done client-side for privacy
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/muhammadhaseeb417/qr-code-creator.git
   cd qr-code-creator
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
qr-code-creator/
├── app/
│   ├── api/
│   │   └── generate-qr/
│   │       └── route.ts          # QR code generation API endpoint
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main application page
│   └── globals.css               # Global styles and theme
├── components/
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── tabs.tsx
├── public/                       # Static assets
└── package.json
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[qrcode](https://www.npmjs.com/package/qrcode)** - QR code generation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon system

## 📦 Key Dependencies

```json
{
  "next": "^15.1.4",
  "react": "^19.0.0",
  "qrcode": "^1.5.4",
  "tailwindcss": "^4.0.0",
  "lucide-react": "^0.468.0"
}
```

## 🎯 Use Cases

- **Business Cards** - Add QR codes linking to your website or vCard
- **Restaurant Menus** - Create contactless digital menus
- **WiFi Sharing** - Let guests connect to your network effortlessly
- **Event Management** - Generate calendar invites for attendees
- **Payment Collection** - Accept UPI payments with pre-filled amounts
- **Marketing Materials** - Drive traffic to landing pages and campaigns

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📝 API Reference

### Generate QR Code Endpoint

**Endpoint:** `POST /api/generate-qr`

**Request Body:**

```typescript
{
  data: string;        // QR code content
  color?: string;      // Foreground color (hex)
  bgColor?: string;    // Background color (hex)
  size?: number;       // Size in pixels (200-600)
}
```

**Response:**

- Content-Type: `image/png`
- Returns PNG image buffer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhammad Haseeb Amjad**

- Portfolio: [muhammadhaseebamjad-portfolio.netlify.app](https://muhammadhaseebamjad-portfolio.netlify.app/)
- LinkedIn: [@muhammadhaseebamjad417](https://www.linkedin.com/in/muhammadhaseebamjad417)
- GitHub: [@muhammadhaseeb417](https://github.com/muhammadhaseeb417)

## 🌟 Show Your Support

If you find this project useful, please consider giving it a ⭐️ on GitHub!

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- All contributors and users of this project

## 📧 Contact

Have questions or suggestions? Feel free to reach out:

- Open an issue on [GitHub](https://github.com/muhammadhaseeb417/qr-code-creator/issues)
- Connect with me on [LinkedIn](https://www.linkedin.com/in/muhammadhaseebamjad417)

---

<div align="center">
  <p>Made with ❤️ by Muhammad Haseeb Amjad</p>
  <p>
    <a href="https://qrcode-creator-app.netlify.app/">Live Demo</a> •
    <a href="https://github.com/muhammadhaseeb417/qr-code-creator/issues">Report Bug</a> •
    <a href="https://github.com/muhammadhaseeb417/qr-code-creator/issues">Request Feature</a>
  </p>
</div>
