printf "\n>Starting node\n"

cd ./back-end
npx tsc
node dist/src/api/index.js

printf "\n>Done\n"
