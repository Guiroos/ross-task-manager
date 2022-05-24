printf "\n>Building\n"

cd ./front-end
npm run build
npm prune --production

printf "\n>Done\n"
