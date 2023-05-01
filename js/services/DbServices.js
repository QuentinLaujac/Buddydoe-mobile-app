'use strict';

const DB = require('./../db/dataBase');

var DbServices = {
    saveUser: function(user) {
        return new Promise((resolve, reject) => {
            DB.user.add(user, function(added_data) {
                console.log(added_data);
                resolve(added_data);
            });
        });
    },

    updateUser: function(user) {
        return new Promise((resolve, reject) => {
            DB.users.update(user, user, function(updated_table) {
                console.log(updated_table);
                resolve(updated_table);
            });
        });
    },

    getUserById: function(idUser) {
        return new Promise((resolve, reject) => {
            DB.user.get_id(idUser, function(results) {
                console.log(results);
                resolve(results);
            });
        });
    },

    getAllUser: function() {
        return new Promise((resolve, reject) => {
            DB.user.get_all(function(result) {
                console.log(result);
                resolve(result);
            });
        });
    },

    eraseAllUser: function() {
        return new Promise((resolve, reject) => {
            DB.user.erase_db(function(removed_data) {
                console.log(removed_data);
                resolve(removed_data);
            })
        });
    },

    getAllStay: function() {
        return new Promise((resolve, reject) => {
            DB.stay.get_all(function(result) {
                console.log(result);
                resolve(result);
            });
        });
    },

    saveStay: function(stay) {
        return new Promise((resolve, reject) => {
            DB.stay.add(stay, function(added_data) {
                console.log(added_data);
                resolve(added_data);
            });
        });
    },

    eraseAllStay: function() {
        return new Promise((resolve, reject) => {
            DB.stay.erase_db(function(removed_data) {
                console.log(removed_data);
                resolve(removed_data);
            })
        });
    },

    getAllHotel: function() {
        return new Promise((resolve, reject) => {
            DB.hotels.get_all(function(result) {
                console.log(result);
                resolve(result);
            });
        });
    },

    saveHotel : function(hotel) {
        return new Promise((resolve, reject) => {
            DB.hotels.add(hotel, function(added_data) {
                console.log(added_data);
                resolve(added_data);
            });
        });
    },

    eraseAllHotel : function() {
        return new Promise((resolve, reject) => {
            DB.hotels.erase_db(function(removed_data) {
                console.log(removed_data);
                resolve(removed_data);
            })
        });
    },

}

module.exports = DbServices;
