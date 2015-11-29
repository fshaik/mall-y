var fs = require('fs');
var $ = require('jquery');



var html;

fs.readFile('./zara.html', 'utf8', function(err, data) {
	if(err) {console.log(err);return;}

	var title = $(data).find('img').text();

	console.log(title);
})

console.log(html);

//var title = $(html).find('title').text();

//console.log(title);

//Zara
$('img').each(function(){
	var t = $(this).attr("alt");
	var u = $(this).attr("data-src");
	if(typeof t == typeof String && (typeof u == typeof(String))) {
		console.log(t + u);
		$.post("https://tranquil-falls-5429.herokuapp.com/article", {
		title: t,
		brand: "Zara",
		imgurl: u
		})
	}
	

})

	$.post("localhost://3000/article", {
		title: t,
		brand: "Zara",
		imgurl: u
		})



//Abercrombie and Fitch
var last=".";

$('img').each(function(){
	var t = $(this).attr("alt");
	var u = $(this).attr("src")
	if(last == t ) {
		return;
	}

	
	if(typeof t != typeof undefined && (typeof u != typeof(undefined)) && (t.length && u.length) || (u.indexOf("womens-new-arrivals") > -1)) {
		//console.log(t + u.split('?')[0]);
		$.post("https://tranquil-falls-5429.herokuapp.com/article", {
		title: t,
		brand: "A&F",
		imgurl: u.split('?')[0]
		})


	}

	last = t;

})

//TRUE RELIGION
//var first = true;

$('img').each(function(){

	var c = $(this).attr("class");
	var u = $(this).attr("src");
	var t = $(this).attr("title");
	var r = Math.random();

	if(typeof t != typeof undefined && (typeof u != typeof(undefined)) && (t.length && u.length) /*&& (c.indexOf("firstimage") > -1) && first*/) {
		console.log(u,t,r);

		$.post("https://tranquil-falls-5429.herokuapp.com/article", {
		title: t,
		brand: "TRUE RELIGION",
		imgurl: u,
		rand: r
		})
		
		//first = false;
	}



})



