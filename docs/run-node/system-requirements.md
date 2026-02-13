---
sidebar_position: 1
---

# System Requirements

## Supported Operating Systems

| Operating System | Architecture |
|------------------|--------------|
| Linux            | ARM, x86      |
| MacOS            | ARM           |
| Windows          | Not Supported* |

* You may use WSL to run a node on Windows.

## Minimum Hardware Requirements

The following requirements is for a single node.

Note that this is may be split up across multiple servers with a minimum of one core for the node process, if you are clustering (which is an advanced technique not suited for beginners, read [Advanced Node Management](/docs/run-node/advanced-node-management) for more details).

Signed pre-built binaries (the node software) for a Quilibrium node is designed to run on the above supported operating systems that meets the following requirements (assuming dedicated resources for the node):


| Component | Minimum Requirements |
|-----------|----------------------|
| CPU       | At least 4 logical cores |
| RAM       | 2 GB/core                |
| SSD       | 4 GB free space/core     |

A logical core is also known as a hyperthread (or individual core if not hyperthreaded) or vCPU on virtual machines.

It should be noted that you will need sufficient RAM and storage to avoid running out of memory and disk space while running the node and should scale your hardware evenly when you upgrade components or cores used. For example:
 - if you have 4 cores, you should aim to have at least 8GB of RAM
 - if you have 8 cores, you should aim to have at least 16GB of RAM, etc.

The general rule of thumb is: 1CPU to 2GB Ram to 4GB of storage.

As network features evolve, support for ASICs, GPUs, FPGAs, or even quantum computing may emerge, requiring case-by-case testing to optimize performance.

### Storage
Storage may vary depend on if the node will be used to store data or if it will be a compute-only node. Many people currently opt for 1TB as a default, but this is not strictly required if on a budget.

### Hyperthreading
Performance may vary when using hyperthreading and may not be suitable for running the node, a node runner should evaluate on a case-by-case basis to determine this for their own setup by clocking proof start->completion times for each configuration.

### Graphics Cards (GPUs)
GPUs are not well suited to run the base software of the node and not natively supported at this time. Running hardware that has an integrated or dedicated GPU will not impact performance positively or negatively as it is ignored completely.

## Limiting Workers for Hardware Constraints

If your hardware is constrained by RAM, CPU cores, or storage, you may need to manually limit the number of worker processes your node runs. By default, the node will attempt to use all available cores, which can lead to memory exhaustion or disk space issues.

### When to Limit Workers

You should consider limiting workers if:
- You see memory warnings in your node logs
- Your system is running out of RAM or disk space
- You want to reserve resources for other applications
- You're testing with minimal hardware

### How to Calculate Worker Limits

Using the **1 CPU core : 2 GB RAM : 4 GB storage** ratio, calculate your maximum workers based on your most constrained resource:

**Examples:**
- **8 GB RAM available** → 8 GB ÷ 2 GB per worker = **4 workers maximum**
- **4 CPU cores available** → 4 cores ÷ 1 core per worker = **4 workers maximum**
- **20 GB storage available** → 20 GB ÷ 4 GB per worker = **5 workers maximum**

Choose the **lowest** number from your calculations.

### Setting Worker Count

To manually set the number of workers, edit your `config.yml` file (located in `.config/config.yml` or `~/.quilibrium/configs/[config-name]/config.yml` if using qclient):

```yaml
engine:
  dataWorkerCount: 4  # Set to your calculated worker limit
```

After editing, restart your node for the changes to take effect.

:::tip
If you're unsure about your current worker count, check your node logs during startup - it will show how many workers are being spawned.
:::

