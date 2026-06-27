# GitHub MCP

Gives Kiro read/write access to GitHub repositories — issues, PRs, files, and commits.
The agent can read issues and open PRs directly from inside the IDE.

## Setup in Kiro

Create a GitHub Personal Access Token at github.com/settings/tokens (classic token, `repo` scope).

Add to `.kiro/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

**Never commit your token.** Add `.kiro/mcp.json` to `.gitignore` if it contains credentials,
or use an environment variable instead.

## What it enables

- Ask Kiro: "Summarize open issues in this repo"
- Ask Kiro: "Create a PR for the current branch with a description from the spec"
- Ask Kiro: "What files changed in the last 5 commits?"

## Activate as a Power

In Kiro, open the Powers panel and activate "Git Power" — this bundles the GitHub MCP
with instructions for PR and issue workflows.
