import React from 'react';
import { render, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filters from 'components/Filters';

describe('Testing filters', () => {



test('it renders without crashing', () => {

  render(<Filters filters={{Single: true}} />);


});

test('it renders with the default filter', () => {
  const {debug, getByLabelText} = render(<Filters filters={{Single: true}} />);

  const result = getByLabelText('Single');
  
  console.log(prettyDOM(result));

  expect(result).toHaveAttribute('checked','');


});
});