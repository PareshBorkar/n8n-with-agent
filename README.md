# n8n Agent Workflows

A collection of AI agents and automation workflows built using n8n.

This repository contains reusable workflows for:
- AI agents
- automation pipelines
- integrations
- internal tooling
- experimentation with LLM-powered systems

---

## Repository Structure

```text
workflows/
├── ai-agents/
├── github/
├── slack/
├── jira/
├── research/
└── utilities/

docs/
assets/
```

---

## Tech Stack

- n8n
- OpenAI APIs
- REST APIs
- Webhooks
- Vector databases
- JavaScript
- Docker

---

## Importing Workflows

1. Open n8n
2. Navigate to:
   ```
   Workflows
   ```
3. Click:
   ```
   Import from File
   ```
4. Select the workflow `.json`

---

## Credentials

Credential secrets are **not stored** in this repository.

After importing workflows:
- configure credentials manually
- reconnect integrations if needed

Example integrations:
- OpenAI
- GitHub
- Slack
- Jira
- Gmail
- PostgreSQL
- Redis

---

## Workflow Categories

### AI Agents

Examples:
- research agents
- summarization agents
- coding assistants
- autonomous workflows
- orchestration pipelines

### Automation

Examples:
- webhook processing
- notifications
- CI/CD automations
- issue management
- integrations

---

## Local Development

Recommended setup:

```bash
Node.js LTS
n8n latest
Docker (optional)
```

Run locally:

```bash
npx n8n
```

---

## Notes

- Some workflows require environment variables
- API rate limits depend on providers
- Certain workflows are experimental

---

## Future Plans

- Multi-agent orchestration
- Shared memory systems
- RAG pipelines
- Workflow observability
- Self-hosted deployment patterns

---

## License

MIT