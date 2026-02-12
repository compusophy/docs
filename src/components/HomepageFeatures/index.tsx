import React from "react";
import Link from "@docusaurus/Link";
import Icon from "@site/src/components/Icons";
import styles from "./styles.module.css";

const features = [
  {
    href: "/docs/discover/what-is-quilibrium",
    icon: "informationcircle",
    title: "Discover",
    description: "Quilibrium explained for everyone",
  },
  {
    href: "/docs/learn/communication",
    icon: "filebookmark",
    title: "Learn",
    description: "How the Quilibrium network works",
  },
  {
    href: "/docs/category/applications",
    icon: "screwdriverwrench",
    title: "Build",
    description: "How to develop applications on the Quilibrium network",
  },
  {
    href: "/docs/run-node/quick-start",
    icon: "sharingdata",
    title: "Run",
    description: "How to run a node on the Quilibrium network",
  },
  {
    href: "/docs/protocol/overview",
    icon: "layers1",
    title: "Protocol",
    description: "Deeper protocol-specific details",
  },
  {
    href: "/docs/api/overview",
    icon: "browsercode2",
    title: "API",
    description: "API reference and integration guides",
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <Link
              key={idx}
              href={feature.href}
              className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <Icon name={feature.icon} className={styles.icon} />
              </div>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
