var winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    Emailer = {},
    ses;

Emailer.init = function (app, middleware, controllers)
{
  console.log('===========emailer-amazonses init============');
  var AWS = require('aws-sdk');
  AWS.config.loadFromPath('./emailer-amazonses-config.json');

  ses = new AWS.SES({
      apiVersion: '2010-12-01'
  });

    var render = function (req, res, next)
    {
        res.render('admin/plugins/emailer-amazonses', {});
    };

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
                if (!err) {
			winston.info('[emailer.amazonses] Sent `' + data);
		} else {
			winston.warn('[emailer.amazonses] Unable to send `' + data);
			winston.error('[emailer.amazonses] ' );
		}

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

