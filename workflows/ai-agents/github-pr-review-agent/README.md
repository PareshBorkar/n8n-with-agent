# GitHub PR Review Agent

An AI-powered Pull Request review agent built using n8n and Google's Gemini LLM.

This workflow automates the PR review process by analyzing GitHub pull requests and generating intelligent feedback on:

* code quality
* potential bugs
* architectural concerns
* readability
* maintainability
* best practices

The agent integrates GitHub webhooks with Gemini to automatically review code changes whenever a pull request is opened, synchronized, or updated.

## Features

* Automated AI-based PR reviews
* GitHub webhook integration
* Intelligent code analysis using Gemini
* Context-aware review comments
* Maintainability and architecture suggestions
* Scalable workflow automation using n8n
* Easy integration into existing CI/CD pipelines

## Workflow Overview

1. GitHub webhook triggers on PR activity
2. Changed files and diffs are collected
3. Relevant PR context is prepared
4. Gemini analyzes code changes
5. AI-generated review feedback is created
6. Review results are posted back to GitHub or routed to notification systems

## Tech Stack

* n8n
* GitHub APIs
* Google Gemini
* Webhooks
* JavaScript function nodes

## Use Cases

* Automated code review assistance
* Faster engineering feedback loops
* PR quality enforcement
* Development workflow automation
* Early detection of code smells and issues

## Notes

This workflow is designed to augment human code reviews and improve development velocity while maintaining code quality standards.
