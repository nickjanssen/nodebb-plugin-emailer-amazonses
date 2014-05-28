// -*- coding: utf-8 -*-
/*global window */
/*global alert */
/*global console */
/*global require */

"use strict";

    var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config.json');
    var ses = new AWS.SES({apiVersion: '2010-12-01'});

    // send to list
    var to = ['kenokabe@gmail.com'];

    // this must relate to a verified SES account
    var from = 'adm.costcobb@gmail.com';


    // this sends the email
    // @todo - add HTML version
    ses.sendEmail({
       Source       : from,
       Destination  : { ToAddresses: to },
       Message:{
           Subject  : {
              Data: 'TEST'
           },
           Body: {
               Text: {
                   Data: 'hello',
               }
            }
       }
    },
    function(err, data) {
        if(err) throw err;
            console.log('Email sent:');
            console.log(data);
    });

