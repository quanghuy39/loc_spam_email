import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import styles from './App.module.css';
import ComposeEmail from './components/ComposeEmail';
// SỬA LỖI: Import MailCheck và LogOut từ lucide-react
import { MailCheck, LogOut } from 'lucide-react'; 

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('inbox');
  const [emails, setEmails] = useState([]);

  // 1. NẠP LỊCH SỬ THƯ (Giao thức HTTP)
  useEffect(() => {
    if (currentUser) {
      const fetchHistory = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/emails?user=${currentUser}`);
          if (response.ok) {
            const data = await response.json(); 
            setEmails(data); 
          }
        } catch (error) {
          console.error("Chưa kết nối HTTP Backend.");
        }
      };
      fetchHistory();
    }
  }, [currentUser]);

  // 2. LẮNG NGHE THƯ MỚI (Giao thức WebSocket)
  useEffect(() => {
    if (currentUser) {
      const ws = new WebSocket(`ws://localhost:8000/ws/${currentUser}`);
      ws.onmessage = (event) => {
        const incomingEmail = JSON.parse(event.data);
        setEmails((prevEmails) => [...prevEmails, incomingEmail]);
      };
      return () => {
        ws.close();
      };
    }
  }, [currentUser]);

  // 3. BỘ LỌC HIỂN THỊ
  const displayedEmails = emails.filter((email) => {
    if (activeTab === 'inbox') return email.receiver === currentUser && email.label === 'ham';
    if (activeTab === 'sent') return email.sender === currentUser;
    if (activeTab === 'spam') return email.receiver === currentUser && email.label === 'spam';
    return false;
  });

  const handleEmailSent = (newEmail) => {
    setEmails((prevEmails) => [...prevEmails, newEmail]);
    setActiveTab('sent');
  };

  if (currentUser === null) {
    return <Login onLogin={(name) => setCurrentUser(name)} />;
  }

  return (
    <div className={styles.appContainer}> 
      <header className={styles.header}>
        <div className={styles.headerBrand}>
          <div className={styles.logoCircleSmall}>
            {/* SỬA LỖI: Đổi ShieldCheck thành MailCheck cho đồng bộ */}
            <MailCheck size={22} color="white" strokeWidth={2} />
          </div>
          <span>Hệ thống lọc thư rác - Nhóm 4</span>
        </div>

        <div className={styles.headerUser}>
          <span>Xin chào, <strong>{currentUser}</strong></span>
          {/* SỬA LỖI: Thay Google Icon logout bằng LogOut của Lucide */}
          <button className={styles.logoutBtn} onClick={() => setCurrentUser(null)}>
            Đăng xuất <LogOut size={16} strokeWidth={2} />
          </button>
        </div>
      </header>

      <div className={styles.mainLayout}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.mainContent}>
          {activeTab === 'compose' ? (
            <ComposeEmail sender={currentUser} onSendSuccess={handleEmailSent} />
          ) : (
            <EmailList emails={displayedEmails} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;