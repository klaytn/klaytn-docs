#!/bin/bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && cd ../ && pwd )"
DOCKER_HOME=/home/circleci/

# This cmd is for test. If something is wrong, you can enter into the docker container using the following command.
#docker run -it --rm -v $ROOT_DIR:/home/circleci/klaytn-docs kjhman21/liche /bin/bash

docker run --rm -v $ROOT_DIR:$DOCKER_HOME/klaytn-docs kjhman21/liche /liche -c 1 -t 10 -x "http[s]?://localhost" -r $DOCKER_HOME/klaytn-docs/ --document-root $DOCKER_HOME/klaytn-docs/docs
