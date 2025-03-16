# Zereus MCP Server

A Model Context Protocol server that exposes Zereus's zAI market intelligence capabilities to Claude Desktop and other AI assistants.

## Features

- Get sentiment analysis for any Solana token

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Claude Desktop app installed

## Quick Setup

1. Clone this repository:
```bash
git clone https://github.com/elitexape/zereus-mcp.git
cd zereus-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Configure Claude Desktop:
   - For macOS:
   ```bash
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```
   - For Windows:
   ```bash
   code %APPDATA%\Claude\claude_desktop_config.json
   ```

5. Update the Claude Desktop configuration with:
```json
{
  "mcpServers": {
    "zereus": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/YOUR/zereus-mcp/build/index.js"
      ]
    }
  }
}
```

6. Restart Claude Desktop

## Usage Examples

Once set up, you can ask Claude Desktop questions like:

- "What's the current sentiment analysis for BONK token?"
- "What's the sentiment analysis for TRUMP token?"
- "Analyze the sentiment for SOL token"
