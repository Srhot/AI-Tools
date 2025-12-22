/**
 * Master Orchestrator - Complete DevForge Workflow Manager
 *
 * This is the BRAIN of DevForge. It orchestrates the entire workflow:
 *
 * PHASE 1: DISCOVERY & PLANNING
 * 1. Gather user requirements
 * 2. Generate decision matrix (architecture options)
 * 3. User approves architecture
 * 4. Generate complete Spec-Kit (Constitution, Spec, Plan, Tasks)
 * 5. Generate POML files
 *
 * PHASE 2: BACKEND DEVELOPMENT
 * 6. Generate API code
 * 7. Generate Postman collections + environments
 * 8. User tests APIs (manual or Newman)
 * 9. Iterate based on test feedback
 * 10. Checkpoint every 20-25 tasks to preserve context
 *
 * PHASE 3: FRONTEND DEVELOPMENT
 * 11. Ask user frontend preferences
 * 12. Generate frontend prompt (Google Stitch/Lovable/etc.)
 * 13. User creates frontend
 * 14. Integrate frontend with backend
 *
 * PHASE 4: TESTING & QA
 * 15. Generate BDD/Cucumber tests
 * 16. Run tests
 * 17. Fix issues
 * 18. Final checkpoint
 *
 * CONTEXT PRESERVATION:
 * - Checkpoint every 20-25 tasks
 * - Save state to POML files
 * - Generate continuation prompts
 * - Never lose progress!
 */

import { AIAdapter } from '../adapters/ai-adapter.interface.js';
import { DecisionMatrixModule } from './decision-matrix.js';
import { SpecKitModule, SpecKit } from './spec-kit.js';
import { POMLOrchestrator, POMLState } from './poml-orchestrator.js';
import { PostmanGenerator } from './postman-generator.js';
import { FrontendPromptGenerator } from './frontend-prompt-generator.js';
import { BDDGenerator } from './bdd-generator.js';
import { promises as fs } from 'fs';
import { join } from 'path';

export type WorkflowPhase =
  | 'requirements'
  | 'decision_matrix'
  | 'spec_kit'
  | 'backend_dev'
  | 'api_testing'
  | 'frontend_prompt'
  | 'frontend_integration'
  | 'bdd_testing'
  | 'complete';

export interface WorkflowState {
  projectName: string;
  currentPhase: WorkflowPhase;
  completedPhases: WorkflowPhase[];
  requirements: string[];
  decisionMatrix?: any;
  specKit?: SpecKit;
  pomlState?: POMLState;
  postmanGenerated: boolean;
  frontendPromptGenerated: boolean;
  bddTestsGenerated: boolean;
  tasksCompleted: number;
  lastCheckpointTask: number;
  issues: string[];
}

export class MasterOrchestrator {
  private aiAdapter: AIAdapter;
  private decisionMatrix: DecisionMatrixModule;
  private specKitModule: SpecKitModule;
  private pomlOrchestrator: POMLOrchestrator;
  private postmanGenerator: PostmanGenerator;
  private frontendPromptGenerator: FrontendPromptGenerator;
  private bddGenerator: BDDGenerator;

  constructor(aiAdapter: AIAdapter) {
    this.aiAdapter = aiAdapter;
    this.decisionMatrix = new DecisionMatrixModule(aiAdapter);
    this.specKitModule = new SpecKitModule(aiAdapter);
    this.pomlOrchestrator = new POMLOrchestrator(aiAdapter, 15); // 15 min intervals
    this.postmanGenerator = new PostmanGenerator(aiAdapter);
    this.frontendPromptGenerator = new FrontendPromptGenerator(aiAdapter);
    this.bddGenerator = new BDDGenerator(aiAdapter);
  }

  /**
   * PHASE 1: Start project - gather requirements and generate decision matrix
   */
  async startProject(
    projectName: string,
    projectType: string,
    description: string,
    requirements: string[]
  ): Promise<{
    decisionMatrix: any;
    message: string;
  }> {
    console.log(`\n🚀 Starting project: ${projectName}`);
    console.log(`📋 Phase: Requirements & Decision Matrix\n`);

    // Generate decision matrix
    const matrix = await this.decisionMatrix.createMatrix(projectType, description);

    return {
      decisionMatrix: matrix,
      message: `Decision matrix generated with ${matrix.questions.length} questions. Please review and answer them to proceed.`,
    };
  }

