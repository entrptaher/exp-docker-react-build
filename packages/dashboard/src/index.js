import React from 'react';
import ReactDOM from 'react-dom';

function Container() {
	return <p>ENV: {process.env.REACT_APP_TEST}</p>;
}

ReactDOM.render(<Container />, document.querySelector('#root'));
module.hot && module.hot.accept();
