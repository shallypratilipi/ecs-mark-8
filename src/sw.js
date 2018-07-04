(function serviceWorker() {

	self.addEventListener('push', (event) => {

		// Currently implemented only for marketing notifications.
		const pratilipi = event.data && event.data.json();

		// Safe check
		if (pratilipi) {
			// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
			const options = {
				badge: 'https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png',
				requireInteraction: true, // Indicates that on devices with sufficiently large screens, a notification should remain active until the user clicks or dismisses it
				body: pratilipi.summary,
				icon: 'https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png', 
				// image: pratilipi.coverImageUrl,
				data: pratilipi // to be passed => notificationclick event
			};
			event.waitUntil(
				self.registration.showNotification(pratilipi.displayTitle, options)
			);
		}

	});


	self.addEventListener('notificationclick', (event) => {
		event.notification.close();
		event.waitUntil(
			clients.openWindow(event.notification.data.pageUrl)
		);
	});

})();
