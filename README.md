# Zereus MCP - Crypto Market Intelligence for Claude

A Model Context Protocol server that exposes Zereus's zAI market intelligence capabilities to Claude Desktop and other AI assistants.

Zereus MCP connects [Anthropic's Claude](https://www.anthropic.com/claude) to Zereus zAI market intelligence via the Model Context Protocol (MCP). This integration delivers real-time crypto sentiment analysis, token metrics, and trend detection directly in conversations with Claude.

This repository contains the MCP server implementation that enables Claude to access Zereus' crypto market intelligence.

NOTE - API KEY is required for this to work. Please contact Zereus team for the API key, for demo purposes we have included a video below.

## Features

- **Real-time Sentiment Analysis**: Get instant sentiment analysis for any crypto token
- **Seamless Claude Integration**: Access market insights directly in your Claude conversations
- **Developer-friendly**: Simple API for integrating crypto intelligence into your applications

## Demo

This MCP server is a demonstration of our upcoming B2B API suite, which includes:

- Text-based analysis through Claude (this repository)
- GUI dashboard connected to our API suite
- 18+ specialized endpoints for comprehensive market intelligence

Check out our [announcement tweet](https://x.com/zereusai/status/1901096538233074156) for a preview!

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

## Social

- Twitter: [@zereusai](https://twitter.com/zereusai)
