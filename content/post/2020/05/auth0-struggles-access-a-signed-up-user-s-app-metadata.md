+++
author = "Preslav Rachev"
categories = []
date = 2020-05-17T22:00:00Z
description = "For quite some time, I have been fighting with Auth0 to get the app metadata I am storing for each user. It wasn't easy, which is why I decided to document my steps."
feature_image = "/images/2020/05/jon-moore-bbavss4zqca-unsplash.jpg"
slug = ""
summary = "For quite some time, I have been fighting with Auth0 to get the app metadata I am storing for each user. It wasn't easy, which is why I decided to document my steps."
tags = ["Tips", "Programming", "API", "Auth0"]
title = "Auth0 Struggles: Access A Signed-Up User's App Metadata "
toc = false

+++
For quite some time, I have been fighting with [Auth0](https://auth0.com/) to get the app metadata I am storing for each user. For those new to Auth0, app metadata is a convenience object that allows the storing of read-only data for each user (e.g. API keys, which plan they are on, progress within application, etc).

{{<oembed "https://auth0.com">}}

After successfully managing to integrate Auth0 in my current project, I realized that the user profile information available after a user signs up/in, does not contain the app metadata I need. These metadata are only available in [Auth0's Management API](https://auth0.com/docs/users/guides/manage-users-using-the-management-api), i.e. only available with client ID/Secret credentials (and rightly so).

# Obtain a Management API access token

```bash
curl --request POST \
  --url https://[YOUR_TENANT].eu.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  -- data '{"client_id": "YOUR_CLIENT_ID", "client_secret": "YOUR_CLIENT_SECRET", audience: "YOUR_AUDIENCE", "grant_type":"client_credentials"}'
```

Audience will likely look like this: `https://[YOUR_TENANT].[ZONE, e.g. eu].auth0.com/api/v2`

if everything is successful, you will receive a response from Auth0, containing an access token:

```json
{
	"access_token": "abcd1234",
	"token_type": "Bearer"
} 
```

This is the point to make a pause and say that you might instead get various errors. One very common is this:

    Client is not authorized to access \"https://[YOUR_TENANT].eu.auth0.com/api/v2/\"

In simple words, this means that your Auth0 application might not have been attached to the Auth0 Management API. To do so, go to `APIs > Auth0 Management API > Machine to Machine Applications` and see if your application is in the list (add if not), and if the "Authorized" toggle has been turned on.

While you are there, expand the item of your application in this list, and select the grants that you want to give it. My advice is to be on the safe side and choose the minimal number of grants you need. In my case, this would be `read:users` only.

![](/images/2020/05/auth0-permissions.png)

If you don't do so, you might end up getting another error, namely:

    Client has not been granted scopes: read:users

# Obtaining the app metadata

Once we have obtained our access token, [getting the app metadata](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id) out of the available user information is easy:

```bash
curl -H "Authorization: Bearer abcd1234" [https://[YOUR_TENANT].eu.auth0.com/api/v2/users/1234](https://prs.eu.auth0.com/api/v2/users/1234)
```

For reference, [check out the full Management API Docs](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id).