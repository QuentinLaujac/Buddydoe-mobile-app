'use strict';

const DEFAULT_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};
var { serverURL } = require('./../environment.js');

type respHttp = {
    codeReturn: string;
    message: string;
    data: any;
};

let _respHttp: ? respHttp = null;

async function callWS(method, endPoint, body): Promise < respHttp > {

    let data = {
        method: method,
        headers: DEFAULT_HEADER,
    };

    if (body !== undefined) {
        data.body = JSON.stringify(body);
    }

    try {
        let response = await fetch(serverURL + endPoint, data);
        let resp = await response.json();

        _respHttp = {
            codeReturn: resp.Code,
            message: resp.Message,
            data: resp.Data
        };

        console.log("Call " + endPoint + " with response :");
        console.log(resp);

        return _respHttp;

    } catch (error) {
        console.error(error);
    }

    return null;
}

var HttpServices = {
    createUser: function(body) {
        return new Promise((resolve, reject) => {
            callWS('POST', '/users/create', body).then(function(resp) {
                resolve(resp);
            });
        });
    },

    readByFacebookId: function(facebookId) {
        return new Promise((resolve, reject) => {
            callWS('GET', '/users/readByFacebookId/' + facebookId).then(function(resp) {
                resolve(resp);
            });
        });
    },

    createEvent: function(body) {
        return new Promise((resolve, reject) => {
            callWS('POST', '/events/create', body).then(function(resp) {
                resolve(resp);
            });
        });
    },

    createStay: function(facebookId, body) {
        return new Promise((resolve, reject) => {
            callWS('POST', '/stays/createByFacebookId/' + facebookId, body).then(function(resp) {
                resolve(resp);
            });
        });
    },

    deleteStay: function(body) {
        return new Promise((resolve, reject) => {
            callWS('POST', '/stays/deleteById', body).then(function(resp) {
                resolve(resp);
            });
        });
    },

    checkIfActiveStay: function(facebookId) {
        return new Promise((resolve, reject) => {
            callWS('GET', '/stays/checkIfActiveStay/' + facebookId).then(function(resp) {
                resolve(resp);
            });
        });
    },

    getAllHotel: function() {
        return new Promise((resolve, reject) => {
            callWS('GET', '/places/hotelsAll').then(function(resp) {
                resolve(resp);
            });
        });
    },

    searchHotel: function(hotel, gpsPostion, rayon) {
        return new Promise((resolve, reject) => {
            callWS('POST', '/nearByTextSearch', { keyword: 'hotel', location: gpsPostion, radius: rayon, textSearch: hotel }).then(function(resp) {
                resolve(resp);
            });
        });
    },

    searchActivity: function(search, activite, gpsPostion, rayon) {
        return new Promise((resolve, reject) => {
            callWS('POST', '/nearByTextSearch', { keyword: activite, location: gpsPostion, radius: rayon, textSearch: search}).then(function(resp) {
                resolve(resp);
            });
        });
    },
}

module.exports = HttpServices;
