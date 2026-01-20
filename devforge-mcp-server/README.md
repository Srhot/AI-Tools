# DevForge MCP Server

**DevForge** is an AI Software Factory that automatically creates complete project structures from ideas. It's an MCP (Model Context Protocol) server that integrates with **Claude Code** to provide powerful project generation and management capabilities.

## Features

### 1. Automatic Project Creation
- Takes project ideas and generates complete, production-ready structures
- Supports multiple project types: web, API, CLI, desktop, mobile, library
- Configures appropriate folder structures and boilerplate code
- Sets up dependencies and configuration files automatically

### 2. Auto-Refresh System (CRITICAL)
- Prevents context loss during long development sessions
- Automatically saves project state
- Generates continuation prompts for seamless work resumption
- Maintains full context across multiple sessions

### 3. Automatic Progress Tracking
- Real-time progress monitoring
- Task completion tracking
- Phase-based development workflow
- Next steps generation

### 4. POML Template Generation
- Creates Project Orchestration Markup Language templates
- Human-readable project manifests
- Auto-updated as project evolves
- Serves as single source of truth for project state

## Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Running in Development Mode
```bash
npm run dev
```

### Running in Production
```bash
npm start
```

### Building
```bash
npm run build
```

## MCP Tools

DevForge provides 5 powerful tools:

### 1. `create_project`
Creates a complete project from scratch.

**Parameters:**
- `name` (string, required): Project name
- `type` (string, required): Project type (web, api, cli, desktop, mobile, library)
- `tech_stack` (string, required): Technology stack
- `description` (string, required): Project description
- `features` (array, optional): List of features to implement

**Example:**
```json
{
  "name": "my-awesome-app",
  "type": "web",
  "tech_stack": "react-typescript",
  "description": "A modern web application",
  "features": ["user-auth", "dashboard", "api-integration"]
}
```

### 2. `get_project_status`
Get current status and progress of a project.

**Parameters:**
- `project_name` (string, required): Name of the project

**Returns:**
- Current progress
- Completed tasks
- Next steps
- Progress percentage

### 3. `generate_poml`
Generate or update POML template.

**Parameters:**
- `project_name` (string, required): Name of the project
- `update_mode` (boolean, optional): Update existing or create new

**Output:**
Creates/updates `PROJECT.poml` file with current project state.

### 4. `auto_refresh`
Save state and generate continuation prompt to prevent context loss.

**Parameters:**
- `project_name` (string, required): Name of the project

**Critical Feature:**
- Saves complete project state to `.devforge/state.json`
- Generates continuation prompt for seamless resumption
- Call this before reaching context limits
- Essential for long-running projects

### 5. `add_feature`
Add new features to existing projects.

**Parameters:**
- `project_name` (string, required): Name of the project
- `feature_name` (string, required): Feature description
- `implementation_notes` (string, optional): Additional details

## Configuration

DevForge MCP works with both:
- **Claude Desktop** app (Chat + Code tabs)
- **Standalone Claude Code**

### Quick Setup

1. **Build the project:**
```bash
npm run build
```

2. **Configure .env file:**
Create a `.env` file with your API key:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
```

3. **Add MCP Configuration:**

#### For Claude Desktop App (Chat + Code tabs)

Edit `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "devforge": {
      "command": "node",
      "args": ["d:\\AI-Tools\\devforge-mcp-server\\build\\index.js"],
      "env": {
        "AI_PROVIDER": "gemini",
        "GEMINI_API_KEY": "YOUR_GEMINI_API_KEY_HERE"
      }
    }
  }
}
```

#### For Standalone Claude Code

Edit `%USERPROFILE%\.claude\mcp.json` or use `claude mcp add devforge`:

```json
{
  "mcpServers": {
    "devforge": {
      "command": "node",
      "args": ["d:\\AI-Tools\\devforge-mcp-server\\build\\index.js"],
      "env": {
        "AI_PROVIDER": "gemini",
        "GEMINI_API_KEY": "YOUR_GEMINI_API_KEY_HERE"
      }
    }
  }
}
```

**Alternative providers:**
- For Claude: Set `AI_PROVIDER=claude` and use `ANTHROPIC_API_KEY`
- For OpenAI: Set `AI_PROVIDER=openai` and use `OPENAI_API_KEY`

For detailed configuration options, see [CLAUDE_CODE_CONFIG.md](./CLAUDE_CODE_CONFIG.md)

## Project Structure

```
devforge-mcp-server/
├── src/
│   └── index.ts          # Main MCP server implementation
├── build/                # Compiled TypeScript output
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## POML (Project Orchestration Markup Language)

