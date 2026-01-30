import pool from './db';

export interface LogData {
  userId?: number;
  action: string;
  description?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function createLog(data: LogData): Promise<void> {
  try {
    await pool.execute(
      `INSERT INTO data_logs (user_id, action, description, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.userId || null,
        data.action,
        data.description || null,
        data.ipAddress || null,
        data.userAgent || null
      ]
    );
  } catch (error) {
    console.error('Error creating log:', error);
  }
}

export async function getLogs(limit: number = 100, offset: number = 0) {
  const [rows] = await pool.execute(
    `SELECT 
      dl.id,
      dl.user_id,
      u.username,
      dl.action,
      dl.description,
      dl.ip_address,
      dl.created_at
    FROM data_logs dl
    LEFT JOIN users u ON dl.user_id = u.id
    ORDER BY dl.created_at DESC
    LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  return rows;
}
