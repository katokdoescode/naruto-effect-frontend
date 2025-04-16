# Naruto Effect Frontend Developer Guidelines

## Project Overview
This is a SvelteKit application deployed on Vercel. It uses Supabase for backend services, TinyMCE for rich text editing, and supports internationalization with svelte-i18n.

## Project Structure
- `src/`
  - `lib/`: Shared code
    - `constants/`: Application constants
    - `i18n/`: Internationalization setup
    - `modules/`: Feature-specific modules
    - `ui/`: Reusable UI components
    - `utils/`: Utility functions
  - `routes/`: SvelteKit routes (file-based routing)
  - `app.html`: Main HTML template
  - `hooks.server.js`: Server-side hooks

## Development Workflow

### Setup
```bash
# Install dependencies
npm install
```

### Running the Application
```bash
# Start development server
npm run dev

# Start with browser auto-open
npm run dev -- --open
```

### Building for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Testing
- **Unit Tests**: `npm run test:unit` (uses Vitest)
- **Integration Tests**: `npm run test:integration` (uses Playwright)

## Code Quality
- **Type Checking**: `npm run check`
- **Linting**: `npm run check:biome` (uses Biome)

## Best Practices
1. **File Organization**:
   - Place reusable components in `src/lib/ui/`
   - Keep route-specific components in their respective route directories
   - Use `src/lib/modules/` for feature-specific code

2. **Testing**:
   - Write unit tests for utility functions and components
   - Name test files with `.test.js` or `.spec.js` suffix
   - Integration tests should be in the `tests/` directory

3. **Code Style**:
   - Follow the Biome linting rules
   - Run `npm run check:biome` before committing

4. **Internationalization**:
   - Use the i18n utilities for all user-facing text
   - Add new translations to the appropriate files in `src/lib/i18n/`