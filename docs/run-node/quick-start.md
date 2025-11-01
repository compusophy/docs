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

### Legacy Auto-run Install
This is a legacy solution and not actively maintained anymore, but may be used.

It should work, but there are flaws with it.

The release auto-run script will automatically download the latest release binary, run the node and periodically check for new releases. You can run the script as follows:

```bash
git clone --depth 1 --branch release https://github.com/QuilibriumNetwork/ceremonyclient.git
cd ceremonyclient/node
# Inspect the contents of the `release_autorun.sh` script before executing it
./release_autorun.sh
```

This script is intended to help get started quickly, but for robust deployments it is recommended to use some service orchestration solution (e.g. `systemd` on Linux).

## Key and Store Backups

In order to run a node, access rewards or make token operations for your account, you need the node's **keyset** consisting of the `config.yml` and `keys.yml` files. You are strongly advised to maintain copies of these files in encypted backup.

**Worker data** is stored in `worker-store/[worker-id]`. It should also be regularly backed up, to make the node restoration faster (for example, in case of physical server failure) and avoid unnecessary penalties.

Keyset and worker data are stored in your node's `.config` directory:

```
.config/keys.yml
.config/config.yml
.config/worker-store/[worker-id]/
```
:::info
If you installed via `qclient`, your config directory should be in `~/.quilibrium/configs/[config-name]`.

If you used `release_autorun.sh` script, your config directory should be `ceremonyclient/node/.config`.
:::
