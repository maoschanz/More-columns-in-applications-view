#!/bin/bash

EXTENSION_UUID="set-columns@maestroschan.fr"

echo "Compiling gsettings schema…"
glib-compile-schemas ./$EXTENSION_UUID/schemas

if (( $EUID == 0 )); then
	INSTALL_DIR="/usr/share/gnome-shell/extensions"
else
	INSTALL_DIR="$HOME/.local/share/gnome-shell/extensions"
fi
mkdir -p $INSTALL_DIR

echo "Directory: $INSTALL_DIR/$EXTENSION_UUID"
echo "Installing extension files…"
cp -r $EXTENSION_UUID $INSTALL_DIR

echo "Done."
exit 0

