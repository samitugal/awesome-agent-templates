# Agent Template Constants

This document describes the constant values used throughout the agent template system to ensure consistency and maintainability.

## Overview

All field length limits and display constraints are defined as constants in `lib/constants.ts` rather than being hardcoded throughout the application. This provides:

- **Consistency**: All components use the same limits
- **Maintainability**: Changes to limits only need to be made in one place
- **Type Safety**: Constants are strongly typed
- **Documentation**: Clear reference for all system limits

## Constants

### Field Length Limits

| Constant | Value | Description |
|----------|-------|-------------|
| `DESCRIPTION_MAX_LENGTH` | 150 | Maximum characters for agent descriptions |
| `NAME_MAX_LENGTH` | 100 | Maximum characters for agent names |
| `TAG_MAX_LENGTH` | 50 | Maximum characters for individual tags |
| `AUTHOR_MAX_LENGTH` | 100 | Maximum characters for author names |

### Display Limits

| Constant | Value | Description |
|----------|-------|-------------|
| `MAX_TAGS_DISPLAY` | 4 | Maximum number of tags shown on agent cards |
| `MAX_FRAMEWORKS_DISPLAY` | 5 | Maximum number of framework icons displayed |

## Usage

### In Components

```typescript
import { AGENT_CONSTANTS } from '@/lib/constants';

// Use in component logic
const displayTags = tags.slice(0, AGENT_CONSTANTS.MAX_TAGS_DISPLAY);
```

### In Validation

```typescript
import { AgentValidator } from '@/lib/validation';

// Validate field lengths
const errors = AgentValidator.validateAgentIdentity(identity);
```

### In Schema Generation

The schema is generated dynamically using these constants:

```bash
npm run generate-schema
```

This creates `schemas/agent.schema.json` with the current constant values.

## Modifying Constants

1. Update values in `lib/constants.ts`
2. Run `npm run generate-schema` to update the JSON schema
3. Update any related documentation
4. Test components to ensure UI still works with new limits

## Files Using Constants

- `lib/constants.ts` - Constant definitions
- `lib/validation.ts` - Validation utilities
- `components/AgentCard.tsx` - Display logic
- `scripts/generate-schema.ts` - Schema generation
- `schemas/agent.schema.yaml` - Manual schema (with comments)

## Benefits

- **No Magic Numbers**: All limits are named and documented
- **Single Source of Truth**: One place to change all limits
- **Automatic Validation**: Built-in validation using the same constants
- **Type Safety**: TypeScript ensures correct usage
- **Schema Consistency**: Generated schema always matches code constants
