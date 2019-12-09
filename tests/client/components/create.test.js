import {Create} from '../../../client/components/Create'

import React from 'react'
import { shallow } from 'enzyme'

jest.mock('../../../client/api/socket', () => ({}))

const setUp = (props = {}) => {
    const component = shallow(<Create {...props} />)
    return component
}

describe ('Create Component Tests', () => {
    let component
    beforeEach(() => {
        component = setUp()
    })

    it('Should render the Create Component', () => {
        const title = component.find('#welcome')
        expect(title.length).toBe(1)
    })

    it('Should render the input for player name', () => {
        const expected = 'BOB'
        const event = { target: {name: 'captainName', value: 'bob' } }
        expect(component.find('#capNameInput').props().value).toBe('')

        component.find('#capNameInput').simulate('change', event )
        const actual = component.find('#capNameInput').props().value        
        expect(actual).toBe(expected)
    })

    it('Should render a Create team button', () => {
        const teamBtn = component.find('#createBtn')
        expect(teamBtn.length).toBe(1)
    })

    it('Should render a Join team button', () => {
        const joinBtn = component.find('#joinBtn')
        expect(joinBtn.length).toBe(1)
    })

    it('Should run changePage function once when Join Team button is clicked', () => {
        const changePageMock = jest.fn()
        const component = shallow(<Create changePage={changePageMock}/>)
        component.find('#joinBtn').simulate('click', changePageMock)

        expect(changePageMock.mock.calls.length).toEqual(1)
    })

    it('Should render a Rules team button', () => {
        const rulesBtn = component.find('#rulesBtn')
        expect(rulesBtn.length).toBe(1)
    })

    it('Should render a Main Menu team button', () => {
        const mmBtn = component.find('#mmBtn')
        expect(mmBtn.length).toBe(1)
    })


})