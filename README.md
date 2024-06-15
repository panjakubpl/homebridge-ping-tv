# Homebridge Ping TV

## Overview
Homebridge Ping TV is a plugin for Homebridge that allows you to monitor the status of your IP TV using ping. This plugin adds an accessory to your Homebridge setup, which checks the connectivity of your TV through its IP address.

## Features
- **Simple Setup**: Easily configure the plugin with the IP address of your TV.
- **Real-time Monitoring**: Get the real-time status of your TV by pinging its IP address.

## Installation

### 1. Install Homebridge
If you haven't installed Homebridge yet, follow the [Homebridge installation guide](https://github.com/homebridge/homebridge/wiki).

### 2. Install the Plugin
Install the Homebridge Ping TV plugin using npm:

```sh
npm install -g homebridge-ping-tv
```

### 3. Configure the Plugin
Add the plugin to your Homebridge config.json file:

```sh
{
  "accessories": [
    {
      "accessory": "PingTV",
      "name": "Living Room TV",
      "ipAddress": "192.168.1.100"
    }
  ]
}
```

Explanation:
* accessory: (Required) Must be PingTV.
* name: (Required) Name of the TV accessory.
* ipAddress: (Required) IP address of your TV.

Here is an example configuration:

```sh
{
  "accessories": [
    {
      "accessory": "PingTV",
      "name": "Bedroom TV",
      "ipAddress": "192.168.1.101"
    },
    {
      "accessory": "PingTV",
      "name": "Kitchen TV",
      "ipAddress": "192.168.1.102"
    }
  ]
}
```

### Contributing
Feel free to submit issues or pull requests.

### License
This project is licensed under the ISC License.
