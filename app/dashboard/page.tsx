'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

interface Log {
  id: number;
  user_id: number | null;
  username: string | null;
  action: string;
  description: string | null;
  ip_address: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'logs'>('users');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setCurrentUser(data.user);
      await loadData();
    } catch (error) {
      router.push('/login');
    }
  };

  const loadData = async () => {
    try {
      const [usersRes, logsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/logs?limit=50')
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users);
      }

      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setLogs(logsData.logs);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1>لوحة التحكم</h1>
            <p>مرحباً <strong>{currentUser?.username}</strong></p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>👥</div>
            <div>
              <p className={styles.statLabel}>إجمالي المستخدمين</p>
              <h2 className={styles.statValue}>{users.length}</h2>
            </div>
          </div>

          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>📊</div>
            <div>
              <p className={styles.statLabel}>إجمالي السجلات</p>
              <h2 className={styles.statValue}>{logs.length}</h2>
            </div>
          </div>

          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>✅</div>
            <div>
              <p className={styles.statLabel}>تسجيلات ناجحة</p>
              <h2 className={styles.statValue}>
                {logs.filter(l => l.action === 'LOGIN_SUCCESS').length}
              </h2>
            </div>
          </div>

          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>❌</div>
            <div>
              <p className={styles.statLabel}>تسجيلات فاشلة</p>
              <h2 className={styles.statValue}>
                {logs.filter(l => l.action === 'LOGIN_FAILED').length}
              </h2>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'users' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 المستخدمون
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'logs' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            📝 سجل البيانات
          </button>
        </div>

        {/* Content */}
        <div className="card">
          {activeTab === 'users' ? (
            <div>
              <h3 className={styles.tableTitle}>جدول المستخدمين</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>اسم المستخدم</th>
                      <th>البريد الإلكتروني</th>
                      <th>الدور</th>
                      <th>تاريخ الإنشاء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><strong>{user.username}</strong></td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                            {user.role === 'admin' ? 'مدير' : 'مستخدم'}
                          </span>
                        </td>
                        <td>{formatDate(user.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={styles.tableTitle}>سجل البيانات</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>المستخدم</th>
                      <th>الإجراء</th>
                      <th>الوصف</th>
                      <th>عنوان IP</th>
                      <th>التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{log.username || '-'}</td>
                        <td>
                          <span className={`badge ${
                            log.action === 'LOGIN_SUCCESS' ? 'badge-success' :
                            log.action === 'LOGIN_FAILED' ? 'badge-danger' :
                            log.action === 'LOGOUT' ? 'badge-warning' :
                            'badge-info'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td>{log.description || '-'}</td>
                        <td><code>{log.ip_address || '-'}</code></td>
                        <td>{formatDate(log.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
