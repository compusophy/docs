---
sidebar_position: 3
---

# Advanced Configuration

Configuration is managed via the `config.yml` file, located in the config directory either specified at runtime or defaulting to the `.config/` folder in the node project. 

If there are multiple options listed for a configuration value, the first one is the default value.

## Enacting Config Changes

Be sure to restart your node after making any configuration changes.

## Key Section

The key section specifies the key provider configuration:

```
key:
  keyManagerType: file | mem | pkcs11 | rpc
  keyManagerFile:
    path: .config/keys.yml | <string>
    createIfMissing: false | true
    encryptionKey: <hex string>
  keyManagerPKCS11:
    libraryPath: <string>
    slot: <int>
    slotIndex: <int>
    promptPassword: false | true
  keyStoreRPC:
    listenMultiaddr: <multiaddr>
```

By default, the file-based key manager is specified. Support for PKCS11 and RPC will be enabled in a subsequent upgrade.

## Peer-to-Peer Networking Section

The p2p section specifies general connectivity and BlossomSub-specific parameters:

```
p2p:
  d: 8 – Optimal degree for a BlossomSub bitmask mesh
  dLo: 6 – Lower bound on the number of peers in a bitmask mesh
  dHi: 12 – Upper bound on the number of peers in a bitmask mesh
  dScore: 4 – Number of high-scoring peers to retain when pruning mesh
  dOut: 2 – Minimum number of outbound connections to maintain in mesh
  historyLength: 9 – Size of message cache used for gossip (in heartbeats)
  historyGossip: 6 – Number of cached message IDs to advertise in IHAVE messages
  dLazy: 6 – Minimum peers to emit gossip to at each heartbeat
  gossipFactor: 0.25 – Factor affecting how many peers receive gossip each heartbeat
  gossipRetransmission: 3 – Times a peer can request the same message before being ignored
  heartbeatInitialDelay: 100ms – Delay before heartbeat timer begins after initialization
  heartbeatInterval: 700ms – Time between heartbeats
  fanoutTTL: 60s – How long to track fanout state for unpublished bitmasks
  pruneBackoff: 60s – Backoff time for pruned peers
  unsubscribeBackoff: 10s – Backoff time when unsubscribing from a bitmask
  connectionTimeout: 30s – Timeout for connection attempts
  directConnectInitialDelay: 1s – Initial delay before opening connections to direct peers
  graftFloodThreshold: 10s – Time threshold for GRAFT following a PRUNE
  iWantFollowupTime: 3s – Wait time for message requested through IWANT
  connectors: 8 – Number of active connection attempts for peers from PX
  maxPendingConnections: 128 – Maximum number of pending connections from PX
  directConnectTicks: 300 – Heartbeat ticks for attempting to reconnect direct peers
  opportunisticGraftTicks: 60 – Heartbeat ticks for opportunistic grafting
  opportunisticGraftPeers: 2 – Number of peers to opportunistically graft
  maxIHaveLength: 5000 – Maximum number of messages in an IHAVE message
  maxIHaveMessages: 10 – Maximum IHAVE messages to accept from a peer per heartbeat
  maxIDontWantMessages: 5000 – Maximum IDONTWANT messages to accept per heartbeat
  iDontWantMessageThreshold: 1024 – Size threshold for sending IDONTWANT messages
  iDontWantMessageTTL: 60 – TTL for IDONTWANT messages (in heartbeats)
  validateQueueSize: 16384 – Size of the validation queue
  validateWorkers:  – Number of workers for validation (defaults to core count)
  subscriptionQueueSize: 16384 – Size of the subscription queue
  peerOutboundQueueSize: 128 – Size of outbound message channel per peer
  listenMultiaddr: "/ip4/0.0.0.0/udp/8336/quic-v1" – The multiaddress to listen on for p2p connections
  streamListenMultiaddr: "/ip4/0.0.0.0/tcp/8340" – The multiaddress for master node streaming (must be exposed, 2.1+)
  peerPrivKey:  – The private key for the peer
  traceLogFile:  – Path to the trace log file
  network:  – The network identifier
  bootstrapPeers: <string[]> – List of bootstrap peer multiaddresses
  directPeers: <string[]> – List of direct peer multiaddresses
  lowWatermarkConnections: 160 – Low watermark for peer connections
  highWatermarkConnections: 192 – High watermark for peer connections
  grpcServerRateLimit: 10 – Rate limit for GRPC server
  minBootstrapPeers: 3 – Minimum number of bootstrap peers required
  bootstrapParallelism: 10 – Number of parallel bootstrap operations
  discoveryParallelism: 50 – Number of parallel discovery operations
  discoveryPeerLookupLimit: 1000 – Maximum number of peers to lookup during discovery
  pingTimeout: 5s – Timeout for ping operations
  pingPeriod: 30s – Period between ping operations
  pingAttempts: 3 – Number of ping attempts before considering a peer unreachable
```

## Engine Section

The engine section specifies attributes which define protocol engine defaults.

