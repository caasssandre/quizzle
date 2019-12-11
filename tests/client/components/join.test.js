/**
 * @jest-environment jsdom
 */

import { Join } from '../../../client/components/Join'
import { Welcome } from '../../../client/components/Welcome'
import Create from '../../../client/components/Create'

import React from 'react'
import { shallow, mount } from 'enzyme'

const setUp = (props = {}) => {jest.fn()
  const component = shallow(<Join {...props} />)
  return component
}

describe('Join Component Tests', () => {
  let component
  beforeEach(() => {
    component = setUp()
  })

  it('Should render game title', () => {
    const title =  component.find('.setup-gameTitle')
    expect(title.length).toBe(1)
  })

  it('Should render a team name input field', () => {
    const field = component.find('.setup-team__fields', '.setup-team__fields')
    expect(field.length).toEqual(1)
  })
  
  it('Should render a user name input field', () => {
    const field = component.find('.setup-user__fields', '.setup-user__fields')
    expect(field.length).toEqual(1)
  })

  it('Should change state when, user types in user field', () => {
    const expected = 'TEST'
    const event = { target: { name: 'player', value: 'test'} }
    
    expect(component.find('#user-text').props().value).toBe('')
    
    component.find('#user-text').simulate('change', event)
    
    const actual = component.find('#user-text').props().value
    expect(actual).toBe(expected)
  })

  it('Should change state when, user types in team field', () => {
    const expected = 'TEST'
    const event = { target: { name: 'team', value: 'test'} }

    expect(component.find('#team-text').props().value).toBe('')

    component.find('#team-text').simulate('change', event)

    const actual = component.find('#team-text').props().value
    expect(actual).toBe(expected)
  })

  it('Should run changepage func when "Create Team" is clicked', () => {
    const changePageMock = jest.fn()

    const component = shallow(<Join changePage={changePageMock}/>)
    component.find('#create-btn').simulate('click', 'changePageMock')

    expect(changePageMock.mock.calls.length).toEqual(1)

  })

  it('Should run joinTeam function when Join Team is clicked', () => {
    
    const spy = jest.spyOn(Join.prototype, 'joinTeam')
    const component = shallow(<Join />)

    component.find('#join-btn').simulate('click', 'this.joinTeam')
   
    expect(spy).toHaveBeenCalled()
  })



})


