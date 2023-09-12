'use strict';

module.exports = {
    types: [
        {
            value: 'feat',
            name: '✨  feat:     Introduce a new feature',
        },
        {
            value: 'fix',
            name: '🐛  fix:      Fix a bug',
        },
        {
            value: 'refactor',
            name: '♻️  refactor: Improve code structure (neither a new feature nor a bug fix)',
        },
        {
            value: 'chore',
            name: '🎫  chore:    Update build or process configuration',
        },
        {
            value: 'docs',
            name: '📝  docs:     Update documentation',
        },
        {
            value: 'test',
            name: '✅  test:     Enhance test cases',
        },
        {
            value: 'style',
            name: '💄  style:    Adjust styles and formatting',
        },
        {
            value: 'perf',
            name: '⚡️  perf:     Optimize performance',
        },
        {
            value: 'revert',
            name: '⏪  revert:   Revert a previous commit',
        },
    ],
    scopes: [],
    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    subjectLimit: 50,
    messages: {
        type: 'Please choose the type of change for your commit:',
        customScope: '\nSpecify the scope of this change (optional):',
        subject: 'Briefly describe your changes:\n',
        body: 'Provide a detailed description of your changes (optional). Use "|" for line breaks:\n',
        breaking: 'List any BREAKING CHANGES (optional):\n',
        footer: 'List any issues closed by this change (optional). For example: #31, #34:\n',
        confirmCommit: 'Are you sure you want to commit these changes?',
    },
};
