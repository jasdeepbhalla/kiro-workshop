# AWS Documentation MCP

Gives Kiro live access to CloudFormation schemas, CDK API docs, and SDK reference.
The agent can answer questions about current AWS services without relying on potentially
stale training data.

## Setup in Kiro

Open Kiro Settings → MCP Servers → Add Server, or create `.kiro/mcp.json` in your project:

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "npx",
      "args": ["-y", "@aws/aws-documentation-mcp-server@latest"]
    }
  }
}
```

No API key required. Requires Node.js and internet access.

## What it enables

- Ask Kiro: "What are the required fields for an AWS::S3::Bucket resource?"
- Ask Kiro: "Show me the CDK L2 construct for DynamoDB"
- Ask Kiro: "What IAM actions does S3 GetObject require?"

## Activate as a Power

In Kiro, open the Powers panel and activate "AWS Power" — this bundles the AWS docs MCP
with curated instructions for CDK and CloudFormation workflows.
