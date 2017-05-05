// Represents all info about channels
channelsObject = [];

// ==================== ====================
const apiBaseUrl = 'https://wind-bow.glitch.me/twitch-api';

// Request info about channels
function requestTwitchChannel(channelName) {
	return new Promise(function(resolve, reject) {
		const getTwichChannel = $.getJSON(apiBaseUrl + '/channels/' + channelName);
		getTwichChannel.then(function(channelJson) {
			// No such a channel
			if (channelJson.hasOwnProperty('error')) {
				channelsObject.push({'name': channelName,
					'status': 'notExist',
					'json': channelJson});
				resolve();
			// There is a channel
			} else {
				const streamPromise = requestTwitchStream(channelName);
				streamPromise.then(function(streamJson) {
					if (streamJson.stream === null) {
						// No stream right now
						channelsObject.push({'name': channelName,
							'status': 'offline',
							'json': channelJson});
						resolve();
					} else {
						// Channel is LIVE now
						channelsObject.push({'name': channelName,
							'status': 'live',
							'json': streamJson});
						resolve();
					}
				});
				streamPromise.catch(function(err) {
					console.log('requestTwitchStream: ' + JSON.stringify(err));
				});
			}
		});
		getTwichChannel.catch(function(err) {
			reject(err);
		});
	});
}

// Request if there is a stream for this channel
function requestTwitchStream(channel) {
	return new Promise(function(resolve, reject) {
		const getTwitchStream = $.getJSON(apiBaseUrl + '/streams/' + channel);

		getTwitchStream.then(function(json) {
			resolve(json);
		});

		getTwitchStream.catch(function(err) {
			reject(err);
		});
	});
}



// ==================== ====================
var menuBar = [$('.menu-all'), $('.menu-live'), $('.menu-offline')];

function trimLongDescription(str) {
	return str.length > 26 ? str.substr(0, 22) + '...' : str;
}

// Display all LIVE channels
function displayChannelsLive() {
	$.each(channelsObject, function(i, item) {
		if (item.status == 'live') {
			item.menuFilter = 1;
			item.searchFilter = 1;
			item.element = $(`
			<a href="https://twitch.tv/${item.json.stream.channel.display_name}" target="_blank">
				<div class="col-xs-12 col-sm-6 col-md-4 channel-item">
					<div class="channel-stream">
						<img class="img-responsive" src="${item.json.stream.preview.large}" alt="${item.json.stream.game}">
					</div>
					<div class="channel-info">
						<div class="channel-logo">
							<img class="img-responsive logo-img" src="${item.json.stream.channel.logo===null?'img/404_user_100x100.png':item.json.stream.channel.logo}" alt="${item.json.stream.channel.display_name}">
						</div>
						<div class="channel-text">
							<span class="channel-name">${item.json.stream.channel.display_name}</span>
							<br>
							<span class="channel-description">
								Live: ${trimLongDescription(item.json.stream.game)}<br>
								Viewers: ${item.json.stream.viewers}
							</span>
						</div>
					</div>
				</div>
			</a>
			`).appendTo('.channels-live');
		}
	});
}
// Display all OFFLINE channels
function displayChannelsOffline() {
	$.each(channelsObject, function(i, item) {
		if (item.status == 'offline') {
			item.menuFilter = 1;
			item.searchFilter = 1;
			item.element = $(`
				<a href="https://twitch.tv/${item.json.display_name}" target="_blank">
					<div class="col-xs-12 col-sm-6 col-md-4 channel-item">
						<div class="channel-info">
							<div class="channel-logo">
								<img class="img-responsive logo-img" src="${item.json.logo===null?'img/404_user_100x100.png':item.json.logo}" alt="${item.json.display_name}">
							</div>
							<div class="channel-text">
								<span class="channel-name">${item.json.display_name}</span>
								<br>
								<span class="channel-description">
									Views: ${item.json.views}<br>
									Followers: ${item.json.followers}
								</span>
							</div>
						</div>
					</div>
				</a>
				`).appendTo('.channels-offline');
		}
	});
}
// Display all NOT EXIST channels
function displayChannelsNotExist() {
	$.each(channelsObject, function(i, item) {
		if (item.status == 'notExist') {
			item.menuFilter = 1;
			item.searchFilter = 1;
			item.element = $(`
				<div class="col-xs-12 col-sm-6 col-md-4 channel-item-disabled">
					<div class="channel-info">
						<div class="channel-logo">
							<img class="img-responsive logo-img" src="img/dead_glitch.png" alt="User not exist">
						</div>
						<div class="channel-text">
							<span class="channel-name">${item.name}</span>
							<br>
							<span class="channel-description">User doesn't exist</span>
						</div>
					</div>
				</div>
				`).appendTo('.channels-notExist');
		}
	});
}



