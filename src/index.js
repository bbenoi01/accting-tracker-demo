import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import rootStore from './js/rootStore';
import App from './js/App';

render(
	<Provider store={rootStore}>
		<App />
	</Provider>,
	document.getElementById('root')
);
