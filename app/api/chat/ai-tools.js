import { experimental_createMCPClient } from 'ai'

export default async function getTools() {
  const mcpClient = await experimental_createMCPClient({
    transport: {
      type: 'sse',
      url: 'http://localhost:8081/sse',
    },
    name: 'Demo',
    version: '1.0.0',
    onUncaughtError: (error) => {
      console.error('Error in MCP Client:', error)
    },
  })
  const tools = await mcpClient.tools()
  return tools
}
