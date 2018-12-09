import React from 'react';

import { storiesOf } from '@storybook/react';

storiesOf('react-prize-wheel', module)
  .add('with some emoji', () => (
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
  ));
