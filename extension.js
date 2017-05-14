const Lang = imports.lang;
const Main = imports.ui.main;
const AppDisplay = imports.ui.appDisplay;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

//------------------------------------------------

function init() {
    //Convenience.initTranslations();
}

function enable() {
	let _settings = Convenience.getSettings('org.gnome.shell.extensions.appdisplay-personalization');
	let test = Main.overview.viewSelector.appDisplay._views;
	for (let i = 0; i < test.length; i++) {
		test[i].view._grid._colLimit = _settings.get_int('columns-max');
	}
}

function disable() {
	let test = Main.overview.viewSelector.appDisplay._views;
	for (let i = 0; i < test.length; i++) {
		test[i].view._grid._colLimit = 6;
	}
}

