/**
 * A2UI Widget Catalog
 * 
 * Defines the available widgets for A2UI generation.
 * Framework-agnostic widget definitions that can be rendered
 * by React, Flutter, React Native, Angular, or Web Components.
 */

export interface A2UIWidget {
    name: string;
    category: 'layout' | 'input' | 'display' | 'navigation' | 'feedback';
    description: string;
    defaultProps?: Record<string, any>;
    defaultStyle?: Record<string, string | number>;
    children?: boolean;
    platforms: ('react' | 'flutter' | 'react-native' | 'web' | 'angular' | 'console')[];
}

export interface A2UICatalog {
    version: string;
    widgets: Record<string, A2UIWidget>;
}

/**
 * Default widget catalog supporting all major UI patterns
 */
export const DEFAULT_CATALOG: A2UICatalog = {
    version: '1.0.0',
    widgets: {
        // Layout Widgets
        Container: {
            name: 'Container',
            category: 'layout',
            description: 'A container widget that holds other widgets',
            children: true,
            defaultStyle: { padding: 8 },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Row: {
            name: 'Row',
            category: 'layout',
            description: 'Horizontal layout container',
            children: true,
            defaultStyle: { display: 'flex', flexDirection: 'row' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Column: {
            name: 'Column',
            category: 'layout',
            description: 'Vertical layout container',
            children: true,
            defaultStyle: { display: 'flex', flexDirection: 'column' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Grid: {
            name: 'Grid',
            category: 'layout',
            description: 'Grid layout container',
            children: true,
            defaultProps: { columns: 2 },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Stack: {
            name: 'Stack',
            category: 'layout',
            description: 'Overlay/stack layout',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Scroll: {
            name: 'Scroll',
            category: 'layout',
            description: 'Scrollable container',
            children: true,
            defaultProps: { direction: 'vertical' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },

        // Display Widgets
        Text: {
            name: 'Text',
            category: 'display',
            description: 'Display text content',
            defaultProps: { variant: 'body' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Image: {
            name: 'Image',
            category: 'display',
            description: 'Display images',
            defaultProps: { fit: 'contain' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Icon: {
            name: 'Icon',
            category: 'display',
            description: 'Display icons',
            defaultProps: { size: 24 },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Avatar: {
            name: 'Avatar',
            category: 'display',
            description: 'User avatar display',
            defaultProps: { size: 'medium' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Card: {
            name: 'Card',
            category: 'display',
            description: 'Card container with elevation',
            children: true,
            defaultStyle: { borderRadius: 8, elevation: 2 },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Divider: {
            name: 'Divider',
            category: 'display',
            description: 'Visual separator',
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Badge: {
            name: 'Badge',
            category: 'display',
            description: 'Notification badge',
            defaultProps: { variant: 'default' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Chip: {
            name: 'Chip',
            category: 'display',
            description: 'Compact element for tags/filters',
            defaultProps: { deletable: false },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },

        // Input Widgets
        Button: {
            name: 'Button',
            category: 'input',
            description: 'Clickable button',
            defaultProps: { variant: 'contained' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        TextField: {
            name: 'TextField',
            category: 'input',
            description: 'Text input field',
            defaultProps: { variant: 'outlined' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        TextArea: {
            name: 'TextArea',
            category: 'input',
            description: 'Multi-line text input',
            defaultProps: { rows: 4 },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Checkbox: {
            name: 'Checkbox',
            category: 'input',
            description: 'Checkbox input',
            defaultProps: { checked: false },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Radio: {
            name: 'Radio',
            category: 'input',
            description: 'Radio button input',
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Switch: {
            name: 'Switch',
            category: 'input',
            description: 'Toggle switch',
            defaultProps: { value: false },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Slider: {
            name: 'Slider',
            category: 'input',
            description: 'Range slider',
            defaultProps: { min: 0, max: 100 },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Select: {
            name: 'Select',
            category: 'input',
            description: 'Dropdown select',
            defaultProps: { multiple: false },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        DatePicker: {
            name: 'DatePicker',
            category: 'input',
            description: 'Date picker input',
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        TimePicker: {
            name: 'TimePicker',
            category: 'input',
            description: 'Time picker input',
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        FileUpload: {
            name: 'FileUpload',
            category: 'input',
            description: 'File upload widget',
            defaultProps: { multiple: false },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },

        // Navigation Widgets
        AppBar: {
            name: 'AppBar',
            category: 'navigation',
            description: 'Top app bar/header',
            children: true,
            defaultStyle: { height: 56 },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        BottomNav: {
            name: 'BottomNav',
            category: 'navigation',
            description: 'Bottom navigation bar',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Drawer: {
            name: 'Drawer',
            category: 'navigation',
            description: 'Side drawer/menu',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Tabs: {
            name: 'Tabs',
            category: 'navigation',
            description: 'Tab navigation',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        TabItem: {
            name: 'TabItem',
            category: 'navigation',
            description: 'Single tab item',
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Breadcrumb: {
            name: 'Breadcrumb',
            category: 'navigation',
            description: 'Breadcrumb navigation',
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Link: {
            name: 'Link',
            category: 'navigation',
            description: 'Navigation link',
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Fab: {
            name: 'Fab',
            category: 'navigation',
            description: 'Floating action button',
            defaultProps: { position: 'bottom-right' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },

        // Feedback Widgets
        Alert: {
            name: 'Alert',
            category: 'feedback',
            description: 'Alert/notification message',
            defaultProps: { severity: 'info' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Snackbar: {
            name: 'Snackbar',
            category: 'feedback',
            description: 'Temporary notification',
            defaultProps: { duration: 3000 },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Dialog: {
            name: 'Dialog',
            category: 'feedback',
            description: 'Modal dialog',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Progress: {
            name: 'Progress',
            category: 'feedback',
            description: 'Progress indicator',
            defaultProps: { variant: 'circular' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Skeleton: {
            name: 'Skeleton',
            category: 'feedback',
            description: 'Loading skeleton',
            defaultProps: { variant: 'text' },
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        Tooltip: {
            name: 'Tooltip',
            category: 'feedback',
            description: 'Hover tooltip',
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },

        // List Widgets
        List: {
            name: 'List',
            category: 'display',
            description: 'Vertical list of items',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        ListItem: {
            name: 'ListItem',
            category: 'display',
            description: 'Single list item',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },
        Table: {
            name: 'Table',
            category: 'display',
            description: 'Data table',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular', 'console']
        },

        // Form Widgets
        Form: {
            name: 'Form',
            category: 'input',
            description: 'Form container with validation',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        },
        FormField: {
            name: 'FormField',
            category: 'input',
            description: 'Form field with label and validation',
            children: true,
            platforms: ['react', 'flutter', 'react-native', 'web', 'angular']
        }
    }
};

/**
 * Get default catalog
 */
export function getDefaultCatalog(): A2UICatalog {
    return DEFAULT_CATALOG;
}

/**
 * Get widgets by category
 */
export function getWidgetsByCategory(
    catalog: A2UICatalog,
    category: A2UIWidget['category']
): A2UIWidget[] {
    return Object.values(catalog.widgets).filter(w => w.category === category);
}

/**
 * Get widgets by platform
 */
export function getWidgetsByPlatform(
    catalog: A2UICatalog,
    platform: A2UIWidget['platforms'][number]
): A2UIWidget[] {
    return Object.values(catalog.widgets).filter(w => w.platforms.includes(platform));
}

/**
 * Check if widget supports platform
 */
export function isWidgetSupported(
    catalog: A2UICatalog,
    widgetName: string,
    platform: A2UIWidget['platforms'][number]
): boolean {
    const widget = catalog.widgets[widgetName];
    return widget ? widget.platforms.includes(platform) : false;
}
