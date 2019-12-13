[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Testing React

## Prerequisites

- [mocha-chai-testing](https://git.generalassemb.ly/eron-salling/mocha-chai-testing)
- Experience with React

## Objectives

By the end of this, developers should be able to:

- Discuss the features of Jest and Enzyme
- Use Jest and Enzyme to test React applications

## Preparation

1. Fork and clone this repository.
 [FAQ](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
1. Create a new branch, `training`, for your work.
1. Checkout to the `training` branch.
1. Install dependencies with `npm install`.

# React Testing Setup

## What is Jest?

Jest was built by Facebook for testing JavaScript code. Jest runs your tests
for you automatically when you have it in watch mode, and runs your tests in
node instead of the browser so that they run faster. It also contains the API
we will use to actually test our components.

Jest is built into the `create-react-app` package, and is the most popular
testing framework for React. We will be using it instead of Mocha, but it's
syntax will feel very similar.

We can name our files with `*.test.js` to have jest recognize them. For larger
projects, we can have `__tests__` folders instead, and just fill those folders
with our test files named however we like.

## Code Along: First Jest Test

Open the `src/components/App` folder and locate `App.test.js`.

In here, we will write a very simple test to see how the jest syntax compares
to our previous tests using Mocha and Chai.

```js
// `describe` and `it` were previously given to us from Mocha
describe('Jest Syntax', () => {
  it('adds numbers', () => {
    // we needed `chai` before to use this kind of language
    expect(1 + 2).toEqual(3)
    expect(2 + 2).toEqual(4)
   })
})
```

We can run `npm run test` in the terminal to see our test's output.

## What is Enzyme?

Enzyme mimics JQuery's DOM manipulation library to make testing React easier.
It allows us to grab the state of the component, simulate user actions, and
grab elements from the virtual DOM.

Enzyme is not included in our React project like Jest is, so we need to add
and configure it. Run the following in terminal to install three packages we
will use to work with enzyme:

```js
npm install --save-dev enzyme enzyme-adapter-react-16 react-test-renderer
```

Once these packages are installed, we can make a setup script for our tests. If
we were using `create-react-app` all we would need to do is create a file
called `setupTests.js` in the `src` folder. Since we're not, we'll need to do a
little bit more to tell Jest about this file.

Open your `package.json` file and find a key `"jest"`. We've added
a key to our Jest configuration to point to our setup file:

```json
"setupTestFrameworkScriptFile": "<rootDir>/src/setupTests.js"
```

Take a look at our `src/setupTests.js` file:

```js
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
```

This will configure Enzyme and the adapters necessary to get everything
working. We should be good to make our first enzyme test!

## Demo: Testing With Enzyme

We can write a very basic test to see if Enzyme is working:

```js
import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<App />)
    })
})
```

The `shallow` method is a type of unit test that will only look at our `App`
component, ignoring any children it might have. This is a good way to test our
component _independently_.

## Code-Along: HelloWorld

We are going to start off with a very simple component called `HelloWorld`.

We have a folder called `HelloWorld` to store our component and test files.
Inside of that folder, we have two files -- one called `HelloWorld.js` and one
called `HelloWorld.test.js`.

Right now, we want to build a component that just renders out a name that's fed
to it via props. Let's write a test to see if our app is doing that!

```js
//HelloWorld.test.js

// Import React
import React from 'react'
import { shallow } from 'enzyme'

import HelloWorld from './HelloWorld'

// We will describe a block of tests
describe('Hello world component', () => {
	// we will write one individual test
  it('should render as expected', () => {
    // Shallow rendering renders a component without rendering any of its children
    const component = shallow(<HelloWorld name={'Your name'} />)
    // We create an assertion within the test that checks if our component renders our name prop
    expect(component.contains('Your name')).toBe(true)
  })
})
```

Our test should fail right now, as we haven't written our component yet!

Now, using test driven development principles, we will write the minimum code for it to pass. In this example, we just need a component that renders a name in it. Let's implement that:

```js
import React from 'react'

class HelloWorld extends React.Component {

	render() {
		return (
			<h1>{this.props.name}</h1>
		)
	}
}

export default HelloWorld
```

Now our test passes!

## Lab: A Counter App

For this exercise, you will be using test driven development to write the React
code to pass some pre-written tests. We have provided the tests for you, so you
can focus on using them to write your component.

We want to build a counter app. When we press a button, we want a number stored
in state to increase, and when we press a second button that number will
decrease.

1. FInd the components folder `Counter` with the files `Counter.js` for your
  component and `Counter.test.js` for your tests.
2. Copy the following code into `Counter.test.js`:
  ```js
  import React from 'react'
  import { shallow } from 'enzyme'

  import Counter from './Counter'

  describe('Counter component', () => {

    let component
    beforeEach(() => {
      component = shallow(<Counter />)
    })

    // add the rest of the tests here

  })
  ```
3. One by one, copy a test into the body of the testing block. Then, make that test succeed before copying in another one.
4. Take a look at the documentation for Jest and Enzyme as well. They will give you some context for the english verb-like function names.
  - https://facebook.github.io/jest/docs/en/api.html
  - https://github.com/airbnb/enzyme/tree/master/docs/api

Pre-written tests:

1.
```js
  it('should have a header that says "Counter"', () => {
    expect(component.contains(<h1>Counter</h1>)).toBe(true)
  })
```

2.
```js
  it('should have a state attribute called number initialized to zero', () => {
    expect(component.state('number')).toEqual(0)
  })
```

3.
```js
  it('should display the current number in an element with the className number', () => {
    expect(component.find('.number').text()).toEqual("0")
  })
```

4.
```js
  it('should have a button with a class plus that increases the number in state', () => {
    component.find('.plus').simulate('click')
    expect(component.state('number')).toEqual(1)
  })
```

5.
```js
  it('should have a button with a class minus that decreases the number in state', () => {
    component.find('.minus').simulate('click')
    expect(component.state('number')).toEqual(-1)
  })
```

## Additional Resources

- [Jest](http://facebook.github.io/jest/)
- [Enzyme](https://github.com/airbnb/enzyme/tree/master/docs/api)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
