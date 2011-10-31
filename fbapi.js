(function() {
    var e = document.createElement('script'); e.async = true;
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
        }());
	window.fbAsyncInit = function() {
		FB.init({ appId: '282411225115122', 
		  status: true, 
		  cookie: true,
		  xfbml: true,
		  oauth: true});
	
		  FB.Event.subscribe('auth.statusChange', handleStatusChange);  
		};
	function handleStatusChange(response) {
	   document.body.className = response.authResponse ? 'connected' : 'not_connected';
	
	   if (response.authResponse) {
		 console.log(response);
		 updateUserInfo(response);
	   }
	 }
function updateUserInfo(response) {
	FB.api('/me', function(response) {
	document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
	});
}
function loginUser() {    
	 FB.login(function(response) { }, {scope:'email'});     
}
function getUserFriends() {
	FB.api('/me/friends&fields=name,picture', function(response) {
	 console.log('Got friends: ', response);
	
	 if (!response.error) {
	   var markup = '';
	
	   var friends = response.data;
	
	   for (var i=0; i < friends.length && i < 20; i++) {
		 var friend = friends[i];
	
		 markup += '<img src="' + friend.picture + '"> ' + '<a href="#" onClick="getMutualFriends(' +friend.id + ')">' + friend.name + '</a> <br>';
	 
	   }
	
	   document.getElementById('user-friends').innerHTML = markup;
	 }
	});
}
function getMutualFriends(id) {
	FB.api('/me/mutualfriends/' + id, function(response) {
		alert('You have ' + response.data.length + ' mutual friends in common. Cool eh!?');
	});	
	
}