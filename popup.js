$(function() {
	
	chrome.storage.sync.get(['total', 'limit'], function(budget) {
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);
	});

	$('#spendAmount').click(function() {
		chrome.storage.sync.get(['total', 'limit'], function(budget) {
			var newTotal = 0;
			if (budget.total) {
				newTotal += parseInt(budget.total);
			}
			var temp = newTotal;
			var amount = $('#amount').val();
			if (amount) {
				newTotal += parseInt(amount);
			}

			chrome.storage.sync.set({'total': newTotal}, function() {
				if (amount && newTotal >= budget.limit) {
					console.log('aur bhai kya haal');
					var notifOptions = {
						type: 'basic',
						iconUrl: 'icon128.png',
						title: 'Your limit has been reached',
						message: 'Stop, Looks like you have reached yout limit!'
					};
					chrome.notifications.create('limitNotif', notifOptions);
					chrome.storage.sync.set({'total': temp});
					$('#total').text(temp);
				}
				else {
					chrome.storage.sync.set({'total': newTotal});
					$('#total').text(newTotal);
				}
			});
			
			$('#amount').val('');
		});
	});
});