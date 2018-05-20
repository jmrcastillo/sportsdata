// inside src/index.js
import React, {Component} from 'react'
import {render} from 'react-dom'

const App = () => {
    return <div>
        <h1>React App version {React.version} Running..</h1>
        <h1>Webpack build system 4.8.3.</h1>
    </div>
}

render(
    <App/>,
    document.getElementById('root')
)
