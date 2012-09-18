
document.addEventListener('DOMContentLoaded', function () {
  populate_list();
});


function populate_list() {
	var lastLinks = chrome.extension.getBackgroundPage().getLast();

	var input = document.getElementById("list");

	lastLinks.forEach( function ( tab ){
		var item = document.createElement("div");
		item.className = "tab";

		link = document.createElement("a");
		link.href = tab.url;
		link.target = "_blank";

		var img = document.createElement("div");
		img.setAttribute("style", "height:16; width: 16; background-image: url(chrome://favicon/"+link.protocol+"//"+link.hostname + ");");
		img.className = "favicon"

		link.innerText = tab.title;

		var host = document.createElement("div");
		host.innerText = link.hostname;
		host.className = "host";
		item.appendChild(img);
		item.appendChild(link);
		item.appendChild(host);

		input.appendChild(item);
	});
}