# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within Awesome Agent Templates, please send an email to the maintainers through GitHub's private vulnerability reporting feature or create a security advisory.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to Include

When reporting a vulnerability, please include:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### Response Timeline

- We will acknowledge your email within 48 hours
- We will provide a more detailed response within 7 days
- We will work on a fix and release it as soon as possible
- We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices

When contributing agent templates:

1. **Never include sensitive data** in templates (API keys, passwords, tokens)
2. **Validate all inputs** in system prompts
3. **Use secure tool providers** with proper authentication
4. **Document security requirements** in agent metadata
5. **Follow principle of least privilege** in tool permissions
6. **Test agents in sandboxed environments** before deployment

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release new versions as soon as possible

Thank you for helping keep Awesome Agent Templates and our community safe!
