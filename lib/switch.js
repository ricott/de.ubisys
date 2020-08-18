'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');

class Switch extends ZigBeeDevice {

	async onNodeInit(zclNode) {
		if (this.hasCapability('onoff')) {
			this.registerCapability('onoff', CLUSTER.ON_OFF, {
				getOpts: {
					pollInterval: 15000,
				},
			});
		}

		//measure_power
		//S1, endpoint #3; S1-R, endpoint #4
		if (this.hasCapability('measure_power')) {
			//Get metering endpoint from device
			let meteringEndpoint = this.getMeteringEndpointId();
			await this.configureAttributeReporting([
				{
					endpointId: meteringEndpoint,
					cluster: CLUSTER.METERING,
					attributeName: 'instantaneousDemand',
					minInterval: 0,
					maxInterval: 60000, //Maximally every ~16 hours
					minChange: 1,
				}
			]);

			zclNode.endpoints[meteringEndpoint].clusters[CLUSTER.METERING.NAME]
				.on('attr.instantaneousDemand', (instantaneousDemand) => {
					let watt = Math.max(instantaneousDemand, 0);
					this.log('watt: ', watt);
					this.setCapabilityValue('measure_power', watt);
				});
		}

		if (this.getSetting("dateCode") != null) {
			let dateCodeObj = await zclNode.endpoints[1].clusters['basic'].readAttributes('dateCode');
			this.setSettings({ dateCode: dateCodeObj.dateCode })
				.catch(err => {
					this.error('failed to update dateCode settings', err);
				});
		}
		
		if (this.getSetting("hwVersion") != null) {
			let hwVersionObj = await zclNode.endpoints[1].clusters['basic'].readAttributes('hwVersion');
			this.setSettings({ hwVersion: hwVersionObj.hwVersion })
				.catch(err => {
					this.error('failed to update hwVersion settings', err);
				});
		}

	}

}

module.exports = Switch;
