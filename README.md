# Auto README Generator (https://autoreadme.online)

A sophisticated web application designed to automatically generate comprehensive README documentation for GitHub repositories. This tool streamlines the documentation process by analyzing repository content and producing well-structured README files with minimal user input.

[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![DaisyUI](https://img.shields.io/badge/UI-DaisyUI-green)](https://daisyui.com/)

## 🚀 Features

- **Automatic README Generation**: Analyzes GitHub repositories and generates detailed README documentation
- **Custom Instructions**: Support for user-defined documentation requirements
- **Multiple Output Formats**: Generate documentation in Markdown, Plain Text, or XML formats
- **Real-time Preview**: Live preview of generated documentation with syntax highlighting
- **Configurable Settings**:
  - Line number display
  - Comment removal
  - Empty line handling
  - Top files summary customization
- **Dark Mode Support**: Built-in theme switching for better visibility
- **Copy & Download**: Easy copying and downloading of generated content
- **Security Checks**: Built-in repository security validation

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15.0.2
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - DaisyUI components
- **UI Components**:
  - React Markdown Preview
  - React Code Block
  - Lucide React Icons
- **State Management**: React Hooks with Local Storage
- **API Integration**: REST APIs with streaming support

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Git

## 💻 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auto-readme-generator.git
cd auto-readme-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3005`

## 🔧 Configuration

The application can be configured through the UI with the following options:

```typescript
{
    output: {
        filePath: string,
        style: "xml" | "plain" | "markdown",
        removeComments: boolean,
        removeEmptyLines: boolean,
        topFilesLength: number,
        showLineNumbers: boolean
    },
    security: {
        enableSecurityCheck: boolean
    }
}
```

## 📖 Usage

1. Enter your GitHub repository URL in the input field
2. Configure output settings:
   - Select output format (Markdown/Plain Text/XML)
   - Adjust file handling preferences
   - Set line number display options
3. Add custom instructions (optional)
4. Click "Generate README" to create documentation
5. Preview, copy, or download the generated content

## 📁 Project Structure

```
auto-readme-generator/
├── app/                    # Next.js application pages
│   ├── ai-output/         # AI generation output components
│   ├── view-context/      # Context viewing components
│   └── layout.tsx         # Root layout component
├── components/            # Reusable React components
│   └── ui/               # UI-specific components
├── services/             # API and service integrations
├── public/               # Static assets
└── styles/               # Global styles and themes
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔜 Future Improvements

- [ ] Add support for multiple GitHub authentication methods
- [ ] Implement custom template system for README generation
- [ ] Add batch processing for multiple repositories
- [ ] Enhance AI analysis capabilities
- [ ] Add support for more output formats
