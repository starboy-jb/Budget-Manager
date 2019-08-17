$(function() {
    chrome.storage.sync.get(['limit'], function(budget) {
        $('#limit').val(budget.limit);
    });
    $('#saveLimit').click(function() {
        var limit = $('#limit').val();
        chrome.storage.sync.set({ 'limit': limit }, function() {
            close();
        });
    });
    $('#resetTotal').click(function() {
        chrome.storage.sync.set({ 'total': 0 });
        var notifOptions = {
            type: 'basic',
            iconUrl: 'icon128.png',
            title: 'Reset Total',
            message: 'Total amout spend is set to be zero!'
        };
        chrome.notifications.create('limitNotif', notifOptions);
    });
});