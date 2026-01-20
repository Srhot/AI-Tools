/**
 * A2UI Generator
 * 
 * Generates A2UI (Agent-to-UI) JSON blueprints for cross-platform
 * UI generation. Supports React, Flutter, React Native, Web Components, and Console.
 * 
 * Based on Google's A2UI protocol (v0.8 - December 2025)
 */

import { A2UIWidget, A2UICatalog, getDefaultCatalog } from './a2ui-catalog.js';

export type A2UIPlatform = 'react' | 'flutter' | 'react-native' | 'web' | 'angular' | 'console';

export interface A2UIComponent {
    id: string;
    component: {
        [type: string]: {
            value?: string;
            children?: string[];
            style?: Record<string, string | number>;
            props?: Record<string, any>;
            dataBinding?: string;
        };
    };
}

export interface A2UISurface {
    surfaceId: string;
    components: A2UIComponent[];
    dataModel?: Record<string, any>;
}

export interface A2UIMessage {
    type: 'beginRendering' | 'surfaceUpdate' | 'dataModelUpdate' | 'deleteSurface';
    surfaceId: string;
    components?: A2UIComponent[];
    dataModel?: Record<string, any>;
}

export interface A2UIBlueprint {
    version: string;
    platform: A2UIPlatform;
    surfaces: A2UISurface[];
    catalog: string[];
    metadata: {
        projectName: string;
        generatedAt: string;
        generator: string;
    };
}

export interface UIScreen {
    name: string;
    route: string;
    description: string;
    components: string[];
    dataRequirements?: string[];
}

/**
 * A2UI Generator
 * 
 * Generates declarative UI blueprints that can be rendered
 * by any supported framework renderer.
 */
export class A2UIGenerator {
    private catalog: A2UICatalog;
    private idCounter: number = 0;

    constructor(catalog?: A2UICatalog) {
        this.catalog = catalog || getDefaultCatalog();
    }

    /**
     * Generate unique component ID
     */
    private generateId(prefix: string = 'comp'): string {
        return `${prefix}_${++this.idCounter}`;
    }

    /**
     * Generate A2UI blueprint from project specs
     */
    generateBlueprint(
        projectName: string,
        platform: A2UIPlatform,
        screens: UIScreen[]
    ): A2UIBlueprint {
        const surfaces: A2UISurface[] = screens.map(screen =>
            this.generateSurface(screen)
        );

        return {
            version: '0.8',
            platform,
            surfaces,
            catalog: Object.keys(this.catalog.widgets),
            metadata: {
                projectName,
                generatedAt: new Date().toISOString(),
                generator: 'DevForge A2UI Generator v1.0'
            }
        };
    }

