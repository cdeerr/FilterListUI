import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search.js';

const title = 'FilterListUI';
const ROOT = document.getElementById('root');

function App() {
    return (
        <div>
            <Search />
        </div>
    );
}

ReactDOM.render(
    <App />,
    ROOT
);

module.hot.accept();
