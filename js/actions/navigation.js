'use strict';

import type { Action } from './types';

type Tab = 'myEvents' | 'events';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),

  switchDay: (day: 1 | 2): Action => ({
    type: 'SWITCH_DAY',
    day,
  }),
};
