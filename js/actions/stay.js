'use strict';

import type { Action, ThunkAction } from './types';
const HttpServices = require('./../services/HttpServices');
const dbServices = require('./../services/DbServices');

async function checkIfActiveStay(facebookId): Promise < Array < Action >> {

    var dataReturn = { type: 'LOGGED_IN' };

    let resp = await HttpServices.checkIfActiveStay(facebookId);
    await dbServices.eraseAllStay();
    if (resp.codeReturn == "203") {
        let stay  = resp.data[0];
        stay.id = stay._id;
        await dbServices.saveStay(stay);
        dataReturn.type = 'ACTIVE_STAY';
    } else if (resp.codeReturn == "403") {
        dataReturn.type = 'INACTIVE_STAY';
    } else {
        dataReturn.type = 'INACTIVE_STAY';
    }

    return Promise.all([
        Promise.resolve(dataReturn)
    ]);
}

async function addNewStay(facebookId, startDate, endDate, hotelId): Promise < Array < Action >> {

    let dataReturn = {};
    let body = {startDate : startDate, endDate:endDate, hotelId:hotelId};

    let resp = await HttpServices.createStay(facebookId, body);
    if (resp.codeReturn == "201") {
        dataReturn.type = 'STAY_SUCCESSSFUL_CREATED';
    } else {
        dataReturn.type = 'ERROR_CREATED_STAY';
    }

    return Promise.all([
        Promise.resolve(dataReturn)
    ]);
}

async function deleteStay(facebookId, stayId): Promise < Array < Action >> {

    let dataReturn = {};
    let body = {facebookId : facebookId, stayId:stayId};

    let resp = await HttpServices.deleteStay(body);
    if (resp.codeReturn == "203") {
        dataReturn.type = 'STAY_SUCCESSSFUL_CANCELLED';
    } else {
        dataReturn.type = 'ERROR_CANCELLED_STAY';
    }

    return Promise.all([
        Promise.resolve(dataReturn)
    ]);
}

function skipStay(){
    return (dispatch) => {
        let dataReturn = {};
        dataReturn.type = 'HAS_SKIPPED_STAY';
        dispatch(dataReturn);
    };
}


function isActiveStay(facebookId): ThunkAction {
    return (dispatch) => {
        checkIfActiveStay(facebookId).then(function(result) {
            dispatch(result);
        });
    };
}

function createStay(facebookId, startDate, endDate, hotelId){
    return (dispatch) => {
        addNewStay(facebookId, startDate, endDate, hotelId).then(function(result) {
            dispatch(result);
        });
    };
}

function cancelStay(facebookId, stayId){
    return (dispatch) => {
        deleteStay(facebookId, stayId).then(function(result) {
            dispatch(result);
        });
    };
}

module.exports = { isActiveStay, createStay, cancelStay, skipStay};
