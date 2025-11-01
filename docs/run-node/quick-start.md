---
sidebar_position: 1
---

# Quick Start

## System Requirements

Please see the [system requirements](/docs/run-node/system-requirements) section for details.

## Default Ports to Open on Firewall

| **Port Range**       | **Protocol** | **Purpose**                          | **Notes**                                                                 |
|----------------------|--------------|--------------------------------------|---------------------------------------------------------------------------|
| 8336, 8340           | UDP or TCP   | Network connectivity                | Must be open to join the network.                                        |
| 50000-50003* | UDP or TCP   | Worker processes libp2p communication      | Port range must be opened based on the number of worker processes. |
| 60000-60003* (example for 4 workers) | UDP or TCP   | Worker processes streaming communication      | Port range must be opened based on the number of worker processes. |

*Using an example of 4 workers, 1 port for each, starting from the base port.

:::info

If you're running the node at your home (on a residential ISP), then you must additionally set up [port forwarding](https://portforward.com/router.htm) in order for your node to be reachable by the network.
For this use case, it's recommended to use TCP connection for your node.
This can be achieved by setting `listenMultiaddr` to `/ip4/0.0.0.0/tcp/8336` and `streamListenMultiaddr` to `/ip4/0.0.0.0/tcp/8340` in the [p2p section](/docs/run-node/advanced-configuration#peer-to-peer-networking-section) of the config, and `dataWorkerBaseListenMultiaddr` to `/ip4/0.0.0.0/tcp/%d` (don't omit the `%d`) in the [engine section](/docs/run-node/advanced-configuration#engine-section).

:::

## Node Install

### Recommended Install Method
To install and manage a node, the long-term supported method is to [download and install via qclient](/docs/run-node/qclient/setup#scripted-installation).

Then run:
```bash
sudo qclient node install
```

#### Enabling Node Auto-Updates via QClient
You can enable/disable qclient auto-updates with:
```bash
qclient node auto-update enable
```

:::note
There may be some early-bugs that may cause this method to not work for you, as this method is recently released.

If you have issues, the autorun solution below can be used in the meantime.
:::

### Legacy Release Autorun Script
This is a legacy solution and not actively maintained anymore, but may be used.

The release autorun script automatically downloads the latest `node` binary, runs it, checks for new version in the background and, if found, triggers the update including `node` restart.

Download the script and validate that its content is in line with your expectations:
```bash
wget https://github.com/QuilibriumNetwork/monorepo/blob/release/node/release_autorun.sh
```

Make the script executable:
```bash
chmod +x release_autorun.sh
```

Run the script:
```bash
./release_autorun.sh
```

This script is intended to help get started quickly, but for robust deployments it is recommended to use some service orchestration solution (e.g. `systemd` on Linux).

## Key and Store Backups

In order to access rewards or make token operations for your account, you must maintain your set of keys and it is recommended that you back them up.

Keys are included in a node's configuration file set, and both the `config.yml` and `keys.yml` file should be saved.

Data for each worker should also be backed up, to make restoration faster and avoid penalization.

All of this data will be found in your config folder:

```
/path/to/config/
/path/to/config/keys.yml
/path/to/config/config.yml
/path/to/config/worker-store/[worker-id]/

### QClient Install Data Locations
If you installed via QClient, the the config keysets and worker stores will be found in `~/.quilibrium/configs/[config-name]`

### Auto-run or Manual Install Data Locations

If you followed the instructions in the [Autorun](#autorun) section, this data will be stored in the `ceremonyclient/node/.config` directory. It's recommended to back up this entire directory. 

The `.config/keys.yml` and `.config/config.yml` files contain private keys and should be encrypted in backups. If you back up the entire directory, it's easiest to encrypt the entire backup.




