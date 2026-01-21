# Contributing to QR Studio

First off, thank you for considering contributing to QR Studio! It's people like you that make QR Studio such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by a spirit of respect and collaboration. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if possible**
- **Include your environment details** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Provide specific examples to demonstrate the feature**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style
4. Make sure your code lints
5. Issue that pull request!

## Development Setup

1. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/qr-code-creator.git
   cd qr-code-creator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary

### React

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused

### Styling

- Use Tailwind CSS utility classes
- Follow the existing dark mode pattern
- Ensure responsive design

### Code Style

- Use meaningful variable and function names
- Write clear comments for complex logic
- Keep functions small and focused
- Follow the existing code structure

### Commit Messages

- Use clear and meaningful commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 50 characters
- Add detailed description if needed

Example:

```
Add vCard QR code generation feature

- Implement vCard data structure
- Add form inputs for contact information
- Update QR generation logic to handle vCard format
- Add tests for vCard generation
```

## Project Structure

```
qr-code-creator/
├── app/
│   ├── api/           # API routes
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Main page
│   └── globals.css    # Global styles
├── components/
│   └── ui/            # UI components
├── public/            # Static files
└── package.json
```

## Testing

Before submitting a PR, make sure to:

- Test your changes thoroughly
- Test in different browsers (Chrome, Firefox, Safari)
- Test on different screen sizes (mobile, tablet, desktop)
- Test both light and dark modes
- Verify all existing features still work

## Feature Requests

We welcome feature requests! Here are some ideas we'd love to see:

- [ ] vCard/Contact QR codes
- [ ] SMS QR codes
- [ ] Email QR codes
- [ ] Bitcoin/Crypto payment QR codes
- [ ] Batch QR code generation
- [ ] QR code templates
- [ ] Advanced color customization
- [ ] Logo/image embedding in QR codes
- [ ] SVG export option
- [ ] QR code analytics
- [ ] QR code history/saved codes

## Questions?

Feel free to:

- Open an issue for questions
- Reach out on [LinkedIn](https://www.linkedin.com/in/muhammadhaseebamjad417)
- Check the [README](README.md) for more information

## Recognition

Contributors will be recognized in the README and project documentation.

Thank you for contributing to QR Studio! 🎉