```
engine:
  provingKeyId:  – The identifier of the proving key, retrieved by the key manager
  filter:  – The section of the bloom filter the node will listen to
  genesisSeed:  – The seed value used for the first frame
  maxFrames:  – The maximum number of frames to retain
  pendingCommitWorkers:  – The number of goroutines used to perform worker operations
  minimumPeersRequired: 3 – Minimum number of peers required for the node to function
  statsMultiaddr:  – The multiaddress for the stats server
  dataWorkerBaseListenMultiaddr: "/ip4/0.0.0.0/tcp/%d" – Format string for worker listen addresses, if the prior default using localhost addresses is present, it will switch to the new default automatically.
  dataWorkerBaseP2PPort: 50000 – Starting port number for worker p2p communication
  dataWorkerBaseStreamPort: 60000 – Starting port number for worker streaming
  dataWorkerMemoryLimit: 1880981504 – Memory limit for each worker process (1.75 GiB)
  dataWorkerP2PMultiaddrs: <string[]> – Manual specification of worker p2p multiaddresses
  dataWorkerStreamMultiaddrs: <string[]> – Manual specification of worker stream multiaddresses
  dataWorkerFilters: <string[]> – Manual specification of shard filters chosen by workers
  dataWorkerCount:  – Number of data worker processes to spawn
  multisigProverEnrollmentPaths: <string[]> – Paths to enrollment keys for multisig proving
  autoMergeCoins: false – Whether to automatically merge coins after minting
  syncTimeout: 4s – Maximum wait time for frame downloads from peers
  syncCandidates: 8 – Number of candidate peers per category to sync with
  syncMessageLimits:
    receiveLimit: 1048576 – GRPC message receive limit (1 MiB)
    sendLimit: 629145600 – GRPC message send limit (600 MiB)
  enableMasterProxy: false – Whether to proxy worker traffic through master process
  rewardStrategy: "reward-greedy" – Strategy for rewards ("reward-greedy" or "data-greedy")
  archiveMode: false – Whether to retain historic frame data
  delegateAddress:  – Hexadecimal address for rewards (without 0x prefix)
```

## Database Section

The database section specifies configurations of the underlying store.

```
db:
  path: ".config/store" – Path to the database directory
  workerPathPrefix: ".config/worker-store/%d" – Format string for worker store paths, %d is replaced with worker core ID
  workerPaths: <string[]> – Manual override for worker store paths
  noticePercentage: 70 – Storage capacity threshold for emitting notices (percentage)
  warnPercentage: 90 – Storage capacity threshold for emitting warnings (percentage)
  terminatePercentage: 95 – Storage capacity threshold for terminating the process (percentage)
```

## Additional Fields

This section denotes all additional configuration values at the root of the config file.

```
logFile: <string> - the path to the log file for the node
listenGrpcMultiaddr: <multiaddr> - the multiaddr this node will listen on for gRPC calls 
listenRESTMultiaddr: <multiaddr> - the multiaddr this node listen on for REST requests
```

## 2.0 Combined Seniority Prover Keys

The upgrade to 2.0 introduced the concept of seniority with respect to precedence in joining prover rings. Seniority is a special global-level value which the network uses to resolve conflicts on enrollment attempts on a prover ring. During the first 24 hours of the upgrade's release, no transactions can happen on the network, and no prover ring enrollment occurs. Afterwards, when the network is unlocked, nodes will automatically attempt to join the prover rings they are capable of supporting, based on the data workers of the node. This process requires no action on the part of the node operator, unless you specifically wish to combine keys previously used to increase seniority.

Note, you can only combine _one_ set of keys from 1.4.19 and above with older keys, and seniority of the older keys is not a pure summation – overlapping ranges are not counted multiple times, and their use for prover enrollment can only occur _once_ (you cannot use older keys twice for multiple sets of 1.4.19 keys). If you use multiple sets of keys from after 1.4.19, only one will be used for seniority for post-1.4.19 seniority.

Each bundle of keys/store files should live in separate folders (e.g. 1.4.19 config in `.config/`, older keys in `.config1/`, `.config2/`, `.config3/`).

### Merging keys with qclient

For the example provided, it is assumed qclient lives in the `client/` folder alongside the `node/` folder where the `.config*/` folders are contained:

```
qclient config prover merge ../node/.config ../node/.config1 ../node/.config2 ../node/.config3
```

Be sure to restart your node after running this command.

The 1.4.19+ config folder should be the first folder in this series.

To see what seniority this combination yields (minus the effective range for the 1.4.19+ keys, which is determined after stasis unlock) without making permanent changes, append `--dry-run` to the end of the command.

### Merging keys in the config.yml file

Under the `engine` section noted above, add the optional field `multisigProverEnrollmentPaths`:

```
engine:
  # ... other items omitted ...
  multisigProverEnrollmentPaths: [
    "/path/to/.config1/",
    "/path/to/.config2/",
    "/path/to/.config3/"
  ]
```

## Direct Peers

The directPeers field is used to specify a list of multiaddrs to use for direct connections.  This is useful for where you have one or more trusted peers that can aid in keeping in sync or bringing your node up to date.

This needs to be specified in the config.yml file for all connecting nodes. Otherwise the recipient will start scoring the sender really low for misbehavior.

For instance, if you have two nodes, peerA and peerB, you would edit the config.yml file for both peerA and peerB to include the other peer in the directPeers field.

This is useful for if you already have a node running and want to add a new node to the network.  It will allow the new node to quickly sync up with the existing network due peering with your already up-to-date node.

Both nodes do not need to be on at the same time or be started/stopped together.  The only requirement is that they are both defined in the other node's .p2p.directPeers list.

### Example
```
p2p:
  directPeers:
    - /ip4/192.168.1.100/udp/8336/quic-v1/p2p/Qm1234567890abcdef
    - /ip4/192.168.1.101/tcp/8336/p2p/Qm1234567890abcdef
```

## Using yq to update the config.yml file

The `yq` command line tool can be used to update the config.yml file.  This tool is useful for making changes to the config.yml file without having to manually edit the file.

Install help and examples can be found on [yq docs](https://mikefarah.gitbook.io/yq).
