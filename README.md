# Naruto Effect

A networked community of cultural practitioners developing and practicing various forms of living virtual collaborations.

## Project Overview

This is a SvelteKit application deployed on Vercel. It serves as the website for the "Effect Naruto" art community, providing a platform for collaboration and cultural practice in virtual environments.
Reach the website: [https://narutoeffect.org/](https://narutoeffect.org/).

### Tech Stack

- **Frontend Framework**: SvelteKit
- **Deployment**: Vercel
- **Backend Services**: Supabase
- **Rich Text Editing**: TinyMCE
- **Internationalization**: svelte-i18n

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
- `static/`: Static assets
- `supabase/`: Supabase configuration and migrations
  - `config.toml`: Supabase configuration
  - `migrations/`: Database migrations
  - `seed.sql`: Initial database seed data
- `tests/`: Integration tests

## Development Setup

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or another package manager
- Supabase CLI (for local database development)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/naruto-effect-frontend.git
cd naruto-effect-frontend

# Install dependencies
npm install
```

### Running the Application Locally

```bash
# Start development server
npm run dev

# Start with browser auto-open
npm run dev -- --open
```

The application will be available at `http://localhost:5173` by default.

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Database Setup

This project uses Supabase for backend services. To set up the database locally:

1. Install the Supabase CLI following the [official documentation](https://supabase.com/docs/guides/cli)

2. Start the local Supabase instance:
   ```bash
   supabase start
   ```

3. The local Supabase instance will be available at `http://localhost:54321`

4. Apply migrations:
   ```bash
   supabase db reset
   ```
   This will apply all migrations and seed data from the `supabase/migrations` and `supabase/seed.sql` files.

5. To connect your application to the local Supabase instance, update your environment variables accordingly.

## Testing

### Unit Tests

```bash
# Run unit tests
npm run test:unit
```

Unit tests are written using Vitest and are located alongside the components they test.

### Integration Tests

```bash
# Run integration tests
npm run test:integration
```

Integration tests are written using Playwright and are located in the `tests/` directory.

## Code Quality

```bash
# Run type checking
npm run check

# Run linting
npm run check:biome
```

## How to Contribute

We welcome contributions to the Naruto Effect project! Here's how you can contribute:

### Getting Started

1. Fork the repository on GitHub
2. Clone your fork to your local machine
3. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`

### Development Workflow

1. Make your changes following the project's coding standards
2. Run tests to ensure your changes don't break existing functionality
3. Run linting to ensure code quality: `npm run check:biome`
4. Commit your changes with a descriptive commit message

### Pull Request Process

1. Push your changes to your fork on GitHub
2. Open a Pull Request (PR) against the main repository
3. Ensure your PR description clearly describes the problem and solution
4. Link any relevant issues in the PR description
5. Wait for code review and address any feedback

### Code Standards

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

### Issues and Discussions

- Use GitHub Issues to report bugs or request features
- Join discussions to share ideas and feedback
- Be respectful and constructive in all communications