Every project created by DevForge includes a `PROJECT.poml` file that serves as:

- **Project Manifest**: Single source of truth for project state
- **Progress Tracker**: Real-time progress and task completion
- **Context Keeper**: Maintains project context across sessions
- **Human-Readable**: Easy to understand and edit manually

Example POML:
```toml
[project]
name = "my-app"
type = "web"
tech_stack = "react-typescript"
status = "active"

[progress]
total_tasks = 20
completed_tasks = 8
current_phase = "development"
progress_percentage = 40.00%

[features]
feature_1 = "user-auth"
feature_2 = "dashboard"

[next_steps]
step_1 = "Implement core features"
step_2 = "Write tests"
```

## Workflow Example

1. **Create Project:**
```
Use create_project tool with your idea
→ DevForge generates complete structure
→ POML template created
→ Ready to start coding
```

2. **Track Progress:**
```
Use get_project_status
→ See current progress
→ View next steps
→ Monitor completion percentage
```

3. **Prevent Context Loss:**
```
Use auto_refresh before context limit
→ State saved to .devforge/state.json
→ Continuation prompt generated
→ Resume seamlessly in new session
```

4. **Add Features:**
```
Use add_feature to extend project
→ Project state updated
→ New tasks added to progress tracker
→ POML automatically updated
```

## Supported Project Types

### Web Applications
- React, Vue, Angular, Svelte
- TypeScript/JavaScript
- Modern build tools (Vite, Webpack)
- Component-based architecture

### API Servers
- Express, Fastify, Koa
- REST and GraphQL
- MVC architecture
- Middleware support

### CLI Tools
- Node-based CLI frameworks
- Command structure
- Argument parsing
- Interactive prompts

### Desktop Applications
- Electron
- Tauri
- Cross-platform support

### Mobile Applications
- React Native
- Ionic
- Cross-platform frameworks

### Libraries
- npm packages
- Module bundling
- Testing setup
- Documentation

## Auto-Refresh System Details

The auto-refresh system is **CRITICAL** for preventing context loss:

### When to Use:
- Before reaching Claude's context window limit
- After implementing major features
- Before switching tasks
- At natural breakpoints in development

### What It Saves:
- Complete project state
- All progress tracking data
- Feature list and status
- Next steps and recommendations
- File structure and metadata

### How to Resume:
1. Use the generated continuation prompt
2. Load saved state from `.devforge/state.json`
3. Continue exactly where you left off
4. No context loss, no repeated work

## Best Practices

1. **Use Auto-Refresh Frequently**: Don't wait until context is full
2. **Update POML Regularly**: Keep project manifest current
3. **Check Status Often**: Use get_project_status to stay informed
4. **Add Features Incrementally**: Break large features into smaller tasks
5. **Review Generated Code**: DevForge creates structure, you add logic
6. **Commit Regularly**: Use version control for all projects

## Troubleshooting

### Server Won't Start
- Check that all dependencies are installed: `npm install`
- Verify build completed successfully: `npm run build`
- Check Node.js version (requires Node 16+)

### Project Creation Fails
- Ensure project name doesn't contain invalid characters
- Check write permissions in target directory
- Verify disk space available

### State Not Saving
- Check `.devforge` folder exists and is writable
- Verify project path is correct
- Ensure sufficient permissions

## Contributing

DevForge is designed to be extensible. To add new project types:

1. Add type to `generateProjectStructure()` method
2. Define folder structure and files
3. Create appropriate boilerplate templates
4. Update POML template generation

## License

ISC

## Support

For issues, questions, or feature requests, please open an issue on the project repository.

---

**DevForge** - AI Software Factory
*Transforming ideas into production-ready projects automatically*
