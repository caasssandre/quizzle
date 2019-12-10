import { Instructions } from '../../../client/components/Instructions'
import React from 'react'
import { shallow, mount } from 'enzyme'

jest.mock('../../../client/api/socket', () => ({}))


describe('Inscructions Component', () => {

    test('Back button renders without errors', () => {
        const component = shallow(<Instructions/>);
        // console.log(component.debug());
        const button = component.find('.home-btns__btn')
        expect(button.length).toBe(1)
        
    })

    test('Page title should render without errors', () => {
        const component = shallow(<Instructions />)
        const title = component.find('.home-gameTitle')
        expect(title.length).toBe(1)
    })
})






// Tests to see that the Instructions component renders
test('test to see if instructions page renders', () => {
    const component = shallow(<Instructions/>)
  
    expect(component).toMatchSnapshot()
  
  })


  
// test('test state', () => {
//     const component = mount(<Instructions />);
//     component.find('[className="home-btns__btn"]').simulate('click');
//     expect(component.state('isLoading')).toEqual(true);
//     component.unmount();
//   });

