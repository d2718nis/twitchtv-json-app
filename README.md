TwitchTV JSON App
==========
TwitchTV JSON app for the [freecodecamp](https://www.freecodecamp.com) challenge.
* Github pages: https://d2718nis.github.io/twitchtv-json-app
* Codepen.io: https://codepen.io/d2718nis/full/yMOJjr

![TwitchTV JSON App](https://d2718nis.github.io/img/portfolio5.png "TwitchTV JSON App")


The task
----------
[Use the Twitchtv JSON API](https://www.freecodecamp.com/challenges/use-the-twitchtv-json-api)

### Objective
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/Myvqmo)

### Rules
* Use whichever libraries or APIs you need

### User stories
* I can see whether Free Code Camp is currently streaming on Twitch.tv
* I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel
* If a Twitch user is currently streaming, I can see additional details about what they are streaming
* I will see a placeholder notification if a streamer has closed their Twitch account (or the account 
  never existed). You can verify this works by adding brunofin and comster404 to your array of Twitch streamers
* I can search through the streams listed

### Hints
* See an example call to Twitch.tv's JSONP API at https://forum.freecodecamp.com/t/use-the-twitchtv-json-api/19541
* The relevant documentation about this API call is here: 
  https://dev.twitch.tv/docs/v5/reference/streams/#get-stream-by-user
* Here's an array of the Twitch.tv usernames of people who regularly stream: 
  ```javascript
  ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", 
  "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
  ```
* Due to a change in conditions on API usage explained 
  [here](https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843) Twitch.tv now requires an 
  API key, but we've built a workaround. Use https://wind-bow.gomix.me/twitch-api instead of twitch's API base 
  URL (i.e. https://api.twitch.tv/kraken ) and you'll still be able to get account information, without needing 
  to sign up for an API key


Built with
----------
* [Twitch Developers](https://dev.twitch.tv) &#8212; the one-stop shop to learn how to build tools and integrations 
  for the leading social video platform for gamers
* [JQuery](https://jquery.com) &#8212; a fast, small, and feature-rich JavaScript library
* [Bootstrap](http://getbootstrap.com) &#8212; the most popular HTML, CSS, and JS framework for developing
  responsive, mobile first projects on the web
* [SASS](http://sass-lang.com) &#8212; the most mature, stable, and powerful professional grade CSS extension
  language in the world
* CSS3
* HTML5


Authors
----------
* **Denis Z.** &#8212; *Initial work* &#8212; [d2718nis](https://github.com/d2718nis)

See also the list of [contributors](https://github.com/d2718nis/twitchtv-json-app/contributors)
who participated in this project.


Acknowledgments
----------
* [Font Awesome](http://fontawesome.io) &#8212; the iconic font and CSS toolkit
* [Google fonts](https://fonts.google.com) &#8212; a great collection of free and easy to use fonts
* [Twitch.tv](https://www.twitch.tv) &#8212; the world’s leading social video platform and community 
  for gamers, video game culture, and the creative arts
* [CSS-tricks](https://css-tricks.com/using-flexbox) &#8212; css-tricks.com flexbox guide
