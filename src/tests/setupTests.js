import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({
    adapter: new Adapter()
});