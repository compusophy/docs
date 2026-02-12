import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import clsx from 'clsx';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import styles from './styles.module.css';

function IconMonitor(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const options = [
  {value: null, icon: IconMonitor, label: 'System'},
  {value: 'light' as const, icon: IconLightMode, label: 'Light'},
  {value: 'dark' as const, icon: IconDarkMode, label: 'Dark'},
];

export default function ThemeSwitcher(): React.ReactNode {
  const {colorModeChoice, setColorMode} = useColorMode();

  return (
    <div className={styles.switcher} role="radiogroup" aria-label="Color theme">
      {options.map(({value, icon: Icon, label}) => {
        const isActive = colorModeChoice === value;
        return (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} theme`}
            className={clsx(styles.option, isActive && styles.active)}
            onClick={() => setColorMode(value)}>
            <Icon width={14} height={14} />
          </button>
        );
      })}
    </div>
  );
}
