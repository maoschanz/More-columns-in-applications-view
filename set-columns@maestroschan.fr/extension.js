
const Clutter = imports.gi.Clutter;
const Gio = imports.gi.Gio;
const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const AppDisplay = imports.ui.appDisplay;

const Overview = imports.ui.overview;

const Signals = imports.signals;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() {
	Convenience.initTranslations();
}

//------------------------------------------------------------------------------
/* do not edit this section */

function injectToFunction(parent, name, func) {
	let origin = parent[name];
	parent[name] = function() {
		let ret;
		ret = origin.apply(this, arguments);
			if (ret === undefined)
				ret = func.apply(this, arguments);
			return ret;
		}
	return origin;
}

function removeInjection(object, injection, name) {
	if (injection[name] === undefined)
		delete object[name];
	else
		object[name] = injection[name];
}

let injections=[];

//------------------------------------------------------------------------------

function reload() {
	Main.overview.viewSelector.appDisplay._views[1].view._redisplay();

	let folderIconsList = Main.overview.viewSelector.appDisplay._views[1].view.folderIcons;
	if (folderIconsList) {
		// Old GS versions only
		folderIconsList.forEach(function(i){
			i._redisplay();
		});
	}
}

//------------------------------------------------------------------------------

function setNbColumns(setting) {

	if (!injections['_init']) {
		injections['_init'] = injectToFunction(AppDisplay.BaseAppView.prototype, '_init', function(){
			this._grid._colLimit = setting;
		});
	}

	let appdisplayView = Main.overview.viewSelector.appDisplay._views;
	for (let i = 0; i < appdisplayView.length; i++) {
		appdisplayView[i].view._grid._colLimit = setting;
	}

	let folderIconsList = Main.overview.viewSelector.appDisplay._views[1].view.folderIcons;
	if (folderIconsList) {
		// Old GS versions only
		folderIconsList.forEach(function(i){
			i.view._grid._colLimit = setting;
		});
	}

}

//------------------------------------------------------------------------------

function enable() {
	let nbColumns = Convenience.getSettings().get_int('columns-max');
	setNbColumns(nbColumns);
	reload();
}

function disable() {
	setNbColumns( 6 );
	removeInjection(AppDisplay.BaseAppView.prototype, injections, '_init');
	reload();
}

//------------------------------------------------------------------------------

