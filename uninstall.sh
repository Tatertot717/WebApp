docker compose down
docker builder prune --filter "label=com.docker.compose.project=WebApp" --force
docker image prune --filter "label=com.docker.compose.project=WebApp" --force
docker rmi webappimage
rm -r ./db
