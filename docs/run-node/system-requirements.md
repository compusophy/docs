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

## Understanding Workers

Before discussing hardware requirements, it's important to understand what **workers** are in Quilibrium.

Workers are separate processes that handle shard data and perform computational proofs for the network. Your node runs a master process plus multiple worker processes. Each worker requires dedicated hardware resources.

**Key points:**
- By default, the node spawns one worker per CPU core/thread available
- Each worker needs its own allocation of CPU, RAM, and storage
- More workers = more computational capacity = potentially higher rewards
- Hardware requirements are **per worker**, not for the entire node

## The Golden Ratio: Hardware Per Worker

Quilibrium v2.1 follows a balanced hardware allocation model for optimal performance:

### 1 CPU core : 2 GB RAM : 4 GB storage

This ratio applies **per worker**. Every worker you run needs:
- **1 logical CPU core** (also called a thread or hyperthread)
- **2 GB of RAM**
- **4 GB of disk storage**

:::info What is a Logical Core?
A logical core is also known as a hyperthread (on hyperthreaded CPUs), thread, or vCPU on virtual machines. For example, an "8C/16T" CPU has 8 physical cores and 16 logical cores (threads).
:::

### Calculating Your Total Resources

To determine your total hardware needs, multiply by the number of workers:

**Examples:**
- **4 workers** need: 4 cores, 8 GB RAM, 16 GB storage
- **8 workers** need: 8 cores, 16 GB RAM, 32 GB storage
- **16 workers** need: 16 cores, 32 GB RAM, 64 GB storage

:::warning
The 1:2:4 ratio is critical for balanced performance. Insufficient RAM or storage for your CPU core count will cause problems.
:::

## Minimum Hardware Requirements

The absolute minimum for running a single node is **4 workers**, which requires:

| Component | Minimum Requirements |
|-----------|----------------------|
| CPU       | 4 logical cores (threads) |
| RAM       | 8 GB                |
| Storage   | 16 GB free space    |

These minimums are suitable for:
- Testing and experimentation
- Local development testnets
- Learning how nodes work

**For production nodes earning rewards**, you'll want significantly more resources. Many operators use servers with 16-32+ cores.

:::note Advanced: Clustering
Advanced users may split workers across multiple servers (clustering). This requires a minimum of one core for the master process. See [Advanced Node Management](/docs/run-node/advanced-node-management) for details.
:::

## Hardware Component Details

### CPU Requirements

**What matters for CPUs:**
- **Clock speed**: Higher speeds are generally better for proof computation
- **Architecture**: Modern CPUs with AVX2 or AVX512 instructions perform significantly better
- **Core count**: More cores = more workers = more capacity

**Performance considerations:**
- **Hyperthreading**: May reduce performance per worker compared to physical cores. Test your specific hardware to determine if hyperthreading benefits your setup by comparing proof completion times.
- **Thermal throttling**: High core counts generate heat. Inadequate cooling causes throttling, reducing performance. Ensure proper cooling for your CPU.
- **Age matters**: Older CPUs (especially 2000s-era Xeons) often can't meet proof speed requirements even at minimum specs.

**Recommended CPU types:**
- Modern AMD Ryzen series (excellent performance)
- Apple Silicon (M1/M2/M3 series - highly efficient)
- Modern Intel Core or Xeon (ensure adequate clock speeds)
- ARM CPUs (efficient but high-core options are expensive)

**Avoid:**
- Older Xeon processors from the 2000s
- CPUs without AVX2 support
- Low clock-speed processors (less than 2 GHz base)

### Memory (RAM) Requirements

Each worker requires **2 GB of RAM**. This is non-negotiable in v2.1.

**Important:**
- Insufficient RAM causes memory warnings in logs
- Running out of memory can crash workers or the entire node
- OS and other processes also need RAM - don't allocate 100% to workers

**Recommended practice:**
- Leave 10-20% RAM headroom for the OS
- If you have 32 GB RAM, plan for 12-14 workers max (24-28 GB), not 16 workers

### Storage Requirements

Each worker requires **4 GB of storage** for its data store.

**Storage considerations:**
- **Type**: SSD strongly recommended; HDDs are too slow for proof operations
- **Total capacity**:
  - Minimum: 16 GB (for 4 workers)
  - Typical: 1 TB (allows growth and data storage)
  - The node can function as compute-only (minimal storage) or store data (more storage needed)
- **Performance**: NVMe SSDs offer best performance; SATA SSDs are acceptable

**Storage thresholds:**
The node monitors disk usage and will emit warnings/terminate if thresholds are exceeded:
- 70% usage: Notice logs
- 90% usage: Warning logs
- 95% usage: Node terminates to prevent data corruption

### Graphics Cards (GPUs)

GPUs, ASICs, and FPGAs are **not currently supported** for node operation.

- Having a GPU (integrated or dedicated) will not impact performance positively or negatively
- The node software ignores GPU hardware completely
- As network features evolve, specialized hardware support may be added in the future

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

### CPU Performance Factors

**Clock speeds** matter significantly. Higher clock-speed CPUs are generally faster for the node software, and more modern CPUs may have additional features that can improve performance.

**Core count trade-offs:**
- More cores generally mean better overall performance (more workers)
- However, more cores = more heat = potential thermal throttling
- Older high-core-count CPUs may be too slow per core to meet proof deadlines
- Quality over quantity: 8 fast modern cores often outperform 16 slow old cores

**Architectural advantages:**
- Hardware supporting AVX2 or AVX512 intrinsics performs significantly better
- Tightly integrated CPU/RAM and caching (e.g., Apple Silicon, AMD Ryzen 9) are more efficient due to vendor-specific optimizations
- Modern architectures (2020+) typically offer better performance per watt

**Examples by vendor:**
- **AMD**: Ryzen series and Threadripper provide excellent performance for Quilibrium
- **Intel**: Modern Core i7/i9 or recent Xeon processors work well
- **Apple**: M-series chips (M1/M2/M3) are highly efficient and perform excellently
- **ARM**: Efficient but high-core-count servers are rare and expensive

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

When meshing in the network, nodes often will drop really slow/unresponsive peers that do not meet a certain latency threshold.

When running a node behind a home network, poorly optimized provider, or in a remote location with few peers, finding peers that will regularly connect to your node may be difficult, preventing or delaying your node from receiving updated network information.

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
