nodebb-plugin-emailer-amazonses
===============================

nodeBB plugin emailer of AmazonSES

Add `emailer-amazonses-config.json` in `nodebb root directory`  for your AWS API key and SES server region.

```
{ "accessKeyId": "YOUR_AWS_API_ID",
  "secretAccessKey": "YOUR_SECRET",
  "region": "us-west-2" }
```

Add `emailer-amazonses-sender.json` file in nodebb-root-dirctory to set email sender.

```
{email:”admin@somedomain.com”}
```

http://aws.amazon.com/ses/

http://aws.amazon.com/sdkfornodejs/




