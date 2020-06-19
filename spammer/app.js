const fetch=require('node-fetch'),
	fs=require('fs'),
	rl=require('serverline'),
	colors=require('colors');
var config=JSON.parse(fs.readFileSync('config.json','utf8')), // config with our set interval
	url='https://devices.lsmdm.com/log/activity', // url to make POST request to
	genInfo=(()=>{ // function for stuff
		var info={email:'', udid:'', gps:[]}; // base info
		
		info.email=config.names[Math.floor(Math.random()*config.names.length)]+'@'+config.domains[Math.floor(Math.random()*config.domains.length)]; // random email from array
		info.udid='chrome:'+info.email;
		// 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c)=>{var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16)}); // random udid
		info.gps=[(Math.random() * (180 - -180) + -180).toFixed(3)*1,(Math.random() * (180 - -180) + -180).toFixed(3)*1]; // random gps info with math.random
		return info; // return our cool array
	});

setInterval(async()=>{
	var data=genInfo(),body="info[platform]=chromeTracker&info[email]="+data['email']+"&info[udid]="+data['udid']+"&info[gps]=["+data['gps']+"]&info[phrases]=1",
		res=await fetch(url, { method: 'POST', body: body, headers: {'content-type':'application/x-www-form-urlencoded'} }),statusCode=res.status.toString();
	switch(statusCode.substr(0,2)+'x'){
		case '20x': statusCode=statusCode.black.bgGreen; break
		case '40x': statusCode=statusCode.black.bgRed; break
		default: break
	}
	console.log(`STATUS: ${statusCode}, UDID: ${data['udid']}, BODY: ${body}`);
},config.interval); // repeat every something milliseconds as defined in config

rl.init(); // initalize good commandline thing
rl.setPrompt('> '); // kinky >
rl.on('line', function(line) {
	var args=line.split(' '), // arguments for commands
		mts=line.substr(args[0].length+1,128); // command stuffs
	switch(args[0]){
		case'run': // debugging
			try{console.log(util.format(eval(mts)))}
			catch(err){console.log(util.format(err))};
			break
		case'stop':case'exit': // quick escape
			process.exit(0); // when isp go mad
			break
		default:
			if(!args[0])return; // if slap enter key
			console.log(`app: ${args[0]}: command not found`);
			break
	}
});
rl.on('SIGINT',(rl)=>process.exit(0)); // ctrl+c quick exit