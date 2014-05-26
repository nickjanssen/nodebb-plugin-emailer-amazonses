var fs = require('fs'),
    path = require('path'),

    winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    Emailer = {},
    ses;

Emailer.init = function (app, middleware, controllers) {
    function render(req, res, next) {
        res.render('admin/plugins/emailer-amazonses', {});
    }

    var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config.json');
    ses = new AWS.SES({
        apiVersion: '2010-12-01'
    });

    app.get('/admin/plugins/emailer-amazonses', middleware.admin.buildHeader, render);
    app.get('/api/admin/plugins/emailer-amazonses', render);
};

Emailer.send = function (data) {

    ses.sendEmail({
            Source: data.from,
            Destination: {
                ToAddresses: data.to
            },
            Message: {
                Subject: {
                    Data: data.subject
                },
                Body: {
                    Text: {
                        Data: data.plaintext,
                    }
                }
            }
        },
        function (err, data) {
            if (err) throw err;
            console.log('Email sent:');
            console.log(data);
        });




};

Emailer.admin = {
    menu: function (custom_header, callback) {
        custom_header.plugins.push({
            "route": '/plugins/emailer-amazonses',
            "icon": 'fa-envelope-o',
            "name": 'Emailer (AmazonSES)'
        });

        callback(null, custom_header);
    }
};

module.exports = Emailer;

