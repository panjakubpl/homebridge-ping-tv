const ping = require('ping');

let Accessory, Service, Characteristic, Categories;

module.exports = (api) => {
  Accessory = api.platformAccessory;
  Service = api.hap.Service;
  Characteristic = api.hap.Characteristic;
  Categories = api.hap.Categories;

  api.registerAccessory('homebridge-ping-tv', 'PingTV', PingTVAccessory);
}

class PingTVAccessory {
  constructor(log, config) {
    this.log = log;
    this.config = config;
    this.name = config.name;
    this.ipAddress = config.ipAddress;
    this.pingInterval = config.pingInterval || 5000; // default value 5s
    this.category = Categories[config.category] || Categories.TELEVISION;

    this.service = new Service.Television(this.name, 'Television');
    this.setupAccessoryInformation();
    this.setupTelevisionService();

    this.checkDeviceStatus();
  }

  setupAccessoryInformation() {
    this.informationService = new Service.AccessoryInformation()
      .setCharacteristic(Characteristic.Manufacturer, "Custom Manufacturer")
      .setCharacteristic(Characteristic.Model, "Custom Model")
      .setCharacteristic(Characteristic.SerialNumber, "Custom Serial Number");
  }

  setupTelevisionService() {
    this.service.setCharacteristic(Characteristic.ConfiguredName, this.name);
    this.service.setCharacteristic(Characteristic.SleepDiscoveryMode, Characteristic.SleepDiscoveryMode.ALWAYS_DISCOVERABLE);
    this.service.getCharacteristic(Characteristic.Active)
      .on('get', this.getActiveState.bind(this));
  }

        checkDeviceStatus() {
            setInterval(() => {
                ping.sys.probe(this.ipAddress, (isAlive) => {
                    const status = isAlive ? Characteristic.Active.ACTIVE : Characteristic.Active.INACTIVE;
                    this.service.updateCharacteristic(Characteristic.Active, status);
                    this.log(`Pinging IP Address ${this.ipAddress}: Device is ${isAlive ? 'active' : 'inactive'}.`);
                });
            }, this.pingInterval);
        }

  getActiveState(callback) {
    ping.sys.probe(this.ipAddress, (isAlive) => {
      const status = isAlive ? Characteristic.Active.ACTIVE : Characteristic.Active.INACTIVE;
      callback(null, status);
    });
  }

  getServices() {
    return [this.informationService, this.service];
  }
}
