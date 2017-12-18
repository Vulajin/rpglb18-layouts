(function () {
	'use strict';

	const canPlayTwitchAd = nodecg.Replicant('twitch:canPlayAd');
	const timeLeft = nodecg.Replicant('twitch:timeLeftInAd');
	const timeSince = nodecg.Replicant('twitch:timeSinceLastAd');

	class DashHostTwitchAds extends Polymer.Element {
		static get is() {
			return 'dash-host-twitch-ads';
		}

		static get properties() {
			return {
				canPlay: {
					type: Boolean,
					value: false
				},
				cantPlayReason: {
					type: String,
					value: ''
				},
				timeLeft: {
					type: String,
					value: '8:88'
				},
				timeSince: {
					type: String,
					value: '8:88:88'
				}
			};
		}

		ready() {
			super.ready();

			canPlayTwitchAd.on('change', newVal => {
				this.canPlay = newVal.canPlay;
				this.cantPlayReason = newVal.reason;
			});

			timeLeft.on('change', newVal => {
				this.timeLeft = newVal.formatted.split('.')[0];
			});

			timeSince.on('change', newVal => {
				this.timeSince = newVal.formatted.split('.')[0];
			});
		}

		play() {
			this.$.confirmDialog.open();
		}

		_handleConfirmDialogClosed(e) {
			if (e.detail.confirmed === true) {
				const duration = parseInt(this.$.listbox.selectedItem.getAttribute('data-value'), 10);
				nodecg.sendMessage('twitch:playAd', duration);
			}
		}

		_calcPlayButtonLabel(canPlay, cantPlayReason) {
			if (canPlay) {
				return 'Play Twitch Ad';
			}

			return cantPlayReason;
		}
	}

	customElements.define(DashHostTwitchAds.is, DashHostTwitchAds);
})();