  /**
   * PHASE 2: User approved architecture - generate Spec-Kit
   */
  async generateSpecKit(
    projectName: string,
    projectType: string,
    description: string,
    decisionMatrix: any,
    projectPath: string
  ): Promise<{
    specKit: SpecKit;
    pomlState: POMLState;
    files: string[];
    message: string;
  }> {
    console.log(`\n📚 Generating Spec-Kit...`);

    // Generate complete Spec-Kit
    const specKit = await this.specKitModule.generateSpecKit(
      projectName,
      projectType,
      description,
      decisionMatrix
    );

    // Initialize POML state
    const pomlState = this.pomlOrchestrator.initializePOML(specKit);

    // Create project structure
    await fs.mkdir(projectPath, { recursive: true });
    await fs.mkdir(join(projectPath, '.devforge'), { recursive: true });
    await fs.mkdir(join(projectPath, 'docs'), { recursive: true });

    // Save Spec-Kit files
    const files: string[] = [];

    // Constitution
    const constitutionPath = join(projectPath, 'docs', 'CONSTITUTION.md');
    await fs.writeFile(
      constitutionPath,
      this.generateConstitutionMarkdown(specKit.constitution),
      'utf-8'
    );
    files.push(constitutionPath);

    // Specification
    const specPath = join(projectPath, 'docs', 'SPECIFICATION.md');
    await fs.writeFile(
      specPath,
      this.generateSpecificationMarkdown(specKit.specification),
      'utf-8'
    );
    files.push(specPath);

    // Technical Plan
    const planPath = join(projectPath, 'docs', 'TECHNICAL_PLAN.md');
    await fs.writeFile(
      planPath,
      this.generateTechnicalPlanMarkdown(specKit.technicalPlan),
      'utf-8'
    );
    files.push(planPath);

    // Tasks
    const tasksPath = join(projectPath, 'docs', 'TASKS.md');
    await fs.writeFile(
      tasksPath,
      this.generateTasksMarkdown(specKit.tasks),
      'utf-8'
    );
    files.push(tasksPath);

    // POML
    const pomlPath = join(projectPath, 'PROJECT.poml');
    await fs.writeFile(pomlPath, this.pomlOrchestrator.exportPOML(pomlState), 'utf-8');
    files.push(pomlPath);

    // Save state
    const statePath = join(projectPath, '.devforge', 'state.json');
    await fs.writeFile(statePath, JSON.stringify(pomlState, null, 2), 'utf-8');

    console.log(`✅ Spec-Kit generated: ${files.length} files created\n`);

    return {
      specKit,
      pomlState,
      files,
      message: `Spec-Kit generated successfully! ${specKit.tasks.length} tasks planned.`,
    };
  }

  /**
   * PHASE 3: Generate Postman collections for API testing
   */
  async generateAPITests(
    specKit: SpecKit,
    projectPath: string
  ): Promise<{
    collectionPath: string;
    environmentPaths: string[];
    testingGuide: string;
    newmanCommands: any;
  }> {
    console.log(`\n🧪 Generating API test collections...`);

    // Create postman directory
    const postmanDir = join(projectPath, 'postman');
    await fs.mkdir(postmanDir, { recursive: true });

    // Generate collection
    const collection = await this.postmanGenerator.generateCollection(
      specKit.constitution.projectName,
      specKit.specification,
      '{{base_url}}'
    );

    const collectionPath = join(postmanDir, 'collection.json');
    await fs.writeFile(
      collectionPath,
      this.postmanGenerator.exportCollection(collection),
      'utf-8'
    );

    // Generate environments
    const environments = this.postmanGenerator.generateEnvironments(
      specKit.constitution.projectName
    );

    const environmentPaths: string[] = [];
    for (const [env, data] of Object.entries(environments)) {
      const envPath = join(postmanDir, `${env}.environment.json`);
      await fs.writeFile(
        envPath,
        this.postmanGenerator.exportEnvironment(data),
        'utf-8'
      );
      environmentPaths.push(envPath);
    }

    // Generate testing guide
    const testingGuide = this.postmanGenerator.generateTestingGuide(
      specKit.constitution.projectName
    );
    const guidePath = join(projectPath, 'docs', 'API_TESTING_GUIDE.md');
    await fs.writeFile(guidePath, testingGuide, 'utf-8');

    // Newman commands
    const newmanCommands = this.postmanGenerator.generateNewmanCommands(
      'postman/collection.json',
      'postman/dev.environment.json'
    );

    console.log(`✅ API tests generated\n`);

    return {
      collectionPath,
      environmentPaths,
      testingGuide,
      newmanCommands,
    };
  }

  /**
   * PHASE 4: Generate frontend prompt
   */
  async generateFrontendPrompt(
    specKit: SpecKit,
    userAnswers: Record<string, string>,
    projectPath: string
  ): Promise<{
    promptPath: string;
    prompt: any;
  }> {
    console.log(`\n🎨 Generating frontend prompt...`);

    const config = {
      platform: userAnswers.platform as any,
      designStyle: userAnswers.designStyle as any,
      colorScheme: userAnswers.colorScheme as any,
      uiFramework: userAnswers.uiFramework as any,
    };

    const apiEndpoints = specKit.specification.apiDesign?.endpoints || [];

    const prompt = await this.frontendPromptGenerator.generatePrompt(
      specKit.specification,
      config,
      apiEndpoints,
      userAnswers
    );

    const promptPath = join(projectPath, 'docs', 'FRONTEND_PROMPT.md');
    await fs.writeFile(
      promptPath,
      this.frontendPromptGenerator.exportPrompt(prompt),
      'utf-8'
    );

    console.log(`✅ Frontend prompt generated\n`);

    return {
      promptPath,
      prompt,
    };
  }

