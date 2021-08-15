'use strict'

const express = require('express')/* exports express*/
const route = express.Router(); /* exports route express*/
const userCtrl = require('../../controller/users') /* controllers exports */

route.get("/", userCtrl.findAll) /* get all User  */
route.get("/:code", userCtrl.findOne) /* get one User */
route.post("/", userCtrl.create) /* create User */
route.put('/:code', userCtrl.update)/* update User */
route.delete('/:code', userCtrl.destroy)/* delete User */


module.exports = route; /* exports route from User */