For more details on the `engine` section configuration, see [Advanced Configuration](/docs/run-node/advanced-configuration#engine-section).

## Hardware Selection

The minimum hardware requirements above are just a bare-minimum.

Any node that uses just the minimum will find that rewards are minimal. Using minimums may be useful for setting up a local testnet for application and/or protocol development, testing, for experimentation purposes, or just for fun.

You can increase your rewards by using larger CPUs or VDS plans with more cores (and the sufficient amount of RAM for each core), as well as finding hardware combinations that perform better at high-performance CPU workloads.


### Renting vs Owning

Many people use VDS's or rent servers from service providers, however it should be noted that this may not be the best long-term strategy as it generally is more cost-prohibitive than purchasing hardware and using co-location services.

Using VPS services to run a node is not recommended at all due to poor performance and many service providers throttle your hardware either due to other shared software and how performance intense Node resource usage can be.

VDS's offer better performance, but often are price prohibitive than renting bare-metal (dedicated hardware for rent) or outright purchasing your own hardware.

Some bare-metal providers (for renting entire servers) offer low prices, but often are kept secret due to competitive reasons, so some amount of leg-work to find suitable price-points is needed. Also, cheaper is rarely better in terms of reliability and node runners who choose to engage in bottom-dollar dealers may find themselves scammed, poor customer service, and/or poorly configured servers.

Owning requires you to use your own network connection(s) or to utilize co-location services to host your server.  Not all service providers are the same.

Owning also requires more hands-on work to maintain, run, and configure/set up.

There are trade-offs to both approaches and many may find themselves starting with renting for ease of starting and eventually migrating to owning as they are more comfortable.

It would be a viable strategy to test node performance on rented servers before committing to purchasing.

### Clock Speeds
Higher clock-speed CPUs are generally faster for the node software, and more modern CPUs may have additional features that can improve performance.

More cores may not always produce better results, especially when considering older hardware, but generally when comparing two servers with similar architecture and clock-speed, you will get better overall performance with more cores.

More cores also means that there is more heat, which may lead to throttling of hardware, lowering performance.

For example, when looking at comparable price point and ages of CPUs between Intel and AMD, it has been found that AMD CPUs have historically provided better performance for Quilibrium nodes and ARM CPUs, albeit rarer for high-core count servers and more expensive for those that do exist, have been found to perform more efficiently than AMD or Intel with similar specs.

Another example would be using older Xeons with high core counts that cannot leverage all the cores due to the slow speeds of the processor.

When a node must provide a computation, it needs to submit it's proofs in a relatively short period of time and when using more cores on the same unit, by default it will use as many cores as possible and throttle, slowing down the overall performance.  This results in needing to manually set the node to use less than all the provided cores to reduce this impact.

With the above in mind, some hardware may not even be able to fulfill this computation speed requirement even using the minimum specs if too slow/old.

Hardware that supports AVX2 or AVX512 intrinsics perform significanly better than hardware that does not.

Hardware that has more tightly integrated CPU/RAM and caching, such as Apple Silicon or AMD Ryzen 9 series also tend to be more efficient due to vendor-specific hardware optimizations and improvements.

## Network Requirements
Network requirements are made up of network speed (how fast your data can be transmitted), network hardware (routers, switches, network cards), which impacts your overall bandwidth (amount of data being ingressed/egressed).  Network latency will also impact how your node is seen by others.

### Bandwidth
The bandwidth requirements are case-dependent.

Higher bandwidth is not necessarily better, as the amount needed is more around supply/demand and how much storage the shard is using that the node is proving over.

In the case that a shard has a high amount of storage, a node would need more bandwidth to send/receive the data on demand.

### Network Speeds
Often times a hosting provider will describe their services with just bandwidth, but a savvy node operator should know the difference between bandwidth and network speed.

The network provider may allow say, 1 TB of bandwidth, this may not actually reflect how fast your network speed is.

Think of it this way, in a month, if your node's connection is high bandwidth, it does not actually mean your upload/download speeds will be fast.

If your hardware is connected with a 100Mpbs connection it will be slower to actually download than using a fully optimized 1Gbps connection, even if the bandwidth is 1TB/month for both.

Providers may or may not advertise this, so inquires may be needed, and hosting providers may charge additional fees to use higher speeds.

### Network Latency
When meshing in the network, nodes often will drop really slow/unrepsonsive peers that do not meet a certain latency threshold.

When running a node behind a home network, poorly optimized provider, or in a remote location with few peers, finding peers that will regularly connect to your node may be difficult, preventing or delaying your node from recieving updated network information.

## Changes in Quilibrium v2.1

Quilibrium v2.1 changes how hardware impacts rewards compared to v2.0.

In v2.0, faster CPUs increased rewards by supporting more worker processes, but v2.1 introduces higher memory and storage demands per worker, reducing the CPU's primary role.

A balanced setup — following the **1 CPU core to 2 GB RAM to 4 GB storage** ratio — is now recommended for v2.1's long-term design, making earlier over-allocation less effective.

Low-end options like Raspberry Pis function (with modest rewards and clustering potential), while modern hardware like AMD Ryzen, Apple Silicon (e.g., Mac Minis), and high-core servers excel; older Xeons typically underperform.

### Hardware Expected Performance in v2.1


| Hardware Type                  | Expected Performance (v2.1) | Notes                                      |
|--------------------------------|-----------------------------|--------------------------------------------|
| Raspberry Pi                   | Low                        | Viable for testing or clusters; modest rewards |
| Older Xeon (2000s)             | Very Low to Unusable       | Struggles with slow memory/disks; needs optimization |
| AMD Ryzen/7702 Series          | Moderate to High           | Strong in v2.0; still good but less dominant |
| Apple Silicon (e.g., M1/M2, Mac Mini) | High                | Efficient, integrated; excels standalone or clustered |
| High-Core Server               | High                       | Best with modern CPUs, ample RAM/storage   |
