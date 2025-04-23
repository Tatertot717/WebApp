FROM node:slim

# Install necessary dependencies for MongoDB (including curl and gnupg)
RUN apt-get update && \
    apt-get install -y gnupg curl lsb-release && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor && \
    echo "deb [signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://repo.mongodb.org/apt/debian $(lsb_release -sc)/mongodb-org/8.0 main" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /home/

# Expose the port for application (not MongoDB, which remains internal)
EXPOSE 3000

# Start MongoDB in the background and then Node.js app
CMD ["bash", "-c", "[ -d /home/db ] || mkdir /home/db && mongod --bind_ip 127.0.0.1 --dbpath /home/db --fork --logpath /var/log/mongodb.log && cd webapp && npm install && npm run build && npm run start"]
