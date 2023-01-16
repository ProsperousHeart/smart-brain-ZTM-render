# Smart Brain Explainer

This code repo is the PROD version of the final project I completed as part of the 40+ hour ZTM Web Developer Bootcamp. (This is an affiliate link, and should you decide to purchase I may receive compensation.)

It is also a mixture of the [template from Render](https://github.com/render-examples/express-hello-world) for their [Node.js](https://nodejs.org/) setup. (This is the [Express](https://expressjs.com) [Hello world](https://expressjs.com/en/starter/hello-world.html) example on [Render](https://render.com) -- which is deployed at [https://express.onrender.com](https://express.onrender.com).)

## Technologies Used

- React
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com)
- PostgreSQL
- bcrypt
- [Clarifai](https://clarifai.com/) (API for [face detection](https://clarifai.com/clarifai/main/models/face-detection))

# Deployment

I followed Render's [documentation for Node deployment](https://render.com/docs/deploy-node-express-app), which included creating a new web service with the following values:
  * Build Command: `yarn`
  * Start Command: `node app.js`

The web service is live on [my Render URL](https://smart-brain-ztm.onrender.com/) when each build finishes.
