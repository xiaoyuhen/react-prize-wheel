import React from 'react';

import { storiesOf } from '@storybook/react';
import {PrizeWheel} from '../src/index'

storiesOf('react-prize-wheel', module)
  .add('with some emoji', () => (
      <PrizeWheel />
  ));
