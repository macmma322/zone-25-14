/**
 * Database Backup Script for Zone 25-14
 * 
 * Features:
 * - Automated PostgreSQL backups with timestamps
 * - Compression to save space
 * - Rotation policy (keeps last 30 daily, 12 weekly, 12 monthly)
 * - Email notifications on success/failure
 * 
 * Usage:
 * node scripts/backup-database.js
 * node scripts/backup-database.js --scheduled (for cron jobs)
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execPromise = util.promisify(exec);

// Configuration - Update these with your database credentials
const CONFIG = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'zone_25_14',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
  backup: {
    directory: process.env.BACKUP_DIR || path.join(__dirname, '../backups/database'),
    compress: true,
    retention: {
      daily: 30,    // Keep last 30 days
      weekly: 12,   // Keep last 12 weeks
      monthly: 12   // Keep last 12 months
    }
  },
  notifications: {
    enabled: false, // Set to true and configure email settings
    email: process.env.ADMIN_EMAIL || 'admin@zone2514.com'
  }
};

class DatabaseBackup {
  constructor(config) {
    this.config = config;
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupDir = config.backup.directory;
    this.isScheduled = process.argv.includes('--scheduled');
  }

  /**
   * Ensure backup directory exists
   */
  ensureBackupDirectory() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      console.log(`✓ Created backup directory: ${this.backupDir}`);
    }
  }

  /**
   * Generate backup filename
   */
  getBackupFilename() {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = date.toTimeString().split(' ')[0].replace(/:/g, '-');
    return `zone2514_backup_${dateStr}_${timeStr}.sql`;
  }

  /**
   * Perform database backup using pg_dump
   */
  async performBackup() {
    const filename = this.getBackupFilename();
    const filepath = path.join(this.backupDir, filename);
    const { host, port, name, user, password } = this.config.database;

    console.log(`\n🔄 Starting database backup...`);
    console.log(`   Database: ${name}@${host}:${port}`);
    console.log(`   File: ${filename}`);

    try {
      // Set password environment variable for pg_dump
      const env = { ...process.env, PGPASSWORD: password };

      // Create backup using pg_dump
      const dumpCommand = `pg_dump -h ${host} -p ${port} -U ${user} -d ${name} -F c -b -v -f "${filepath}"`;
      
      await execPromise(dumpCommand, { env, maxBuffer: 1024 * 1024 * 100 });

      const stats = fs.statSync(filepath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

      console.log(`✓ Backup completed successfully`);
      console.log(`   Size: ${sizeMB} MB`);

      // Compress if enabled
      if (this.config.backup.compress) {
        await this.compressBackup(filepath);
      }

      return { success: true, filepath, size: sizeMB };
    } catch (error) {
      console.error(`✗ Backup failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  /**
   * Compress backup file using gzip
   */
  async compressBackup(filepath) {
    console.log(`🗜️  Compressing backup...`);
    
    try {
      await execPromise(`gzip -f "${filepath}"`);
      const compressedPath = `${filepath}.gz`;
      const stats = fs.statSync(compressedPath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`✓ Compression completed`);
      console.log(`   Compressed size: ${sizeMB} MB`);
      
      return compressedPath;
    } catch (error) {
      console.warn(`⚠ Compression failed: ${error.message}`);
      return filepath;
    }
  }

  /**
   * Clean old backups based on retention policy
   */
  async cleanOldBackups() {
    console.log(`\n🧹 Cleaning old backups...`);

    try {
      const files = fs.readdirSync(this.backupDir)
        .filter(f => f.startsWith('zone2514_backup_'))
        .map(f => ({
          name: f,
          path: path.join(this.backupDir, f),
          time: fs.statSync(path.join(this.backupDir, f)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time);

      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      const oneWeek = 7 * oneDay;
      const oneMonth = 30 * oneDay;

      let kept = 0;
      let removed = 0;

      files.forEach((file, index) => {
        const age = now - file.time;
        let shouldKeep = false;

        // Keep daily backups for last 30 days
        if (age < this.config.backup.retention.daily * oneDay) {
          shouldKeep = true;
        }
        // Keep weekly backups for last 12 weeks
        else if (age < this.config.backup.retention.weekly * oneWeek && index % 7 === 0) {
          shouldKeep = true;
        }
        // Keep monthly backups for last 12 months
        else if (age < this.config.backup.retention.monthly * oneMonth && index % 30 === 0) {
          shouldKeep = true;
        }

        if (!shouldKeep) {
          fs.unlinkSync(file.path);
          removed++;
        } else {
          kept++;
        }
      });

      console.log(`✓ Cleanup completed`);
      console.log(`   Kept: ${kept} backups`);
      console.log(`   Removed: ${removed} old backups`);

    } catch (error) {
      console.error(`✗ Cleanup failed: ${error.message}`);
    }
  }

  /**
   * Send notification email (placeholder - implement with nodemailer)
   */
  async sendNotification(result) {
    if (!this.config.notifications.enabled) return;

    // TODO: Implement email notification using nodemailer
    console.log(`\n📧 Notification: ${result.success ? 'SUCCESS' : 'FAILURE'}`);
  }

  /**
   * Run the complete backup process
   */
  async run() {
    console.log(`\n╔════════════════════════════════════════╗`);
    console.log(`║   ZONE 25-14 DATABASE BACKUP           ║`);
    console.log(`╚════════════════════════════════════════╝`);
    console.log(`   Started: ${new Date().toLocaleString()}`);

    this.ensureBackupDirectory();
    
    const result = await this.performBackup();
    
    if (result.success && this.isScheduled) {
      await this.cleanOldBackups();
    }

    await this.sendNotification(result);

    console.log(`\n   Finished: ${new Date().toLocaleString()}`);
    console.log(`════════════════════════════════════════\n`);

    process.exit(result.success ? 0 : 1);
  }
}

// Run backup
const backup = new DatabaseBackup(CONFIG);
backup.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
