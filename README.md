# VSL Script Builder

A powerful tool for creating Video Sales Letter scripts using a block-based approach with AI assistance.

## Features

- **Block-Based Script Building**: Create your VSL script using modular, moveable blocks
- **Drag and Drop Interface**: Easily reorder script blocks to perfect your flow
- **AI Writing Assistant**: Each block can generate content using AI prompts
- **Real-Time Preview**: See your full script come together as you build
- **Glassmorphic UI**: Beautiful, modern interface with glass-like effects

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- Yarn package manager

### Configuration

To enable AI content generation, you need to add your OpenAI API key to the `.env` file:

1. Add your OpenAI API key to the `.env` file in the frontend directory:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage Guide

### Creating a VSL Script

1. **Add Script Blocks**: Click on the block type buttons to add new blocks to your script
2. **Edit Content**: Click on any block to edit its content
3. **Rearrange Blocks**: Drag and drop blocks to reorder them
4. **Use AI Assistant**: Click the chat bubble icon to open the AI prompt panel
5. **Generate Content**: Enter a prompt and click "Generate Content"
6. **Save Your Script**: Enter a name for your script and click "Save"
7. **Copy Full Script**: Click "Copy All" to copy the entire script to your clipboard

### Block Types

The VSL Script Builder includes the following block types:

- **Attention Hook**: Grab your viewer's attention
- **Problem Statement**: Define the problem your audience faces
- **Agitate Problem**: Emphasize the negative consequences
- **Solution**: Present your solution
- **Features & Benefits**: Highlight what makes your offer special
- **Testimonial**: Add social proof
- **Offer**: Present your offer details
- **Scarcity/Urgency**: Create urgency for action
- **Guarantee**: Reduce risk with a guarantee
- **Call to Action**: Tell viewers what to do next

## Next Steps for Development

- Add OpenAI API integration for AI content generation
- Add persistent storage with a database
- Implement script templates
- Add export options (PDF, Word, etc.)
- Improve AI integration with more specialized prompts
- Add user authentication for saving scripts to accounts
