---
sidebar_position: 1
---

# Quick Start

## System Requirements

Please see the [system requirements](/docs/run-node/system-requirements) section for details.

## User Setup and Permissions

For security best practices, we recommend creating a dedicated user for running the node rather than using root. This limits potential damage if the node software is compromised.

### Recommended: Dedicated User (More Secure)

Create a dedicated `quilibrium` user:

```bash
# Create dedicated quilibrium user
sudo adduser --system --group --home /var/lib/quilibrium quilibrium
```

Then run all node commands as that user:
```bash
# Switch to quilibrium user
sudo -u quilibrium bash

# Now install the node
qclient node install
```

### Alternative: Root User (Less Secure)

You can run as root, but be aware this increases security risk. If you choose this approach, use `sudo` for installation commands:

```bash
sudo qclient node install
```

:::warning Security Notice
Running as root means any vulnerability in the node software could compromise your entire system. The dedicated user approach is strongly recommended for production nodes.
:::

**Where keys are stored:**
- Dedicated user: `/var/lib/quilibrium/.quilibrium/configs/`
- Root user: `/root/.quilibrium/configs/`
- Regular user: `/home/<username>/.quilibrium/configs/`

## Default Ports to Open on Firewall

| **Port Range**       | **Protocol** | **Purpose**                          | **Notes**                                                                 |
|----------------------|--------------|--------------------------------------|---------------------------------------------------------------------------|
| 8336           | QUIC/UDP or TCP   | Master process p2p communication |                                         |
| 8340           | TCP   | Master process streaming communication  |                                        |
| 50000-50003* | QUIC/UDP or TCP   | Worker processes p2p communication      | Port range must be opened based on the number of worker processes. |
| 60000-60003* | TCP   | Worker processes streaming communication      | Port range must be opened based on the number of worker processes. |

*Using an example of 4 workers, 1 port for each, starting from the base port.

:::info

If you're running the node at your home (on a residential ISP), then you must additionally set up [port forwarding](https://portforward.com/router.htm) in order for your node to be reachable by the network.
For this use case, it's recommended to use TCP connection for your node.
This can be achieved by setting `listenMultiaddr` to `/ip4/0.0.0.0/tcp/8336` and `streamListenMultiaddr` to `/ip4/0.0.0.0/tcp/8340` in the [p2p section](/docs/run-node/advanced-configuration#peer-to-peer-networking-section) of the config, and `dataWorkerBaseListenMultiaddr` to `/ip4/0.0.0.0/tcp/%d` (don't omit the `%d`) in the [engine section](/docs/run-node/advanced-configuration#engine-section).

:::

## IP Address Ranges to Block with Firewall on a Hosted Server

Hosting providers commonly provide a public IP address while expecting the software running on your server to address other communication endpoints via public IP addresses. Any attempts to communicate with private address ranges are typically interpreted by the hosting provider as a network attack with the warnings being sent to the server operator and, if not corrected quickly, with the server network being suspended.
Properly configured servers running nodes behind NAT can start with a private IP address but will quickly learn their public IP with the peer assistance and start broadcasting it instead of the initial private IP address.
However, mis-configured nodes that cannot communicate with peers may end up broadcating private IP while provoking other nodes connecting to private IP address ranges.
To prevent connection attempts to the private IP ranges, the following firewalls rules can be added on Linux with `ufw` utility: 

```bash
# Block RFC1918 private address ranges
ufw deny out to 10.0.0.0/8
ufw deny out to 172.16.0.0/12
ufw deny out to 192.168.0.0/16

# Block multicast
ufw deny out to 224.0.0.0/4

# Block broadcast
ufw deny out to 255.255.255.255
```

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

For detailed information on managing your node service, see [Run Node via Node Service](/docs/run-node/qclient/node/run-node-via-node-service).

### Legacy Release Autorun Script (Obsolete)

:::danger Obsolete Method
This is an obsolete node provisioning method and should only be used if you cannot use qclient. New operators should use the qclient method above.

If you're using this obsolete method, consider [migrating to qclient](/docs/run-node/qclient/node/install).
:::

<details>
<summary>Click to expand legacy autorun instructions</summary>

The release autorun script automatically downloads the latest `node` binary, runs it, checks for new version in the background and, if found, triggers the update including `node` restart.

Create the node directory:

```bash
mkdir -p ceremonyclient/node && cd ceremonyclient/node
```

Download the release autorun script and validate that its content is in line with your expectations:
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

For systemd service configuration with this legacy method, see [Legacy Manual Configuration](/docs/run-node/linux_configuration).

</details>

## Key and Store Backups

In order to run a node, access rewards or make token operations for your account, you need the node's **keyset** consisting of the `config.yml` and `keys.yml` files. You are strongly advised to maintain copies of these files in an encrypted backup.

**Worker data** is stored in `worker-store/[worker-id]`. It should also be regularly backed up, to make the node restoration faster (for example, in case of physical server failure) and avoid unnecessary penalties.

If this worker data is lost, it can be restored by running the node which will fetch the data from it's shard peers, but will result in missed rewards and penalties if the worker data is not restored in time.

Keyset and worker data are stored in your node's `.config` directory:

```text
.config/keys.yml
.config/config.yml
.config/worker-store/[worker-id]/
```
:::info
If you installed via `qclient`, your config directory should be in `~/.quilibrium/configs/[config-name]`.

If you used `release_autorun.sh` script, your config directory should be `ceremonyclient/node/.config`.
:::
