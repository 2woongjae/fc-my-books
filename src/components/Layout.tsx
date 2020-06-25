import React from 'react';
import styles from './Layout.module.css';

const Layout: React.FC = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);

export default Layout;
