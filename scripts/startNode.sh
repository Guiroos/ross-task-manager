printf "\n>Starting node\n"

cd ./back-end
npx tsc
npm prune --production
node dist/src/api/index.js

printf "\n>Done\n"