  /**
   * PHASE 5: Generate BDD tests
   */
  async generateBDDTests(
    specKit: SpecKit,
    projectPath: string
  ): Promise<{
    featurePaths: string[];
    stepDefinitionsPath: string;
    configPaths: string[];
  }> {
    console.log(`\n🥒 Generating BDD/Cucumber tests...`);

    const testSuite = await this.bddGenerator.generateTestSuite(
      specKit.specification,
      specKit.technicalPlan.architecture.pattern
    );

    const testFiles = await this.bddGenerator.generateTestFiles(testSuite);

    // Create directories
    await fs.mkdir(join(projectPath, 'tests', 'features'), { recursive: true });
    await fs.mkdir(join(projectPath, 'tests', 'step-definitions'), { recursive: true });

    const featurePaths: string[] = [];
    const configPaths: string[] = [];

    // Write features
    for (const feature of testFiles.features) {
      const fullPath = join(projectPath, feature.path);
      await fs.writeFile(fullPath, feature.content, 'utf-8');
      featurePaths.push(fullPath);
    }

    // Write step definitions
    const stepDefPath = join(projectPath, testFiles.stepDefinitions[0].path);
    await fs.writeFile(
      stepDefPath,
      testFiles.stepDefinitions[0].content,
      'utf-8'
    );

    // Write configs
    for (const config of testFiles.config) {
      const fullPath = join(projectPath, config.path);
      await fs.writeFile(fullPath, config.content, 'utf-8');
      configPaths.push(fullPath);
    }

    console.log(`✅ BDD tests generated\n`);

    return {
      featurePaths,
      stepDefinitionsPath: stepDefPath,
      configPaths,
    };
  }

  /**
   * Context preservation - create checkpoint
   */
  async createCheckpoint(
    pomlState: POMLState,
    completedTaskIds: string[],
    currentTaskId: string | null,
    issues: string[],
    projectPath: string
  ): Promise<{
    checkpoint: any;
    continuationPrompt: string;
  }> {
    console.log(`\n💾 Creating checkpoint...`);

    const checkpoint = await this.pomlOrchestrator.createCheckpoint(
      pomlState,
      completedTaskIds,
      currentTaskId,
      issues
    );

    // Save updated POML
    const pomlPath = join(projectPath, 'PROJECT.poml');
    await fs.writeFile(pomlPath, this.pomlOrchestrator.exportPOML(pomlState), 'utf-8');

    // Save state
    const statePath = join(projectPath, '.devforge', 'state.json');
    await fs.writeFile(statePath, JSON.stringify(pomlState, null, 2), 'utf-8');

    // Generate continuation prompt
    const continuationPrompt = await this.pomlOrchestrator.generateContinuationPrompt(pomlState);
    const promptPath = join(projectPath, '.devforge', 'continuation-prompt.txt');
    await fs.writeFile(promptPath, continuationPrompt, 'utf-8');

    console.log(`✅ Checkpoint created: ${checkpoint.id}\n`);

    return {
      checkpoint,
      continuationPrompt,
    };
  }

  /**
   * Helper: Generate Constitution markdown
   */
  private generateConstitutionMarkdown(constitution: SpecKit['constitution']): string {
    let md = `# Project Constitution\n\n`;
    md += `## Vision\n\n${constitution.vision}\n\n`;
    md += `## Principles\n\n`;
    constitution.principles.forEach((p, i) => {
      md += `${i + 1}. ${p}\n`;
    });
    md += `\n## Constraints\n\n`;
    constitution.constraints.forEach(c => md += `- ${c}\n`);
    return md;
  }

  /**
   * Helper: Generate Specification markdown
   */
  private generateSpecificationMarkdown(spec: SpecKit['specification']): string {
    let md = `# Specification\n\n`;
    md += `## Functional Requirements\n\n`;
    spec.functionalRequirements.forEach(req => {
      md += `### ${req.id}: ${req.title}\n\n`;
      md += `**Priority:** ${req.priority}\n\n`;
      md += `${req.description}\n\n`;
      md += `**Acceptance Criteria:**\n`;
      req.acceptanceCriteria.forEach(ac => md += `- ${ac}\n`);
      md += `\n`;
    });
    return md;
  }

  /**
   * Helper: Generate Technical Plan markdown
   */
  private generateTechnicalPlanMarkdown(plan: SpecKit['technicalPlan']): string {
    let md = `# Technical Plan\n\n`;
    md += `## Architecture\n\n`;
    md += `**Pattern:** ${plan.architecture.pattern}\n\n`;
    md += `**Layers:** ${plan.architecture.layers.join(', ')}\n\n`;
    return md;
  }

  /**
   * Helper: Generate Tasks markdown
   */
  private generateTasksMarkdown(tasks: SpecKit['tasks']): string {
    let md = `# Task Breakdown\n\n`;
    md += `Total tasks: ${tasks.length}\n\n`;
    tasks.forEach((task, i) => {
      md += `## ${task.id}: ${task.title}\n\n`;
      md += `- **Type:** ${task.type}\n`;
      md += `- **Priority:** ${task.priority}\n`;
      md += `- **Estimated:** ${task.estimatedHours}h\n\n`;
    });
    return md;
  }
}
