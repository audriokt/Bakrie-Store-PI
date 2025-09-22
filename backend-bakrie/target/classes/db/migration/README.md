# Flyway Migration Guide

## Tujuan

Dokumen ini menjelaskan struktur dan prosedur migrasi skema database menggunakan Flyway dalam proyek `bakrie-store`. Migrasi dilakukan secara otomatis saat aplikasi Spring Boot dijalankan, sehingga seluruh tim dapat menjaga konsistensi skema database lintas lingkungan pengembangan.

---

## Struktur Folder

```
src/main/resources/db/migration/
├── V1_0__initial_schema.sql
├── V2_0__add_emotion_score_column.sql
├── V3_0__create_annotations_table.sql
└── rollback/
    ├── U2_0__remove_emotion_score_column.sql
    ├── U3_0__drop_annotations_table.sql
```

- File migrasi menggunakan format `V<versi>__<deskripsi>.sql`
- File rollback disimpan secara manual di folder `rollback/` untuk dokumentasi atau eksekusi manual

---

## Prosedur Migrasi

1. Clone proyek dan jalankan aplikasi Spring Boot.
2. Flyway akan:
    - Membuat tabel `flyway_schema_history` secara otomatis
    - Menjalankan file migrasi yang belum tercatat
    - Menjaga urutan dan versi migrasi secara konsisten

---

## Menambahkan Migrasi Baru

1. Buat file baru di folder `db/migration` dengan format penamaan:
   ```
   V<versi>__<deskripsi>.sql
   ```
   Contoh:
   ```
   V4_0__add_feedback_table.sql
   ```

2. Tambahkan metadata di awal file:
   ```sql
   -- Author: Nama Pengembang
   -- Description: Deskripsi singkat migrasi
   -- Timestamp: YYYY-MM-DD
   ```

3. Jangan ubah file migrasi yang sudah dijalankan. Jika ada perubahan, buat versi baru.

---

