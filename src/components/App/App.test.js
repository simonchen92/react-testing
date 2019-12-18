import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('Frist React component test with Enzyme', function () {
    it('should render without crashing', function () {
        shallow(<App/>)
    })
})