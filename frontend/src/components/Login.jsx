import React, { useState } from 'react';
import styles from './Login.module.css';
import { MailCheck } from 'lucide-react'; // Sử dụng icon này làm Logo

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (username.trim() !== '') {
      onLogin(username);
    } else {
      alert("Vui lòng nhập tên tài khoản!");
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.box}>
        {/* 1. LOGO HỆ THỐNG */}
        <div className={styles.logoWrapper}>
          <div className={styles.logoCircle}>
            <MailCheck size={48} color="white" strokeWidth={1.5} />
          </div>
        </div>

        {/* 2. TÊN HỆ THỐNG */}
        <h2 className={styles.title}>Hệ thống lọc thư rác - Nhóm 4</h2>

        {/* 3. PHỤ ĐỀ */}
        <p className={styles.subtitle}>Đăng nhập để vào hộp thư của bạn</p>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Tài khoản</label>
          <input 
            type="text" 
            className={styles.inputField}
            placeholder="" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Mật khẩu</label>
          <input 
            type="password" 
            className={styles.inputField}
            placeholder="" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleLoginClick()}
          />
        </div>
        
        <button className={styles.btn} onClick={handleLoginClick}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Login;