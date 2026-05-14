import React, { useState } from 'react';
import styles from './ComposeEmail.module.css';
import { SendHorizonal } from 'lucide-react'; // Icon gửi thư

function ComposeEmail({ sender, onSendSuccess }) {
  const [receiver, setReceiver] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false); // Trạng thái đang gửi

  const handleSend = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tự tải lại trang
    
    if (!receiver || !subject || !body) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsSending(true);

    try {
      // 1. Đóng gói dữ liệu đúng Hợp đồng (Data Contract)
      const payload = { sender, receiver, subject, body };

      // 2. Gọi lệnh POST đẩy lên Backend
      const response = await fetch('http://localhost:8000/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Báo cho server biết đây là dữ liệu JSON
        },
        body: JSON.stringify(payload) // Biến object thành chuỗi JSON
      });

      if (response.ok) {
        const newEmail = await response.json(); // Lấy lá thư đã được server gán id và label
        onSendSuccess(newEmail); // Báo cáo thành công lên Tổng đài
        // Xóa trắng form sau khi gửi
        setReceiver('');
        setSubject('');
        setBody('');
      } else {
        alert("Có lỗi từ máy chủ khi gửi thư.");
      }
    } catch (error) {
      alert("Không thể kết nối đến Backend. Hãy kiểm tra lại Server!");
    } finally {
      setIsSending(false); // Gửi xong thì mở khóa nút bấm
    }
  };

  return (
    <div className={styles.composeContainer}>
      <h2 className={styles.title}>Thư mới</h2>
      <form onSubmit={handleSend}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Người nhận</label>
          <input 
            type="text" 
            className={styles.inputField}
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tiêu đề</label>
          <input 
            type="text" 
            className={styles.inputField}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nội dung</label>
          <textarea 
            className={styles.textAreaField}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitBtn} disabled={isSending}>
          {isSending ? 'Đang gửi...' : 'Gửi'}
        </button>
      </form>
    </div>
  );
}

export default ComposeEmail;