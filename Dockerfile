FROM ubuntu:24.10

RUN apt-get update && \
    apt-get install -y npm

WORKDIR /home/

CMD [ "/bin/bash" ]
