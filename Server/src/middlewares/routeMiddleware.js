import express from "express";

function logOriginalUrl(req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
}

function logMethod(req, res, next) {
    console.log('Request Type:', req.method)
    next()
}

let logDate = (req, res, next) => {
    console.log('Connect route time:', Date.now())
    next()
}

let logSuccess = function (req, res, next) {
    console.log('Connect route success')
    next()
}

module.exports = {
    logDate: logDate,
    logSuccess: logSuccess,
    logOriginalUrl: logOriginalUrl,
    logMethod: logMethod,
}