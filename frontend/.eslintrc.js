module.exports = {
    "env": {
        "browser": true,
	"node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
	'plugin:prettier/recommended',
        "plugin:react/recommended"
    ],
	"ignorePatterns": ['node_modules/', 'reportWebVitals.js'],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react", "prettier"
    ],
    "rules": {
	  "prettier/prettier": "error",
    }
};
