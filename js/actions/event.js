'use strict';

import type { Action, ThunkAction } from './types';
const HttpServices = require('./../services/HttpServices');
const dbServices = require('./../services/DbServices');

async function addEvent(data): Promise < Array < Action >> {

    let dataReturn = {};

    let respDb = await dbServices.getAllUser();
    let user = respDb.rows[respDb.autoinc - 1 +""];
    let facebookId = user.facebookId;
    console.log("user :", user);

    let maleAccepted    = (data.quiParticipe == "homme" || data.quiParticipe == "lesDeux");
    let femaleAccepted = (data.quiParticipe == "femme" || data.quiParticipe == "lesDeux");

    let body = {
        eventDate : data.dateDeb,
        startHour : data.heureDeb,
        title : data.titre,
        description : data.details,
        theme : data.theme,
        userId : facebookId,
        place_id : data.lieu.place_id,
        subTheme : data.subTheme,
        minPerson : data.nombreMin,
        maxPerson : data.nombreMax,
        minAge : data.ageDeb,
        maxAge : data.ageFin,
        maleAccepted : maleAccepted,
        femaleAccepted :femaleAccepted
    };

    console.log('body', body);
    let resp = await HttpServices.createEvent(body);
    if (resp.codeReturn == "201") {
        dataReturn.type = 'EVENT_SUCCESSSFUL_CREATED';
    } else {
        dataReturn.type = 'ERROR_CREATED_EVENT';
    }

    return Promise.all([
        Promise.resolve(dataReturn)
    ]);
}

function createEvent(data){
    return (dispatch) => {
        addEvent(data).then(function(result) {
            dispatch(result);
        });
    };
}

module.exports = {createEvent};
