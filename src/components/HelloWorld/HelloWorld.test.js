import React from 'react'
import { shallow } from 'enzyme'
import HelloWorld from './HelloWorld'

// Test suite for HelloWorld component
describe('HelloWorld component', function () {
    it('should render as expected', function () {
        // Storing component:
        const component = shallow(<HelloWorld name={'Simon'}/>)

        // Assertion:
        expect(component.contains('Simon')).toBe(true)
    })
})