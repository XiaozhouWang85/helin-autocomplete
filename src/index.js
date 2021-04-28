import React from 'react';
import ReactDOM from 'react-dom';
import CompaniesAutocomplete from './CompaniesAutocomplete';

const App = () => {
	const api_key = '6cedd71c-1d3f-486a-9b22-7433bcb8df5b';
	return (
		<div class="ui grid">
			<div className="five wide column">
				<CompaniesAutocomplete api_key={api_key} />
			</div>
		</div>
	);
};
export default App;

ReactDOM.render(<App/>, document.querySelector('#root') )
