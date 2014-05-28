<h1><i class="fa fa-envelope-o"></i> Emailer (AmazonSES)</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			Amazon Simple Email Service (Amazon SES) is a cost-effective outbound-only email-sending service built on the reliable and scalable infrastructure that Amazon.com has developed to serve its own customer base. With Amazon SES, you can send transactional email, marketing messages, or any other type of high-quality content and you only pay for what you use.

Along with high deliverability, Amazon SES provides easy, real-time access to your sending statistics and built-in notifications for bounces and complaints to help you fine-tune your email-sending strategy.

		</blockquote>
		<p>
			To get started:
		</p>

http://aws.amazon.com/ses/
<br>
http://aws.amazon.com/sdkfornodejs/
<br><br>		
Add `emailer-amazonses-config.json` file in nodebb-root-directory for your AWS-API-key and SES server region.
<br><br>
{ "accessKeyId": "YOUR_AWS_API_ID", <br>
  "secretAccessKey": "YOUR_SECRET", <br>
  "region": "us-west-2" }
<br>
Add `emailer-amazonses-sender.json` file in nodebb-root-directory to set email sender.
<br>
{ email: 'admin@somedomain.com' }


	</div>
</div>
