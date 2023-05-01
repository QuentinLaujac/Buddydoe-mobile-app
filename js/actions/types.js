'use strict';

type ParseObject = Object;

export type Action =
    | { type: 'LOGGED_IN', source: ?string; data: { id: string; name: string; sharedSchedule: ?boolean; } }
    | { type: 'SKIPPED_LOGIN' }
    | { type: 'LOGGED_OUT' }
    | { type: 'ACTIVE_STAY' }
    | { type: 'INACTIVE_STAY' }
    | { type: 'STAY_SUCCESSSFUL_CREATED' }
    | { type: 'ERROR_CREATED_STAY' }
    | { type: 'HAS_SKIPPED_STAY' }
    | { type: 'EVENT_SUCCESSSFUL_CREATED' }
    | { type: 'ERROR_CREATED_EVENT' }
    | { type: 'SWITCH_DAY', day: 1 | 2 }
    | { type: 'SWITCH_TAB', tab: 'schedule' | 'my-schedule' | 'map' | 'notifications' | 'info' }
    | { type: 'TURNED_ON_PUSH_NOTIFICATIONS' }
    | { type: 'REGISTERED_PUSH_NOTIFICATIONS' }
    | { type: 'SKIPPED_PUSH_NOTIFICATIONS' }
    | { type: 'RECEIVED_PUSH_NOTIFICATION', notification: Object }
    | { type: 'SEEN_ALL_NOTIFICATIONS' }
    | { type: 'RESET_NUXES' }
    | { type: 'USER_FOUND' }
    | { type: 'USER_NOT_FOUND' }
    ;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
