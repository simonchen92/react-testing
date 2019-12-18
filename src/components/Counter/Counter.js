import React, { Fragment } from 'react'

class Counter extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            number: 0
        }
    }

    handleIncrement = () => {
        this.setState({
            number: this.state.number + 1
        })
    }

    handleDecrement = () => {
        this.setState({
            number: this.state.number - 1
        })
    }

    render () {
        return (
            <Fragment>
            <h1>Counter</h1>
            <p className='number'>{this.state.number}</p>
            <button className='plus' onClick={this.handleIncrement}></button>
            <button className='minus' onClick={this.handleDecrement}></button>
            </Fragment>
        )
    }
}

export default Counter
