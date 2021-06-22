
import { cleanup,render, screen } from '@testing-library/react';

import Register from './component/Register';
afterEach(cleanup);

 test('match snapshot register component', () => {
  let component = render(<Register></Register>);
  expect(component).toMatchSnapshot();
});

