#!/bin/bash

./update-and-compile-translations.sh

cd set-columns@maestroschan.fr

glib-compile-schemas ./schemas

zip ../set-columns@maestroschan.fr.zip *.js
zip ../set-columns@maestroschan.fr.zip metadata.json

zip -r ../set-columns@maestroschan.fr.zip locale
zip -r ../set-columns@maestroschan.fr.zip schemas


