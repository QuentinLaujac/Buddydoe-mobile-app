'use strict';

import type {Action} from '../actions/types';

export type Tab =
  | 'myEvents'
  | 'events'
  | 'profile'
  ;

export type Day = 1 | 2;

type State = {
  tab: Tab;
  day: Day;
};

const initialState: State = { tab: 'events', day: 1 };

function navigation(state: State = initialState, action: Action): State {
  if (action.type === 'SWITCH_TAB') {
    return {...state, tab: action.tab};
  }
  if (action.type === 'SWITCH_DAY') {
    return {...state, day: action.day};
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }
  return state;
}

module.exports = navigation;
