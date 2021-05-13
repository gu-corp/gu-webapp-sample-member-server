node ./node_modules/eslint/bin/eslint.js "{src,apps,libs,test}/**/*.ts"
node ./node_modules/jest/bin/jest.js --coverage
node ./node_modules/jest/bin/jest.js --config ./test/jest-e2e.json
