// alias preact's hyperscript reviver since it's referenced a lot:
var h = preact.h;


// To use Classful Components in ES3/5, use your favorite inheritance technique.
// If you don't intend to use the Component class, you can skip this.
// Here's an example:
function createClass(obj) {
	// sub-class Component:
	function F(){ preact.Component.call(this); }
	var p = F.prototype = Object.create(preact.Component.prototype);
	// copy our skeleton into the prototype:
	for (var i in obj) {
            if (i === 'getDefaultProps' && typeof obj.getDefaultProps === 'function') {
                F.defaultProps = obj.getDefaultProps() || {};
            } else {
                p[i] = obj[i];
            }
        }
	// restore constructor:
	return p.constructor = F;
}



/** Example classful component */
var App = createClass({
	componentDidMount: function() {
		this.setState({ message:'Hello!' });
	},
	render: function(props, state) {
		return (
			h('div', {id:'app'},
				h(Header, { message: state.message }),
				h(Main)
			)
		);
	}
});


/** Components can just be pure functions */
var Header = function(props) {
	return h('header', null,
		h('h1', null, 'App'),
		props.message ? h('h2',null,props.message) : null
	);
}


/** Instead of JSX, use: h(type, props, ...children) */
var Main = createClass({
	render: function() {
		var items = [1,2,3,4,5].map( function(item) {
			return h('li', {id:item}, 'Item '+item);
		});
		return (
			h('main', null,
				h('ul', null, items)
			)
		);
	}
});


preact.render(h(App), document.body);
