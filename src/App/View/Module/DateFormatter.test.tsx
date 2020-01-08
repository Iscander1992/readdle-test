import * as React from 'react';
import { shallow } from 'enzyme';
import DateFormatter from './DateFormatter';

describe('<DateFormatter />', () => {

    it('returns date from string', () => {

        const wrapper = shallow(
            <DateFormatter date="2019-08-01" />
        );

        expect(wrapper.html()).toEqual('1 Aug, 2019')
    });

    it('returns date from string with custom format', () => {

        const wrapper = shallow(
            <DateFormatter date="2019-08-01" format="dd-MM-yyyy" />
        );

        expect(wrapper.html()).toEqual('01-08-2019')
    });
});
