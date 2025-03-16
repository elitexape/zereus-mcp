// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from "dotenv";
import fetch from "node-fetch";

// Load environment variables
dotenv.config();

// API configuration
const API_URL = "http://localhost:5050"; //for local demonstration, final Public URL will be provided by Zereus team once the B2B suite is live

// Create server with proper initialization
const server = new McpServer({
  name: "Zereus-zAI",
  version: "1.0.0"
});

/**
 * Function to get sentiment analysis for a token
 * @param {string} tokenSymbol - The symbol of the token to analyze
 * @returns {Promise<object>} - The sentiment analysis data
 */
async function getSentimentAnalysis(tokenSymbol) {
  try {
    console.error(`Calling sentiment analysis API for ${tokenSymbol}...`);
    
    const endpoint = `${API_URL}/api/v1/sentiment-analysis`;
    console.error(`URL: ${endpoint}`);
    
    // Create request body
    const requestBody = {
      query: tokenSymbol,
      timeframe: "12 Hours"
    };
    
    console.error(`Request body: ${JSON.stringify(requestBody)}`);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Z-XAPI": "API-KEY" //Procure your API key by contacting team, or MB @ t.me/mitulbharti 
      },
      body: JSON.stringify(requestBody)
    });

    console.error(`Response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error response: ${errorText}`);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.error(`API response data: ${JSON.stringify(data, null, 2)}`);
    return data;
  } catch (error) {
    console.error("Error fetching sentiment analysis:", error);
    throw error;
  }
}

// Register only the sentiment analysis tool
server.tool(
  "getSentimentAnalysis",
  { tokenSymbol: z.string().describe("The symbol of the token to analyze (e.g., 'SOL', 'BONK', 'TRUMP')") },
  async ({ tokenSymbol }) => {
    try {
      console.error(`Tool called: getSentimentAnalysis with tokenSymbol=${tokenSymbol}`);
      const data = await getSentimentAnalysis(tokenSymbol);
      
      // Extract data with flexible path handling
      const typedData = data as { data?: { sentimentAnalysis?: unknown }; sentimentAnalysis?: unknown };
      let result;
      if (typedData.data?.sentimentAnalysis) {
        result = typedData.data.sentimentAnalysis;
      } else if (typedData.sentimentAnalysis) {
        result = typedData.sentimentAnalysis;
      } else {
        result = typedData;
      }
      
      console.error(`Returning result: ${JSON.stringify(result, null, 2)}`);
      return {
        content: [{ 
          type: "text", 
          text: typeof result === 'string' ? result : JSON.stringify(result, null, 2) 
        }]
      };
    } catch (error) {
      console.error(`Error calling getSentimentAnalysis:`, error);
      return {
        content: [{ 
          type: "text", 
          text: `Error: ${error.message}` 
        }],
        isError: true
      };
    }
  }
);

// Connect and listen
async function main() {
  try {
    // Print debug information
    console.error("Starting Zereus MCP Server...");
    console.error(`API URL: ${API_URL}`);
    
    // Create transport
    console.error("Creating transport...");
    const transport = new StdioServerTransport();
    
    // Connect to transport
    console.error("Connecting to transport...");
    await server.connect(transport);
    
    console.error("✅ Zereus MCP Server is running...");
    console.error("🔌 Claude can now access Zereus zAI market intelligence");
  } catch (err) {
    console.error("❌ Failed to start MCP server:", err);
    console.error("Stack trace:", err.stack);
    process.exit(1);
  }
}

// Add process error handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

main();