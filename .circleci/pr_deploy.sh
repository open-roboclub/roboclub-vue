#!/usr/bin/env bash

export ORG="open-roboclub"

if [ -z "$CIRCLE_PULL_REQUEST" -o "$CIRCLE_PROJECT_USERNAME" != $ORG ]; then
    echo "Not a PR. Skipping surge deployment"
    exit 0
fi

export SURGE_LOGIN=open-roboclub@gmail.com
export PATH="$(yarn global bin):$PATH"

if [ -z "${CIRCLE_PR_NUMBER}" ]; then
    export ISSUE_NUMBER=$(echo ${CIRCLE_PULL_REQUEST} | awk -F '/' ' { print $(NF) } ')
    export CONTEXT=${CIRCLE_BRANCH}
    export REPONAME=${CIRCLE_PROJECT_REPONAME}
else
    export ISSUE_NUMBER=${CIRCLE_PR_NUMBER}
    export CONTEXT=${CIRCLE_PR_USERNAME}
    export REPONAME=${CIRCLE_PR_REPONAME}
fi

export DEPLOY_DOMAIN=https://pr-${ISSUE_NUMBER}-${CONTEXT##*/}-${REPONAME}.surge.sh

cp ./dist/index.html ./dist/200.html
surge --project ./dist --domain $DEPLOY_DOMAIN

curl --request POST "https://api.github.com/repos/${ORG}/${REPONAME}/issues/${ISSUE_NUMBER}/comments?access_token=${GH_TOKEN}" --data '{"body":"PR Successfully Deployed : '"${DEPLOY_DOMAIN}"'"}'