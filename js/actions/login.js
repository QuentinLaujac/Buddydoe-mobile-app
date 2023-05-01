'use strict';

const FacebookSDK = require('./../FacebookSDK');
const HttpServices = require('./../services/HttpServices');
const DB = require('./../services/DbServices');

import type { Action, ThunkAction } from './types';


function queryFacebookAPI(path, ...args) {
    return new Promise((resolve, reject) => {
        FacebookSDK.api(path, ...args, (response) => {
            if (response && !response.error) {
                resolve(response);
            } else {
                reject(response && response.error);
            }
        });
    });
}


async function getFacebookinfos(data): Promise < Array < Action >> {

    const profile = await queryFacebookAPI('/me', { fields: 'id, name, birthday, gender, email,first_name,last_name,age_range,picture.type(large), cover, relationship_status, interested_in, currency, languages, verified, accounts, likes, books, games, sports, movies, favorite_teams, music' });
    let user = {
        firstname: profile.first_name,
        lastname: profile.last_name,
        email: profile.email,
        facebookId: profile.id,
        token: data.authResponse.accessToken,
        birthdate: profile.birthday,
        age_range: profile.age_range.min,
        gender: profile.gender,
        pictureProfileHigh: profile.picture.data.url,
        pictureProfileLow: profile.picture.data.url,
        pictureBanner: profile.cover.source,
        name:profile.name,
        currency:profile.currency.user_currency,
        games:profile.games,
        likes:profile.likes,
        movies:profile.movies,
        music:profile.music,
        relationship_status:profile.relationship_status,
        interested_in:profile.interested_in,
        verified:profile.verified,
    };

    return Promise.all([
        Promise.resolve(user)
    ]);
}

async function logUser(user) {

    let dataReturn = { type: 'LOGGED_IN' };
    let resp = await HttpServices.createUser(user);
    if (resp.codeReturn != "202") {
        dataReturn.type = 'ERROR_LOGGIN';
    }

    await DB.saveUser(user);

    return Promise.all([
        Promise.resolve(dataReturn)
    ]);
}




function logInWithFacebook(): ThunkAction {
    return (dispatch) => {
        FacebookSDK.login('email, user_birthday,user_likes, public_profile, user_about_me,user_actions.books,user_actions.fitness,user_actions.music,user_games_activity,user_hometown,user_location, user_relationship_details').then(function(data) {
            getFacebookinfos(data).then(function(profile) {
                if(!Array.isArray(profile)){return;}
                logUser(profile[0]).then(function(dataReturn) {
                    dispatch(dataReturn);
                });
            });
        });
    };
}

function checkLoginStatus(): ThunkAction {
    return (dispatch) => {
        DB.getAllUser().then((users) => {
            if (users.rows && Object.keys(users.rows).length > 0) {
                return dispatch({ type: 'LOGGED_IN' });
            }
            return dispatch({ type: 'ERROR_LOGGIN' });
        });
    };
}

module.exports = { logInWithFacebook, checkLoginStatus };