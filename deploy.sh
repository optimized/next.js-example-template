#!/bin/bash

# Deploy the site using now and docker
if [ -n "$NOW_DOMAIN" ]
then

  echo "Deploying "$NOW_DOMAIN
  now --docker --token=$NOW_TOKEN -n $NOW_DOMAIN
  echo ""

else
  echo "You did not supply a domain as NOW_DOMAIN"
  exit

fi

CURRENTID=$(now --token=$NOW_TOKEN ls $NOW_DOMAIN | awk '/.*([A-Za-z0-9]{24}).*/ { print $1; }'| head -n 1 )

# Alias the site and remove old aliases
if [ -n "$CURRENTID" ]
then

  echo "Aliasing $CURRENTID to $NOW_DOMAIN"
  NEWALIAS=$(now alias --token=$NOW_TOKEN $CURRENTID $NOW_DOMAIN)

  if [ -n "$NEWALIAS" ]
  then

    echo "Alias succesful."
    echo "Testing for old aliases"
    OLDALIAS=$(now alias ls --token=$NOW_TOKEN | grep "https://$NOW_DOMAIN" | awk '/now\.sh/ { print $2}')

    if [ -n "$OLDALIAS" ]
    then

      echo "$NOW_DOMAIN used to be aliased to $OLDALIAS, we should remove that."
      echo "Removing old aliases..."
      now --token=$NOW_TOKEN ls $NOW_DOMAIN | grep -v "$CURRENTID" | awk '/.*([A-Za-z0-9]{24}).*/ { print $1; }' | xargs -I{} now --token=$NOW_TOKEN -y rm {}
      exit
    fi
  else
    echo "We can not find a current alias."
    exit
  fi
else
  echo "We cannot find a current ID. Maybe "
  exit
fi
