'use strict';

import type { Action, ThunkAction } from './types';
const HttpServices = require('./../services/HttpServices');
const dbServices = require('./../services/DbServices');

async function readByFacebookId(facebookId): Promise < Array < Action >> {

    var dataReturn = { type: 'USER_FOUND' };

    let resp = await HttpServices.readByFacebookId(facebookId);
    await dbServices.eraseAllStay();
    if (resp.codeReturn == "203") {
        let user  = resp.data[0];
        dataReturn.type = 'USER_FOUND';
    } else if (resp.codeReturn == "403") {
        dataReturn.type = 'USER_NOT_FOUND';
    } else {
        dataReturn.type = 'USER_NOT_FOUND';
    }

    return Promise.all([
        Promise.resolve(dataReturn)
    ]);
}

async function readProfileByFacebookId(facebookId): Promise < Array < Action >> {

    var dataReturn = { type: 'USER_FOUND' };

    let resp = await HttpServices.readByFacebookId(facebookId);
    if (resp.codeReturn == "203") {
        let user  = resp.data[0];
        dataReturn.type = 'USER_FOUND';
    } else if (resp.codeReturn == "403") {
        dataReturn.type = 'USER_NOT_FOUND';
    } else {
        dataReturn.type = 'USER_NOT_FOUND';
    }

    return Promise.all([
        Promise.resolve(dataReturn)
    ]);
}

module.exports = {};
