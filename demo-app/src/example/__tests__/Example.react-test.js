/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 * @emails oncall+i18n_fbt_js
 */

import Example from '../Example.react';
import * as React from 'react';
import renderer from 'react-test-renderer';

describe('Example.react', () => {
  it('renders the example', () => {
    const example = renderer.create(<Example />).toJSON();
    expect(example).toMatchSnapshot();
  });
});
