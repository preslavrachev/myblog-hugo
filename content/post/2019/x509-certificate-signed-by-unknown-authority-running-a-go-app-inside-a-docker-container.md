+++
author = "Preslav Rachev"
categories = []
date = "2019-08-11T07:00:00+00:00"
description = ""
featured_image = ""
slug = ""
tags = ["Docker", "Tips", "Golang"]
title = "X509: Certificate Signed by Unknown Authority (Running a Go App Inside a Docker Container)"

+++
If you ever get the following message:

```bash
x509: certificate signed by unknown authority
```

While running your Go app in a Docker container, there is a chance that you might not have the necessary trusted certificates installed in your Docker container. Assuming that you run your Go apps in lightweight containers, based on [Scratch](https://docs.docker.com/develop/develop-images/baseimages/#create-a-simple-parent-image-using-scratch) or Alpine, you will have to add the certificates yourselves. 

On Alpine, this can be done using the default package installer: 

```docker
RUN apk --no-cache add ca-certificates
```

Since Scratch is not based on a particular distribution you would have to download the certificates manually and add them as part of the build process:

```docker
ADD ca-certificates.crt /etc/ssl/certs/
```

---

## Further Reading

{{<oembed "https://stackoverflow.com/questions/52969195/docker-container-running-golang-http-client-getting-error-certificate-signed-by">}}

{{<oembed "https://medium.com/@chemidy/create-the-smallest-and-secured-golang-docker-image-based-on-scratch-4752223b7324">}}