# [Personal Portfolio](https://florianformentini.fr)

- Made with [Hugo](https://gohugo.io)
- Theme : Custom [Toha](https://github.com/hugo-toha/toha) **v3.5.0**
  - [Changes](/themes/README.md)
- Deployed on [LWS](https://www.lws.fr/)


A Github action for automatic deployment has been set up. The site is built with the `hugo --minify` command then the files in the `public` folder are sent to the server using FTP. 

Some files that are not in the public folder also need to be transferred but are not handled by the automatic deployment:
  - `.well-known`: Brave Creators files, no modification needed. Sent only on the first deploy.
  - `.htaccess`: If modified, this file must be transferred manually to the server by FTP.

