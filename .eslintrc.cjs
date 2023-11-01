module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},

	rules: {
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-trailing-spaces': 'off', // Don't need ESLint's no-trailing-spaces rule, so turn it off.
		'svelte/no-trailing-spaces': ['error'],
		'svelte/shorthand-directive': ['error'],
		'svelte/shorthand-attribute': ['error'],
		'svelte/no-spaces-around-equal-signs-in-attribute': ['error'],
		'svelte/indent': [
			'error',
			{
				indent: 'tab'
			}
		],
		'svelte/html-self-closing': [
			'error',
			{
				void: 'ignore', // or "never" or "ignore"
				normal: 'ignore', // or "never" or "ignore"
				component: 'always', // or "never" or "ignore"
				svelte: 'always' // or "never" or "igore"
			}
		],
		'svelte/html-closing-bracket-spacing': ['error'],
		'svelte/first-attribute-linebreak': [
			'error',
			{
				multiline: 'below', // or "beside"
				singleline: 'beside' // "below"
			}
		],
		'svelte/max-attributes-per-line': [
			'error',
			{
				multiline: 1,
				singleline: 1
			}
		],
		'svelte/sort-attributes': [
			'error',
			{
				order: [
					'this',
					'bind:this',
					'id',
					'name',
					'slot',
					{ match: '/^--/u', sort: 'alphabetical' },
					['style', '/^style:/u'],
					'class',
					{ match: '/^class:/u', sort: 'alphabetical' },
					{
						match: ['!/:/u', '!/^(?:this|id|name|style|class)$/u', '!/^--/u'],
						sort: 'alphabetical'
					},
					['/^bind:/u', '!bind:this', '/^on:/u'],
					{ match: '/^use:/u', sort: 'alphabetical' },
					{ match: '/^transition:/u', sort: 'alphabetical' },
					{ match: '/^in:/u', sort: 'alphabetical' },
					{ match: '/^out:/u', sort: 'alphabetical' },
					{ match: '/^animate:/u', sort: 'alphabetical' },
					{ match: '/^let:/u', sort: 'alphabetical' }
				]
			}
		]
	}
};
