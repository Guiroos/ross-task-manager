printf "\n>Preparando diretórios\n"

printf "\n>Prunando devDependecies backend\n"
cd ./back-end
npm prune --production

printf "\n>Voltando a raiz do projeto\n"
cd ..

printf "\n>Prunando devDependecies frontend\n"
cd ./front-end
npm prune --production