    /**
     * Generate a surface (screen) from screen definition
     */
    private generateSurface(screen: UIScreen): A2UISurface {
        const components: A2UIComponent[] = [];

        // Generate header
        const headerId = this.generateId('header');
        components.push({
            id: headerId,
            component: {
                AppBar: {
                    value: screen.name,
                    style: { backgroundColor: 'primary' }
                }
            }
        });

        // Generate main container
        const containerId = this.generateId('container');
        const childIds: string[] = [];

        // Generate components based on screen requirements
        for (const compName of screen.components) {
            const compId = this.generateId(compName.toLowerCase());
            childIds.push(compId);

            const widgetDef = this.catalog.widgets[compName] || this.catalog.widgets['Container'];
            components.push({
                id: compId,
                component: {
                    [widgetDef?.name || 'Container']: {
                        props: widgetDef?.defaultProps || {},
                        style: widgetDef?.defaultStyle || {}
                    }
                }
            });
        }

        // Add container with children
        components.push({
            id: containerId,
            component: {
                Column: {
                    children: [headerId, ...childIds],
                    style: { padding: 16 }
                }
            }
        });

        return {
            surfaceId: screen.route.replace(/\//g, '_'),
            components,
            dataModel: this.generateDataModel(screen.dataRequirements || [])
        };
    }

    /**
     * Generate data model for a screen
     */
    private generateDataModel(requirements: string[]): Record<string, any> {
        const model: Record<string, any> = {};

        for (const req of requirements) {
            // Parse requirement and create appropriate data structure
            if (req.includes('list')) {
                model[req] = [];
            } else if (req.includes('user')) {
                model[req] = { id: '', name: '', email: '' };
            } else {
                model[req] = null;
            }
        }

        return model;
    }

    /**
     * Generate A2UI messages for streaming
     */
    generateMessages(blueprint: A2UIBlueprint): A2UIMessage[] {
        const messages: A2UIMessage[] = [];

        for (const surface of blueprint.surfaces) {
            // Begin rendering
            messages.push({
                type: 'beginRendering',
                surfaceId: surface.surfaceId
            });

            // Surface update with components
            messages.push({
                type: 'surfaceUpdate',
                surfaceId: surface.surfaceId,
                components: surface.components
            });

            // Data model update if present
            if (surface.dataModel && Object.keys(surface.dataModel).length > 0) {
                messages.push({
                    type: 'dataModelUpdate',
                    surfaceId: surface.surfaceId,
                    dataModel: surface.dataModel
                });
            }
        }

        return messages;
    }

    /**
     * Export blueprint as JSONL (JSON Lines) format
     */
    toJSONL(blueprint: A2UIBlueprint): string {
        const messages = this.generateMessages(blueprint);
        return messages.map(msg => JSON.stringify(msg)).join('\n');
    }

    /**
     * Generate React component code from blueprint
     */
    toReactCode(blueprint: A2UIBlueprint): string {
        let code = `// Auto-generated by DevForge A2UI Generator\n`;
        code += `// Project: ${blueprint.metadata.projectName}\n`;
        code += `// Platform: React\n\n`;
        code += `import React from 'react';\n\n`;

        for (const surface of blueprint.surfaces) {
            const componentName = this.toPascalCase(surface.surfaceId);
            code += `export function ${componentName}() {\n`;
            code += `  return (\n`;
            code += this.generateReactJSX(surface.components, 4);
            code += `  );\n`;
            code += `}\n\n`;
        }

        return code;
    }

    /**
     * Generate Flutter widget code from blueprint
     */
    toFlutterCode(blueprint: A2UIBlueprint): string {
        let code = `// Auto-generated by DevForge A2UI Generator\n`;
        code += `// Project: ${blueprint.metadata.projectName}\n`;
        code += `// Platform: Flutter\n\n`;
        code += `import 'package:flutter/material.dart';\n\n`;

        for (const surface of blueprint.surfaces) {
            const className = this.toPascalCase(surface.surfaceId);
            code += `class ${className} extends StatelessWidget {\n`;
            code += `  @override\n`;
            code += `  Widget build(BuildContext context) {\n`;
            code += `    return ${this.generateFlutterWidget(surface.components)};\n`;
            code += `  }\n`;
            code += `}\n\n`;
        }

        return code;
    }

    /**
     * Helper: Generate React JSX from components
     */
    private generateReactJSX(components: A2UIComponent[], indent: number): string {
        const spaces = ' '.repeat(indent);
        let jsx = '';

        for (const comp of components) {
            const [type, props] = Object.entries(comp.component)[0];
            jsx += `${spaces}<div className="${type.toLowerCase()}">\n`;
            if (props.value) {
                jsx += `${spaces}  {/* ${props.value} */}\n`;
            }
            if (props.children) {
                jsx += `${spaces}  {/* Children: ${props.children.join(', ')} */}\n`;
            }
            jsx += `${spaces}</div>\n`;
        }

        return jsx;
    }

    /**
     * Helper: Generate Flutter widget tree
     */
    private generateFlutterWidget(components: A2UIComponent[]): string {
        if (components.length === 0) return 'Container()';

        const root = components[components.length - 1];
        const [type] = Object.entries(root.component)[0];

        return `${type}(\n      children: [\n        // Generated widgets\n      ],\n    )`;
    }

    /**
     * Helper: Convert string to PascalCase
     */
    private toPascalCase(str: string): string {
        return str
            .split(/[_-]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }
}

// Singleton instance
let a2uiGenerator: A2UIGenerator | null = null;

export function getA2UIGenerator(): A2UIGenerator {
    if (!a2uiGenerator) {
        a2uiGenerator = new A2UIGenerator();
    }
    return a2uiGenerator;
}