// ==================== ====================
$(document).ready(function() {
	const channelsList = ['ESL_SC2', 'OgamingSC2',
		'cretetion', 'freecodecamp', 'storbeck', 'comster404',
		'habathcx', 'RobotCaleb', 'noobs2ninjas', 'monstercat',
		'streamerhouse', 'ninety9lives', 'nocopyrightsounds',
		'warcraft', 'geekandsundry', 'magic', 'bethesda'];

	// Request all info
	$.each(channelsList, function(i, item) {
		let channelPromise = requestTwitchChannel(item);
		channelPromise.then(function() {
			if (channelsList.length == channelsObject.length) {
				displayChannelsLive();
				displayChannelsOffline();
				displayChannelsNotExist();
				reDraw();
			}
		});
		channelPromise.catch(function(err) {
			console.log('ReqChannel: ' + JSON.stringify(err));
		});
	});

	// Search input events
	$('.search-container input').keyup(function(event) {
		if ($('.search-container input').val().length > 0) {
			$.each(channelsObject, function(i, item) {
				// Filter by search input
				if (RegExp($('.search-container input').val(), 'ig').test(item.name)) {
					item.searchFilter = 1;
				} else {
					item.searchFilter = 0;
				}
			});
		} else {
			$.each(channelsObject, function(i, item) {
				item.searchFilter = 1;
			});
		}
		reDraw();
	});

	// Sort ALL, LIVE, OFFLINE
	$('.header-menu>li').on('click', function() {
		// CSS purposes
		$('.header-menu>li').removeClass('menu-active');
		$(this).addClass('menu-active');

		if ($(this).hasClass('menu-all')) {
			$.each(channelsObject, function(i, item) {
				item.menuFilter = 1;
			});
		} else if ($(this).hasClass('menu-live')) {
			$.each(channelsObject, function(i, item) {
				if (item.status == 'live') {
					item.menuFilter = 1;
				} else {
					item.menuFilter = 0;
				}
			});
		} else if ($(this).hasClass('menu-offline')) {
			$.each(channelsObject, function(i, item) {
				if (item.status == 'offline') {
					item.menuFilter = 1;
				} else {
					item.menuFilter = 0;
				}
			});
		}
		reDraw();
	})

	function reDraw() {
		let showSections = {'live': 0, 'offline': 0, 'notExist': 0};
		$.each(channelsObject, function(i, item) {
			if (item.menuFilter * item.searchFilter != 0) {
				item.element.css('display', 'block');
				if (item.status == 'live') {
					showSections.live = 1;
				} else if (item.status == 'offline') {
					showSections.offline = 1;
				} else if (item.status == 'notExist') {
					showSections.notExist = 1;
				}
			} else {
				item.element.css('display', 'none');
			}
		});
		$.each(showSections, function(i, item) {
			if (item == 0) {
				$(`.channels-${i}-header`).css('display', 'none');
			} else {
				$(`.channels-${i}-header`).css('display', 'block');
			}
		});
	}

	// Easter egg
	$('.app-title').on('click', function() {
		if ($('.app-title').text() != 'code different') {
			$('.app-title').text('code different');
		} else {
			$('.app-title').text('twitchster');
		}
	});
});
