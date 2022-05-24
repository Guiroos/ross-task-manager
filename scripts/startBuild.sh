printf "\n>Building\n"

cd ./front-end
npm run build
mv build ../back-end 
npm prune --production

printf "\n>Done\n"
