'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER } = require('zigbee-clusters');

class Switch2 extends ZigBeeDevice {

	async onNodeInit(zclNode) {
		//Application Endpoint #1 – On/off Output #1
		//Application Endpoint #2 – On/off Output #2
		if (this.hasCapability('onoff')) {
			this.registerCapability('onoff', CLUSTER.ON_OFF, {
				getOpts: {
					pollInterval: 15000,
				},
			});
		}
		/*
2020-08-18 11:51:43 [err] [ManagerDrivers] [S2_5502] [0] Error: failed to set cluster capability value (capability: onoff.S2, cluster: onOff, value: true) TypeError: set_parser_is_not_a_function
    at S2_5502.setClusterCapabilityValue (/node_modules/homey-zigbeedriver/lib/ZigBeeDevice.js:781:48)
    at /node_modules/homey-zigbeedriver/lib/ZigBeeDevice.js:1110:19
    at S2_5502._onSetCapabilityValue (/opt/homey-client/node_modules/homey-apps-sdk-v3/lib/Device.js:121:11)
    at Driver._onDeviceSetCapabilityValue (/opt/homey-client/node_modules/homey-apps-sdk-v3/lib/Driver.js:101:27)
    at ManagerDrivers._onDeviceSetCapabilityValue (/opt/homey-client/node_modules/homey-apps-sdk-v3/manager/drivers.js:145:19)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)

		if (this.hasCapability('onoff.S2')) {

			this.registerCapability('onoff.S2', CLUSTER.ON_OFF, {
				endpoint: 2,
				getOpts: {
					pollInterval: 15000,
				},
			});
		}
		*/

		// measure_power
/*
2020-08-18 11:55:34 [err] [ManagerDrivers] [S2_5502] [0] Error: could not initialize node TypeError: Cannot read property '5' of undefined
    at S2_5502.onNodeInit (/lib/switch2.js:54:21)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async /node_modules/homey-zigbeedriver/lib/ZigBeeDevice.js:933:9
*/
/*
		if (this.hasCapability('measure_power')) {
			//S2, S2-R, endpoint #5
			let meteringEndpoint = 5;
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
*/

/*
2020-08-18 12:00:07 [err] [ManagerDrivers] [S2_5502] [0] Error: could not initialize node TypeError: Cannot read property '1' of undefined
    at S2_5502.onNodeInit (/lib/switch2.js:70:45)
    at /node_modules/homey-zigbeedriver/lib/ZigBeeDevice.js:933:20
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
 */
/*
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
*/
	}
}

module.exports = Switch2;
