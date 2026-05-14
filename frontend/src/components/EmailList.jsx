import React from 'react';
import styles from './EmailList.module.css';
import { PackageOpen } from 'lucide-react'; // Icon hộp rỗng

function EmailList({ emails }) {
  // Logic 1: Nếu không có thư nào, hiển thị giao diện Empty State
  if (!emails || emails.length === 0) {
    return (
      <div className={styles.emptyState}>
        <PackageOpen size={48} strokeWidth={1} color="#b0b0b0" />
        <p>Không có thư nào trong mục này.</p>
      </div>
    );
  }

  // Logic 2: Nếu có thư, hiển thị danh sách
  return (
    <div className={styles.listContainer}>
      {emails.map((email) => (
        <div 
          key={email.id} 
          className={`${styles.emailItem} ${email.label === 'spam' ? styles.spamItem : ''}`}
        >
          <div className={styles.emailHeader}>
            <span><strong>Từ:</strong> {email.sender} ➔ <strong>Tới:</strong> {email.receiver}</span>
            <span>{email.created_at ? new Date(email.created_at).toLocaleString() : ''}</span>
          </div>
          <h3 className={styles.subject}>{email.subject}</h3>
          <p className={styles.body}>{email.body}</p>
        </div>
      ))}
    </div>
  );
}

export default EmailList;