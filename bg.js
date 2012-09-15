var accessTimes = {};
var OLD_AGE = 60000*60*4; //60000 * 60 * 2; // two hours
var GC_INTERVAL = 60000;
var UPDATE_INTERVAL = 60000;

// load conf
function loadConfig(){
    var conf_age = localStorage["old_age_mins"];
    if (conf_age) {
        OLD_AGE = conf_age * 60000;
    }
}

// update access time of a tab
function updateAccess( tabId ) {
    accessTimes[tabId] = new Date();
}


// load config at startup
loadConfig();

// update time of all tabs on startup
chrome.tabs.query( {}, function( tabs ) {
    for (var i in tabs) {
        var tab = tabs[i];
        updateAccess(tab.id);
    }
});



// handle new tab event
chrome.tabs.onCreated.addListener( function( tab ) {
    updateAccess(tab.id);
});

// handle active tab event
chrome.tabs.onActivated.addListener( function( activeInfo ) {
    updateAccess(activeInfo.tabId);
});

// handle tab removal event
chrome.tabs.onRemoved.addListener( function( tabId, removeInfo ) {
   delete accessTimes[tabId];
});


// close all old inactive and unpinned tabs 
function garbageCollect() {
    // remove
    for (var tabIdStr in accessTimes) {
        var tabId = parseInt(tabIdStr,10);
        var accessTime = accessTimes[tabId];
        var now = new Date();

        if ( (now - accessTime) >= OLD_AGE ) {  
            chrome.tabs.get(tabId, function(tab) {
                if (!tab.pinned && !tab.active) {
                    chrome.tabs.remove([tab.id]);
                }
            });
        }
    }
}

// update access time for active tab
function updateActive() {
    chrome.tabs.query( {active: true}, function callback(tabs) {
        for (var i in tabs) {
            var tab = tabs[i];
            updateAccess( tab.id );
        }
    });
}



setInterval( garbageCollect, GC_INTERVAL );
setInterval( updateActive, UPDATE_INTERVAL );

