var RNDBModel = require('react-native-db-models')
 
var dataBase = {
    "app": new RNDBModel.create_db('app'),
    "user": new RNDBModel.create_db('user'),
    "hotels": new RNDBModel.create_db("hotels"),
    "stay": new RNDBModel.create_db("stay")
}
 
module.exports = dataBase;