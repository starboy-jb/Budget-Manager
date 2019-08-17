var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        var val = parseInt(clickData.selectionText);
        if (Number.isInteger(val)) {
            chrome.storage.sync.get(['total', 'limit'], function(budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += budget.total;
                }
                var temp = newTotal;
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({ 'total': newTotal }, function() {
                    if (newTotal >= budget.limit) {
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon128.png',
                            title: 'Your limit has been reached',
                            message: 'Stop, Looks like you have reached yout limit!'
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                        chrome.storage.sync.set({ 'total': temp });
                    } else {
                        chrome.storage.sync.set({ 'total': newTotal });
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName) {
	chrome.browserAction.setBadgeText({'text': changes.total.newValue.toString()});
});