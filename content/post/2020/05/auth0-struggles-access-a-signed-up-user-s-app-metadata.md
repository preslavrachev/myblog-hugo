+++
author = "Preslav Rachev"
categories = []
date = ""
description = ""
draft = true
feature_image = ""
slug = ""
summary = ""
tags = []
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