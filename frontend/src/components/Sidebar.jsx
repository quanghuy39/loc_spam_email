import React from 'react';
import styles from './Sidebar.module.css';
import { Edit3, Inbox, Send, AlertCircle } from 'lucide-react';

function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'inbox', label: 'Hộp thư đến', icon: <Inbox size={18} strokeWidth={1.5} /> },
    { id: 'sent', label: 'Thư đã gửi', icon: <Send size={18} strokeWidth={1.5} /> },
    { id: 'spam', label: 'Thư rác', icon: <AlertCircle size={18} strokeWidth={1.5} />, isSpam: true }
  ];

  return (
    <div className={styles.sidebar}>
      <button className={styles.composeBtn} onClick={() => setActiveTab('compose')}>
        <Edit3 size={18} strokeWidth={1.5} /> Soạn thư
      </button>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.menuItem} ${activeTab === tab.id ? styles.active : ''} ${tab.isSpam ? styles.spamAlert : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;