#!/usr/bin/env node

/**
 * DevForge MCP Server - Complete AI Software Factory
 *
 * Complete workflow:
 * 1. Requirements → Decision Matrix → User Approval
 * 2. Generate Spec-Kit (Constitution, Spec, Plan, Tasks, POML)
 * 3. Backend Development + API Testing (Postman/Newman)
 * 4. Frontend Prompt Generation (Google Stitch/Lovable)
 * 5. BDD Testing (Cucumber/Gherkin)
 * 6. Context Preservation (Checkpoints every 20-25 tasks)
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { AdapterFactory, AIProvider } from './adapters/adapter-factory.js';
import { MasterOrchestrator } from './modules/master-orchestrator.js';
import { WorkflowState } from './modules/master-orchestrator.js';
import { NotebookLMClient, getNotebookLMClient } from './integrations/notebooklm-client.js';
import { A2UIGenerator, getA2UIGenerator, A2UIPlatform, UIScreen } from './generators/a2ui-generator.js';

// AI Provider Configuration
const aiProvider = (process.env.AI_PROVIDER || 'gemini') as AIProvider;

// API Key Priority: Gemini → Anthropic → OpenAI
const aiApiKey = process.env.GEMINI_API_KEY ||
  process.env.AI_API_KEY ||
  process.env.ANTHROPIC_API_KEY ||
  process.env.OPENAI_API_KEY ||
  '';

const aiModel = process.env.AI_MODEL;

if (!aiApiKey) {
  console.error('❌ Error: No API key provided');
  console.error('Please set one of: GEMINI_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY');
  process.exit(1);
}

// Create AI Adapter
const aiAdapter = AdapterFactory.createAdapter({
  provider: aiProvider,
  apiKey: aiApiKey,
  model: aiModel,
});

// Create Master Orchestrator
const masterOrchestrator = new MasterOrchestrator(aiAdapter);

// NotebookLM Integration
const notebookLMEnabled = process.env.NOTEBOOKLM_ENABLED === 'true';
const notebookLMClient = getNotebookLMClient({ enabled: notebookLMEnabled });

// A2UI Generator
const a2uiGenerator = getA2UIGenerator();

console.log(`🤖 DevForge MCP Server v3.0 - Complete AI Software Factory`);
console.log(`📡 AI Provider: ${aiProvider}`);
console.log(`🎯 Model: ${aiModel || AdapterFactory.getDefaultModel(aiProvider)}`);
console.log(`📚 NotebookLM: ${notebookLMEnabled ? 'Enabled' : 'Disabled'}`);
console.log(`🎨 A2UI: Enabled (React, Flutter, React Native, Web, Angular, Console)`);
console.log(`✨ Features: Decision Matrix, Spec-Kit, POML, API Testing, BDD, Context Preservation, A2UI`);

// DevForge Server - Complete Workflow Manager
class DevForgeServer {
  private server: Server;
  private workflowStates: Map<string, WorkflowState> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: "devforge-mcp-server",
        version: "2.0.0", // Upgraded!
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.getTools(),
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "start_project":
            return await this.startProject(args);
          case "approve_architecture":
            return await this.approveArchitecture(args);
          case "generate_api_tests":
            return await this.generateAPITests(args);
          case "ask_frontend_questions":
            return await this.askFrontendQuestions(args);
          case "generate_frontend_prompt":
            return await this.generateFrontendPrompt(args);
          case "generate_bdd_tests":
            return await this.generateBDDTests(args);
          case "create_checkpoint":
            return await this.createCheckpoint(args);
          case "get_workflow_status":
            return await this.getWorkflowStatus(args);
          case "complete_task":
            return await this.completeTask(args);
          case "check_knowledge_base":
            return await this.checkKnowledgeBase(args);
          case "generate_ui_blueprint":
            return await this.generateUIBlueprint(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    });
  }

  private getTools(): Tool[] {
    return [
      {
        name: "start_project",
        description: "PHASE 1: Start new project - gathers requirements and generates decision matrix with architecture options. User must review and answer questions before proceeding.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Project name (e.g., 'task-manager-app')",
            },
            project_type: {
              type: "string",
              description: "Project type",
              enum: ["web", "api", "cli", "desktop", "mobile", "library"],
            },
            description: {
              type: "string",
              description: "Detailed project description explaining what the app should do",
            },
            requirements: {
              type: "array",
              items: { type: "string" },
              description: "List of user requirements/features",
            },
          },
          required: ["project_name", "project_type", "description", "requirements"],
        },
      },
      {
        name: "approve_architecture",
        description: "PHASE 2: After user answers decision matrix questions and approves architecture choice. Generates complete Spec-Kit (Constitution, Specification, Technical Plan, Tasks) and POML files with context preservation system.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
            decision_matrix_answers: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  questionId: { type: "string" },
                  answer: { type: "string" },
                },
              },
              description: "User's answers to decision matrix questions",
            },
          },
          required: ["project_name", "decision_matrix_answers"],
        },
      },
      {
        name: "generate_api_tests",
        description: "PHASE 3: Generate Postman collection and environments for API testing. Creates collection.json, dev/staging/prod environments, and Newman CLI test commands. User can test APIs manually in Postman or automatically with Newman CLI.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
          },
          required: ["project_name"],
        },
      },
      {
        name: "ask_frontend_questions",
        description: "PHASE 4a: Ask user questions about frontend preferences before generating prompt. Asks about platform (Google Stitch/Lovable/v0/Bolt), design style, colors, features needed.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
          },
          required: ["project_name"],
        },
      },
      {
        name: "generate_frontend_prompt",
        description: "PHASE 4b: Generate comprehensive frontend prompt for no-code platforms (Google Stitch, Lovable, v0.dev, Bolt.new). Creates detailed prompt with component breakdown, design system, API integration, and user flows. User can copy this prompt to their chosen platform.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
            frontend_answers: {
              type: "object",
              description: "User's answers to frontend questions (platform, designStyle, colorScheme, primaryColor, features, uiFramework)",
            },
          },
          required: ["project_name", "frontend_answers"],
        },
      },
      {
        name: "generate_bdd_tests",
        description: "PHASE 5: Generate BDD/Cucumber/Gherkin tests for human-readable behavior specifications. Creates feature files, step definitions, and test configuration. Tests can be run with npm run test:bdd.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
          },
          required: ["project_name"],
        },
      },
      {
        name: "create_checkpoint",
        description: "CONTEXT PRESERVATION: Create checkpoint to prevent context loss. Call this every 20-25 completed tasks or when switching between major phases. Saves state to POML, generates continuation prompt for resuming after context loss.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
            completed_task_ids: {
              type: "array",
              items: { type: "string" },
              description: "IDs of tasks completed since last checkpoint (e.g., ['T001', 'T002', 'T003'])",
            },
            current_task_id: {
              type: "string",
              description: "ID of current task being worked on (or null if none)",
            },
            issues_encountered: {
              type: "array",
              items: { type: "string" },
              description: "Any issues encountered since last checkpoint",
              default: [],
            },
          },
          required: ["project_name", "completed_task_ids"],
        },
      },
      {
        name: "get_workflow_status",
        description: "Get complete workflow status including current phase, progress, completed tasks, next steps, and whether checkpoint is needed.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
          },
          required: ["project_name"],
        },
      },
      {
        name: "complete_task",
        description: "Mark a task as complete and automatically create checkpoint if 20-25 tasks have been completed since last checkpoint. Updates progress tracking.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
            task_id: {
              type: "string",
              description: "ID of completed task (e.g., 'T001')",
            },
          },
          required: ["project_name", "task_id"],
        },
      },
      {
        name: "check_knowledge_base",
        description: "Check if NotebookLM has relevant documentation for the project. If found, uses grounded, citation-backed context for spec generation. If not found, falls back to AI generation.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project to search for",
            },
            project_description: {
              type: "string",
              description: "Description of what the project does",
            },
            keywords: {
              type: "array",
              items: { type: "string" },
              description: "Optional keywords to search for in NotebookLM",
            },
          },
          required: ["project_name", "project_description"],
        },
      },
      {
        name: "generate_ui_blueprint",
        description: "Generate A2UI (Agent-to-UI) JSON blueprint for cross-platform UI. Supports React, Flutter, React Native, Web, Angular, and Console. Returns declarative UI definition that can be rendered by any supported framework.",
        inputSchema: {
          type: "object",
          properties: {
            project_name: {
              type: "string",
              description: "Name of the project",
            },
            platform: {
              type: "string",
              enum: ["react", "flutter", "react-native", "web", "angular", "console"],
              description: "Target platform for UI generation",
            },
            screens: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  route: { type: "string" },
                  description: { type: "string" },
                  components: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
              description: "List of screens to generate",
            },
          },
          required: ["project_name", "platform", "screens"],
        },
      },
    ];
  }

  /**
   * PHASE 1: Start project with decision matrix
   */
  private async startProject(args: any) {
    const { project_name, project_type, description, requirements } = args;

    console.log(`\n🚀 PHASE 1: Starting project "${project_name}"`);

    const result = await masterOrchestrator.startProject(
      project_name,
      project_type,
      description,
      requirements
    );

    // Initialize workflow state
    const workflowState: WorkflowState = {
      projectName: project_name,
      currentPhase: 'decision_matrix',
      completedPhases: ['requirements'],
      requirements,
      decisionMatrix: result.decisionMatrix,
      postmanGenerated: false,
      frontendPromptGenerated: false,
      bddTestsGenerated: false,
      tasksCompleted: 0,
      lastCheckpointTask: 0,
      issues: [],
    };

    this.workflowStates.set(project_name, workflowState);

    return {
      content: [
        {
          type: "text",
          text: `✅ PHASE 1 COMPLETE: Decision Matrix Generated

Project: ${project_name}
Type: ${project_type}

📋 Decision Matrix Questions (${result.decisionMatrix.questions.length} questions):

${result.decisionMatrix.questions.map((q: any, i: number) =>
            `${i + 1}. [${q.category.toUpperCase()}] ${q.question}
   Type: ${q.type}
   ${q.options ? `Options: ${q.options.join(', ')}` : ''}
`).join('\n')}

🎯 NEXT STEP:
Please review these questions and provide your answers. Then call the "approve_architecture" tool with your answers to proceed to Spec-Kit generation.

Example:
{
  "project_name": "${project_name}",
  "decision_matrix_answers": [
    { "questionId": "arch_01", "answer": "Microservices" },
    { "questionId": "tech_01", "answer": "PostgreSQL" },
    ...
  ]
}`,
        },
      ],
    };
  }

  /**
   * PHASE 2: Generate Spec-Kit after architecture approval
   */
  private async approveArchitecture(args: any) {
    const { project_name, decision_matrix_answers } = args;
    const state = this.workflowStates.get(project_name);

    if (!state || !state.decisionMatrix) {
      throw new Error(`Project not started. Call start_project first.`);
    }

    console.log(`\n📚 PHASE 2: Generating Spec-Kit for "${project_name}"`);

    // Complete decision matrix with answers
    const completedMatrix = {
      ...state.decisionMatrix,
      answers: decision_matrix_answers,
    };

    // Generate Spec-Kit
    const projectPath = `C:\\Users\\serha\\OneDrive\\Desktop\\devforge-projects\\${project_name}`;
    const result = await masterOrchestrator.generateSpecKit(
      project_name,
      state.decisionMatrix.projectType,
      state.requirements.join('\n'),
      completedMatrix,
      projectPath
    );

    // Update workflow state
    state.specKit = result.specKit;
    state.pomlState = result.pomlState;
    state.currentPhase = 'backend_dev';
    state.completedPhases.push('decision_matrix', 'spec_kit');

    return {
      content: [
        {
          type: "text",
          text: `✅ PHASE 2 COMPLETE: Spec-Kit Generated

📁 Project Location: ${projectPath}

📄 Generated Files:
${result.files.map(f => `  ✓ ${f}`).join('\n')}

📊 Project Breakdown:
  • Tasks: ${result.specKit.tasks.length} tasks planned
  • Estimated: ${result.specKit.tasks.reduce((sum: number, t: any) => sum + t.estimatedHours, 0)} hours
  • Features: ${result.specKit.specification.functionalRequirements.length} functional requirements

📋 Task Categories:
${Object.entries(
            result.specKit.tasks.reduce((acc: any, task: any) => {
              acc[task.type] = (acc[task.type] || 0) + 1;
              return acc;
            }, {})
          ).map(([type, count]) => `  • ${type}: ${count} tasks`).join('\n')}

💾 Context Preservation:
  • POML file created: PROJECT.poml
  • State saved: .devforge/state.json
  • Checkpoint system active (every 20-25 tasks)

🎯 NEXT STEPS:
1. Review the generated Spec-Kit in ${projectPath}/docs/
2. Begin backend development
3. Call "generate_api_tests" when APIs are ready for testing
4. Use "complete_task" to mark tasks done (auto-checkpoint every 20-25 tasks)
5. Use "create_checkpoint" manually anytime to save progress`,
        },
      ],
    };
  }

  /**
   * PHASE 3: Generate API tests
   */
  private async generateAPITests(args: any) {
    const { project_name } = args;
    const state = this.workflowStates.get(project_name);

    if (!state || !state.specKit) {
      throw new Error(`Spec-Kit not generated. Call approve_architecture first.`);
    }

    console.log(`\n🧪 PHASE 3: Generating API Tests for "${project_name}"`);

    const projectPath = `C:\\Users\\serha\\OneDrive\\Desktop\\devforge-projects\\${project_name}`;
    const result = await masterOrchestrator.generateAPITests(
      state.specKit,
      projectPath
    );

    state.postmanGenerated = true;
    state.currentPhase = 'api_testing';
    state.completedPhases.push('backend_dev');

    return {
      content: [
        {
          type: "text",
          text: `✅ PHASE 3 COMPLETE: API Tests Generated

📁 Postman Collection:
  ✓ ${result.collectionPath}

🌍 Environments:
${result.environmentPaths.map(p => `  ✓ ${p}`).join('\n')}

📖 Testing Guide:
  ✓ ${projectPath}\\docs\\API_TESTING_GUIDE.md

🧪 Newman Commands:
  • Run all tests:
    ${result.newmanCommands.runAll}

  • Run with HTML report:
    ${result.newmanCommands.runWithReporter}

  • Run for CI/CD:
    ${result.newmanCommands.cicd}

🎯 NEXT STEPS:
1. Import ${result.collectionPath} to Postman
2. Select environment (dev/staging/prod)
3. Run tests manually OR use Newman CLI
4. Report any failures - I'll fix them!
5. When APIs are tested and working, call "ask_frontend_questions" to start frontend`,
        },
      ],
    };
  }

  /**
   * PHASE 4a: Ask frontend questions
   */
  private async askFrontendQuestions(args: any) {
    const { project_name } = args;
    const state = this.workflowStates.get(project_name);

    if (!state) {
      throw new Error(`Project not found`);
    }

    const questions = `📝 Frontend Preferences Questions:

Please answer these questions to generate your frontend prompt:

1. **Platform**: Which no-code/low-code platform will you use?
   Options: google-stitch, lovable, v0, bolt, generic

2. **Design Style**: What design style do you prefer?
   Options: modern, minimal, colorful, professional, playful

3. **Color Scheme**: Light or dark mode?
   Options: light, dark, auto

4. **Primary Color**: What should be the main color?
   Examples: blue, green, purple, red, orange

5. **UI Framework** (optional): Which UI library to use?
   Options: tailwind, mui, chakra, ant-design

6. **Features**: What UI features do you need?
   Examples: dark mode toggle, responsive design, animations, accessibility

After answering, call "generate_frontend_prompt" with your answers in this format:
{
  "project_name": "${project_name}",
  "frontend_answers": {
    "platform": "lovable",
    "designStyle": "modern",
    "colorScheme": "dark",
    "primaryColor": "blue",
    "uiFramework": "tailwind",
    "features": "dark mode, responsive, smooth animations"
  }
}`;

    return {
      content: [{ type: "text", text: questions }],
    };
  }

  /**
   * PHASE 4b: Generate frontend prompt
   */
  private async generateFrontendPrompt(args: any) {
    const { project_name, frontend_answers } = args;
    const state = this.workflowStates.get(project_name);

    if (!state || !state.specKit) {
      throw new Error(`Spec-Kit not generated`);
    }

    console.log(`\n🎨 PHASE 4: Generating Frontend Prompt for "${project_name}"`);

    const projectPath = `C:\\Users\\serha\\OneDrive\\Desktop\\devforge-projects\\${project_name}`;
    const result = await masterOrchestrator.generateFrontendPrompt(
      state.specKit,
      frontend_answers,
      projectPath
    );

    state.frontendPromptGenerated = true;
    state.currentPhase = 'frontend_prompt';
    state.completedPhases.push('api_testing');

    return {
      content: [
        {
          type: "text",
          text: `✅ PHASE 4 COMPLETE: Frontend Prompt Generated

📄 Prompt File: ${result.promptPath}

🎨 Prompt Details:
  • Platform: ${frontend_answers.platform}
  • Design Style: ${frontend_answers.designStyle}
  • Components: ${result.prompt.componentBreakdown.length} components identified
  • User Flows: ${result.prompt.userFlowPrompts.length} flows defined

📋 Generated Sections:
  ✓ Main comprehensive prompt
  ✓ Component breakdown (${result.prompt.componentBreakdown.length} components)
  ✓ Design system specifications
  ✓ API integration instructions
  ✓ User flow implementations

🎯 NEXT STEPS:
1. Open ${result.promptPath}
2. Copy the "Main Prompt" section
3. Paste into ${frontend_answers.platform}
4. Review generated design
5. Use component/flow prompts to refine specific parts
6. When frontend is ready, call "generate_bdd_tests" for final testing`,
        },
      ],
    };
  }

  /**
   * PHASE 5: Generate BDD tests
   */
  private async generateBDDTests(args: any) {
    const { project_name } = args;
    const state = this.workflowStates.get(project_name);

    if (!state || !state.specKit) {
      throw new Error(`Spec-Kit not generated`);
    }

    console.log(`\n🥒 PHASE 5: Generating BDD Tests for "${project_name}"`);

    const projectPath = `C:\\Users\\serha\\OneDrive\\Desktop\\devforge-projects\\${project_name}`;
    const result = await masterOrchestrator.generateBDDTests(
      state.specKit,
      projectPath
    );

    state.bddTestsGenerated = true;
    state.currentPhase = 'bdd_testing';
    state.completedPhases.push('frontend_integration');

    return {
      content: [
        {
          type: "text",
          text: `✅ PHASE 5 COMPLETE: BDD Tests Generated

🥒 Feature Files (${result.featurePaths.length}):
${result.featurePaths.map(p => `  ✓ ${p}`).join('\n')}

📝 Step Definitions:
  ✓ ${result.stepDefinitionsPath}

⚙️ Configuration:
${result.configPaths.map(p => `  ✓ ${p}`).join('\n')}

🧪 Running Tests:
  • Run all BDD tests:
    npm run test:bdd

  • Run with watch mode:
    npm run test:bdd:watch

  • Generate coverage report:
    npm run test:bdd:coverage

🎯 NEXT STEPS:
1. Run: npm install (install test dependencies)
2. Run: npm run test:bdd
3. Fix any failing tests
4. Create final checkpoint with: create_checkpoint
5. Deploy your application! 🚀

🎉 PROJECT COMPLETE!`,
        },
      ],
    };
  }

  /**
   * Create checkpoint for context preservation
   */
  private async createCheckpoint(args: any) {
    const { project_name, completed_task_ids, current_task_id = null, issues_encountered = [] } = args;
    const state = this.workflowStates.get(project_name);

    if (!state || !state.pomlState) {
      throw new Error(`Project not found or Spec-Kit not generated`);
    }

    console.log(`\n💾 Creating Checkpoint for "${project_name}"`);

    const projectPath = `C:\\Users\\serha\\OneDrive\\Desktop\\devforge-projects\\${project_name}`;
    const result = await masterOrchestrator.createCheckpoint(
      state.pomlState,
      completed_task_ids,
      current_task_id,
      issues_encountered,
      projectPath
    );

    state.tasksCompleted += completed_task_ids.length;
    state.lastCheckpointTask = state.tasksCompleted;

    return {
      content: [
        {
          type: "text",
          text: `✅ Checkpoint Created: ${result.checkpoint.id}

📊 Progress:
  • Tasks completed: ${state.tasksCompleted}/${state.specKit?.tasks.length || 0}
  • Progress: ${state.pomlState.overallProgress.toFixed(1)}%
  • Phase: ${result.checkpoint.phase}

💾 Saved Files:
  ✓ PROJECT.poml (updated)
  ✓ .devforge/state.json
  ✓ .devforge/continuation-prompt.txt

🔄 Context Preservation:
  • Checkpoint ID: ${result.checkpoint.id}
  • Timestamp: ${result.checkpoint.timestamp}
  • Next checkpoint due in: ~20-25 tasks

📝 Continuation Prompt:
${result.continuationPrompt.substring(0, 500)}...

(Full prompt saved to .devforge/continuation-prompt.txt)

✅ Safe to continue or lose context - all progress preserved!`,
        },
      ],
    };
  }

  /**
   * Get workflow status
   */
  private async getWorkflowStatus(args: any) {
    const { project_name } = args;
    const state = this.workflowStates.get(project_name);

    if (!state) {
      throw new Error(`Project '${project_name}' not found`);
    }

    const checkpointNeeded = state.tasksCompleted - state.lastCheckpointTask >= 20;

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              project: project_name,
              currentPhase: state.currentPhase,
              completedPhases: state.completedPhases,
              tasksCompleted: state.tasksCompleted,
              totalTasks: state.specKit?.tasks.length || 0,
              progress: state.pomlState?.overallProgress || 0,
              checkpointNeeded,
              postmanGenerated: state.postmanGenerated,
              frontendPromptGenerated: state.frontendPromptGenerated,
              bddTestsGenerated: state.bddTestsGenerated,
              issues: state.issues,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  /**
   * Complete a task (auto-checkpoint if needed)
   */
  private async completeTask(args: any) {
    const { project_name, task_id } = args;
    const state = this.workflowStates.get(project_name);

    if (!state || !state.pomlState) {
      throw new Error(`Project not found`);
    }

    state.tasksCompleted++;
    const tasksSinceCheckpoint = state.tasksCompleted - state.lastCheckpointTask;

    let checkpointCreated = false;
    let checkpointInfo = null;

    // Auto-checkpoint if 20+ tasks completed
    if (tasksSinceCheckpoint >= 20) {
      console.log(`\n⚠️  Auto-checkpoint triggered (${tasksSinceCheckpoint} tasks since last checkpoint)`);

      const projectPath = `C:\\Users\\serha\\OneDrive\\Desktop\\devforge-projects\\${project_name}`;
      const result = await masterOrchestrator.createCheckpoint(
        state.pomlState,
        [task_id],
        null,
        [],
        projectPath
      );

      state.lastCheckpointTask = state.tasksCompleted;
      checkpointCreated = true;
      checkpointInfo = result.checkpoint;
    }

    return {
      content: [
        {
          type: "text",
          text: `✅ Task Completed: ${task_id}

📊 Progress:
  • Total completed: ${state.tasksCompleted}/${state.specKit?.tasks.length || 0}
  • Tasks since last checkpoint: ${checkpointCreated ? 0 : tasksSinceCheckpoint}

${checkpointCreated ? `
💾 AUTO-CHECKPOINT CREATED: ${checkpointInfo.id}
  • Phase: ${checkpointInfo.phase}
  • Timestamp: ${checkpointInfo.timestamp}
  • All progress saved!
` : `
${tasksSinceCheckpoint >= 15 ? '⚠️  Checkpoint recommended soon (20 tasks trigger auto-checkpoint)' : '✅ Continue working'}
`}`,
        },
      ],
    };
  }

  /**
   * Check NotebookLM knowledge base for project context
   */
  private async checkKnowledgeBase(args: any) {
    const { project_name, project_description, keywords = [] } = args;

    console.log(`\n📚 Checking knowledge base for "${project_name}"`);

    // Check if NotebookLM is enabled
    if (!notebookLMClient.isAvailable()) {
      return {
        content: [
          {
            type: "text",
            text: `📚 NotebookLM Integration Status

⚠️  NotebookLM is not enabled or connected.

To enable NotebookLM:
1. Set NOTEBOOKLM_ENABLED=true in your environment
2. Ensure notebooklm-mcp server is running

🔄 Fallback Mode Active:
DevForge will use ${aiProvider} (${aiModel || AdapterFactory.getDefaultModel(aiProvider)}) for context generation.

Would you like to proceed with AI-generated specs instead?`,
          },
        ],
      };
    }

    // Query NotebookLM for project context
    const result = await notebookLMClient.checkForProjectContext(
      project_name,
      project_description
    );

    if (result.found && result.notebook) {
      return {
        content: [
          {
            type: "text",
            text: `✅ Knowledge Base Found!

📓 Notebook: ${result.notebook.name}
📚 Sources: ${result.notebook.sources.length} documents

📝 Context Summary:
${result.answer || 'Context loaded successfully'}

📌 Citations:
${result.citations?.map(c => `  • ${c}`).join('\n') || 'Full citations available in specs'}

🎯 NEXT STEP:
Call "start_project" to use this grounded context for spec generation.
Your specs will include citation-backed requirements!`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `📚 No NotebookLM Context Found

Searched for: "${project_name}"
Keywords: ${keywords.length > 0 ? keywords.join(', ') : 'none'}

💡 Suggestions:
${result.suggestedSources?.map(s => `  • ${s}`).join('\n') || '  • Create a NotebookLM notebook with relevant docs'}

🔄 Available Options:
1. Create a NotebookLM notebook with project docs and try again
2. Proceed with AI-generated specs (call "start_project")

Do you want to proceed without NotebookLM context?`,
        },
      ],
    };
  }

  /**
   * Generate A2UI blueprint for cross-platform UI
   */
  private async generateUIBlueprint(args: any) {
    const { project_name, platform, screens } = args;

    console.log(`\n🎨 Generating A2UI Blueprint for "${project_name}" (${platform})`);

    // Convert screens to UIScreen format
    const uiScreens: UIScreen[] = screens.map((s: any) => ({
      name: s.name,
      route: s.route || `/${s.name.toLowerCase().replace(/\s+/g, '-')}`,
      description: s.description || s.name,
      components: s.components || ['Container', 'Text', 'Button'],
      dataRequirements: s.dataRequirements || [],
    }));

    // Generate blueprint
    const blueprint = a2uiGenerator.generateBlueprint(
      project_name,
      platform as A2UIPlatform,
      uiScreens
    );

    // Generate code for the platform
    let generatedCode = '';
    if (platform === 'react' || platform === 'react-native' || platform === 'web') {
      generatedCode = a2uiGenerator.toReactCode(blueprint);
    } else if (platform === 'flutter') {
      generatedCode = a2uiGenerator.toFlutterCode(blueprint);
    }

    // Save blueprint to project
    const projectPath = `C:\\Users\\serha\\OneDrive\\Desktop\\devforge-projects\\${project_name}`;
    const blueprintPath = `${projectPath}\\a2ui\\blueprint.json`;
    const jsonlPath = `${projectPath}\\a2ui\\messages.jsonl`;

    return {
      content: [
        {
          type: "text",
          text: `✅ A2UI Blueprint Generated!

🎨 Project: ${project_name}
📱 Platform: ${platform}
📐 Screens: ${screens.length}

🧩 Components Used:
${blueprint.catalog.slice(0, 10).map(c => `  • ${c}`).join('\n')}
${blueprint.catalog.length > 10 ? `  ... and ${blueprint.catalog.length - 10} more` : ''}

📄 Generated Files:
  • Blueprint JSON: ${blueprintPath}
  • JSONL Messages: ${jsonlPath}

🔧 Platform-Specific Code:
\`\`\`${platform === 'flutter' ? 'dart' : 'tsx'}
${generatedCode.substring(0, 500)}${generatedCode.length > 500 ? '\n// ... (truncated)' : ''}
\`\`\`

📊 Blueprint Summary:
${JSON.stringify({
            version: blueprint.version,
            platform: blueprint.platform,
            surfaceCount: blueprint.surfaces.length,
            totalComponents: blueprint.surfaces.reduce((sum, s) => sum + s.components.length, 0),
          }, null, 2)}

🎯 NEXT STEPS:
1. Review the generated blueprint
2. Use the JSONL messages for streaming UI render
3. Customize components as needed
4. Integrate with your ${platform} project

💡 Tip: A2UI blueprints are framework-agnostic.
   You can render the same blueprint on any supported platform!`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("DevForge MCP Server v3.0 running on stdio");
    console.error("Ready for complete project workflow! 🚀");
  }
}

// Start the server
const server = new DevForgeServer();
server.run().catch(console.error);
