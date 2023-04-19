const handleAPICall = (req, res) => {    //////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    /////////////////////////////////////////////////////////////////////////////////////////

    const USER_ID = process.env.clarifai_user_id;
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = process.env.clarifai_pat;
    const APP_ID = 'face-recog-app';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    //const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
    //const IMAGE_URL = this.state.imgURL;
    const IMAGE_URL = req.body.input;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT // https://docs.clarifai.com/clarifai-basics/authentication/personal-access-tokens/
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    // https://clarifai.com/clarifai/main/models/face-detection
    //fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json()) // originally provided
        .then(data => {
            // console.log("API return", data);
            res.status(200).json(data.outputs[0].data.regions)
        })
        .catch(err => res.status(400).json("Unable to work with API"))
}

const handleIMG = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.status(200).json(entries[0].entries)
        })
        .catch(err => res.status(400).json('Unable to get count'))
}

module.exports = {
    handleIMG,
    handleAPICall
};