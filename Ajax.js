var request	=	require('request');
function get(e,i){
	i = i||1;
	//gotta get rid of this later
	//Get rid of the self signed error 
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	request({
		url:e.url,
		headers: {
			'User-Agent': 'HUB Robot',
			'Authorization': 'token cbd4b615c60d0f4d29892b088e4bfe9e36334c2f'
		}
	}, function(error, response, body) {
		if (response==undefined || error || response.statusCode !== 200) {
				console.log('Problem in AJAX scraper');
				console.log('DEBUG URL: '+e.url);
				console.log('DEBUG ERROR: '+error);
				if(i){
					setTimeout(function(){
						get(e,0);
					},10000)
				}
				return;
		}
		if(e.json){
			try{
				var body	=	JSON.parse(body);
				e.done&&e.done(body);
			}catch(err){
				console.log(err);
				setTimeout(function(){
					_.get(e);
				},10000)
			}
		}else{
			e.done&&e.done(body);
		}
	});
	
	
}

module.exports	=	{get:get};