/**
 * @jest-environment jsdom
 */

import React from 'react'
import { shallow, mount } from 'enzyme'
jest.mock('../../../client/api/socket', () => ({}))
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {App} from '../../../client/components/App'
import { isTSAnyKeyword } from '@babel/types'

// import ConnectedHome,{App} from '../src/js/components/Home'
// const myComp = App.WrappedComponent

// test('<App />', () => {
//   const expected = 'React development has begun!'
//   const wrapper = mount(myComp)
//   expect(wrapper.text()).toMatch(expected)
// })
test('1+1', () => {
  expect(1+1).toEqual(2)
})

// describe('app', ()=>{
//   let wrapper
//   const pageNumber = 1
//   beforeEach(()=>{
//     wrapper = shallow(<App pageNumber={pageNumber}/>)    
//     console.log(wrapper)
//   })

//   it('render the dumb component', () =>{
//     expect(wrapper.length).toEqual(1)
//   })
// })
