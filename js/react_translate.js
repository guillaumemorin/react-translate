var React = require('react');
var urlencode = require('urlencode');

var List = React.createClass({

	_url: 'http://api.mymemory.translated.net/get?',
	_lang: ['en', 'fr', 'it'],

	getInitialState: function() {
		return {
			en_value: null,
			fr_value: null,
			it_value: null
		};
	},

	render: function() {
		return (
			<div>
				<label>En</label>
				<input type="text" id="en" ref="en" onfocus="this.value = this.value;" value={this.state.en_value} onChange={this._handleChange} />
				<input type="button" id="en" onClick={this._validate} value="submit" /><br />
				<label>Fr</label>
				<input type="text" id="fr" ref="fr" onfocus="this.value = this.value;" value={this.state.fr_value} onChange={this._handleChange} />
				<input type="button" id="fr" onClick={this._validate} value="submit"/><br />
				<label>It</label>
				<input type="text" id="it" ref="it" onfocus="this.value = this.value;" value={this.state.it_value} onChange={this._handleChange} />
				<input type="button" id="it" onClick={this._validate} value="submit"/><br />
			</div>
		)
	},

	_validate: function(event) {

		var initial_lang = event.target.id;
		var val = this.refs[initial_lang].getDOMNode().value.trim();

		var translation_lang = this._lang.splice(0);
		var index = translation_lang.indexOf(initial_lang);
		translation_lang.splice(index, 1);

		for (var i = 0; i < translation_lang.length; i++) {
			this._translate(val, initial_lang, translation_lang[i]);
		}
	},

	_translate: function(value, initial_lang, translated_lang) {
		var query = 'q=' + urlencode(value);
		var url = this._url + query + '&langpair=' + initial_lang + '|' + translated_lang;
		$.get(url, function(result) {
			var val = {}
			val[translated_lang + '_value'] = result.matches[0].translation;
			this.setState(val);
		}.bind(this));
	},

	_handleChange: function(event) {
		var val = {}
		val[event.target.id + '_value'] = event.target.value;
		this.setState(val);
	}
});

React.render(
	<List />,
	document.getElementById('hello')
);