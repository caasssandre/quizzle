/**
 * @jest-environment jsdom
 */

import {Welcome} from '../../../client/components/Welcome'
import Instructions from '../../../client/components/Instructions'
import Join from '../../../client/components/Join'
import Create from '../../../client/components/Create'

window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.addTextTrack = () => {
  /* do nothing */
}

import React from 'react'
import { shallow } from 'enzyme'

jest.mock('../../../client/api/socket', () => ({}))

const setUp = (props = {}) => {
    const component = shallow(<Welcome {...props} window={false} />)
    return component
} 

describe('Welcome Component Tests', () => {

    let component
    beforeEach(() => {
        component = setUp()
    })

    it('Should render a logo image', () => {
        const logo = component.find("#home-logo")
        expect(logo.length).toBe(1)
    })

    it('Should render a title', () => {
        const title = component.find('.home-gameTitle')
        expect(title.length).toBe(1)
    })

    it('Should change state to instructions', () => {
        // console.log(component.state());
        const expected = 'instructions'
        const event = { preventDefault: () => {} }
        component.find('#instruct-btn').simulate('click', event)
        // console.log(component.state());
        const actual = component.state().display
        expect(actual).toContain(expected)
        
    })

     it('Should render instructions component if state equals instructions', () => {
        // check the instuctions are missing initially
        // console.log(component.debug())
        const actual = component.find(<Instructions/>)
        expect(actual).toEqual({})

        // set state
        component.setState({ display: 'instructions' }, () => {
            // check they are no longer missing
            // console.log(component.debug())
            const actual = component.find(<Instructions/>)
            expect(actual).toBeTruthy()
        })
     })
     
     it('Should change state to join', () => {
         const expected = 'join'
         const event = { preventDefault: () => {} }
         component.find('#join-btn').simulate('click', event)
         const actual = component.state().display
         expect(actual).toContain(expected)
     })

     it('Should render join component if state equals "join"', () => {
        //  console.log(component.debug())
         const acutal = component.find(<Join/>)
         expect(acutal).toEqual({})

         component.setState({ display: 'join' }, () => {
             const actual = component.find(<Join/>)
            expect(actual).toBeTruthy()
         })
     })

     it('Should change state to create', () => {
         const expected = 'create'
         const event = { preventDefault: () => {} }
         component.find('#create-btn').simulate('click', event)
         const actual = component.state().display
         expect(actual).toContain(expected)
     })

     it('Should render create component if state equals "create"', () => {
         const actual = component.find(<Create/>)
         expect(actual).toEqual({})

         component.setState({ display: 'create' }, () => {
             const actual = component.find(<Create/>)
             expect(actual).toBeTruthy()
         })
     })
  
})