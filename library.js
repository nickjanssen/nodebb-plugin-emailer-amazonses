var fs = require('fs'),
    path = require('path'),

    winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    nodemailer = require('nodemailer'),
    Emailer = {};


Emailer.init = function(app, middleware, controllers) {
    function renderAdminPage(req, res, next) {
        res.render('admin/emailers/amazonses', {});
    }

    app.get('/admin/emailers/amazonses', middleware.admin.buildHeader, renderAdminPage);
    app.get('/api/admin/emailers/amazonses', renderAdminPage);
};

Emailer.send = function(data) {
    var transport = nodemailer.createTransport('SMTP',{
        host: Meta.config['emailer:amazonses:host'],
        port: Meta.config['emailer:amazonses:port'],
        auth: {
            user: Meta.config['emailer:amazonses:username'],
            pass: Meta.config['emailer:amazonses:password'],
        }
    });

    transport.sendMail({
        from: data.from,
        to: data.to,
        html: data.html,
        text: data.plaintext,
        subject: data.subject
    },function(err,response) {
        if ( !err ) {
            winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
        } else {
            winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
            // winston.error('[emailer.smtp] ' + response.message);
        }
    });
}

Emailer.admin = {
    menu: function(custom_header, callback) {
        custom_header.plugins.push({
            "route": '/emailers/amazonses',
            "icon": 'fa-envelope-o',
            "name": 'Emailer (AmazonSES)'
        });

        callback(null, custom_header);
    }
};

module.exports = Emailer;
