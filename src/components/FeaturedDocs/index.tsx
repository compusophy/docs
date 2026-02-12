import React from "react";
import Link from "@docusaurus/Link";
import Icon from "@site/src/components/Icons";
import styles from "./styles.module.css";

const featuredDocs = [
  {
    href: "/docs/run-node/quick-start",
    icon: "startup",
    title: "Quick Start",
    description: "Get a node running in minutes",
  },
  {
    href: "/docs/discover/quilibrium-tokenomics",
    icon: "piechart",
    title: "Tokenomics",
    description: "Emissions model, supply, and milestones",
  },
  {
    href: "/docs/discover/FAQ",
    icon: "helpchat2",
    title: "FAQ",
    description: "Common questions answered",
  },
  {
    href: "/docs/api/q-storage/user-manual/getting-started",
    icon: "clouddatatransfer",
    title: "QStorage Getting Started",
    description: "Decentralized S3-compatible object storage",
  },
  {
    href: "/docs/build/tokens/creating-tokens",
    icon: "linkchain",
    title: "Creating Tokens",
    description: "Deploy fungible tokens and collectibles",
  },
  {
    href: "/docs/run-node/qclient/setup",
    icon: "downloadsquare",
    title: "QClient Setup",
    description: "Install and configure the Q network CLI",
  },
  {
    href: "/docs/run-node/qclient/qclient-101",
    icon: "stepsnumber",
    title: "QClient 101",
    description: "Essential commands for tokens, nodes, and bridging",
  },
  {
    href: "/docs/run-node/system-requirements",
    icon: "computerchip1",
    title: "System Requirements",
    description: "Hardware specs and OS support for running a node",
  },
  {
    href: "/docs/discover/core-technologies-in-quilibrium",
    icon: "dna",
    title: "Core Technologies",
    description: "Cryptographic foundations powering the network",
  },
  {
    href: "/docs/protocol/consensus",
    icon: "hierarchy8",
    title: "Consensus Mechanism",
    description: "Proof of Meaningful Work and frame architecture",
  },
];

export default function FeaturedDocs(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Popular Guides</h2>
        <div className={styles.grid}>
          {featuredDocs.map((doc, idx) => (
            <Link key={idx} href={doc.href} className={styles.row}>
              <div className={styles.iconBadge}>
                <Icon name={doc.icon} className={styles.icon} />
              </div>
              <div className={styles.content}>
                <span className={styles.title}>{doc.title}</span>
                <span className={styles.description}>{doc.description}</span>
              </div>
              <span className={styles.arrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
