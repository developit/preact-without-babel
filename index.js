import { html, render, Component } from 'https://unpkg.com/htm/preact/standalone.module.js'

/** Example classful component */
class App extends Component {
	componentDidMount() {
		this.setState({ message:'Hello!' });
	}
	render(props, state) {
		return html`
			<div id="app">
				<${Header} message=${state.message} />
				<${Main} />
			</div>
		`
	}
}


/** Components can just be pure functions */
const Header = (props) => {
	return html`
		<h1>App</h1>
		${props.message && html`<h2>${props.message}</h2>`}
	`
};


/** Instead of JSX, use: h(type, props, ...children) */
class Main extends Component {
	render() {
		const items = [1,2,3,4,5].map( (item) => html`
			<li id=${item}>Item ${item}</li>
		`);

		return html`
			<main>
				<ul>${items}</ul>
			</main>
		`
	}
}


render(html`<${App} />`, document.body);
