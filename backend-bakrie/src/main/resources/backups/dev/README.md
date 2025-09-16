---

# Development Database Backups

## Tujuan

Folder ini digunakan untuk menyimpan cadangan (backup) skema dan data dari lingkungan pengembangan (`dev`) proyek `bakrie-store`. Backup ini berguna untuk pemulihan data, audit perubahan skema, dan sinkronisasi antar anggota tim.

---

## Struktur File

Setiap file backup mengikuti format penamaan berikut:

```
<database_name>_<YYYY-MM-DD>_<type>.sql
```

Contoh:
```
bakrie-store_2025-09-17_full.sql
bakrie-store_2025-09-17_schema.sql
bakrie-store_2025-09-17_data.sql
```

- `full.sql` → berisi seluruh skema dan data (DDL + DML)
- `schema.sql` → hanya berisi struktur tabel (DDL)
- `data.sql` → hanya berisi isi tabel (DML)

---

## Prosedur Backup

Backup dapat dilakukan menggunakan perintah berikut:

### Full Backup
```bash
mysqldump -u <user> -p <database_name> > bakrie-store_YYYY-MM-DD_full.sql
```

### Schema Only
```bash
mysqldump -u <user> -p --no-data <database_name> > bakrie-store_YYYY-MM-DD_schema.sql
```

### Data Only
```bash
mysqldump -u <user> -p --no-create-info <database_name> > bakrie-store_YYYY-MM-DD_data.sql
```

> Gantilah `<user>`, `<database_name>`, dan `YYYY-MM-DD` sesuai kebutuhan.

---

## Catatan Kolaboratif

- Backup disarankan dilakukan sebelum menjalankan migrasi Flyway atau perubahan skema besar.
- File backup sebaiknya di-*commit* hanya jika diperlukan untuk sinkronisasi tim atau dokumentasi.
- Untuk menjaga ukuran repository, hindari menyimpan backup harian secara permanen di Git. Gunakan `.gitignore` jika perlu.

---
