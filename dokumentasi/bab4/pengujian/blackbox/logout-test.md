# Pengujian Blackbox Fitur Logout

Dokumen ini berisi skenario pengujian blackbox untuk fitur logout pada aplikasi Rekofin UI.

| No | Bentuk Pengujian | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| --- | --- | --- | --- | --- |
| 1 | Pengguna dalam kondisi login membuka menu sidebar dan memilih menu Keluar | Sistem menampilkan modal konfirmasi logout sebelum proses logout dijalankan. | Berhasil sesuai hasil yang diharapkan. Modal konfirmasi logout muncul. | Valid |
| 2 | Pengguna menekan aksi batal/tutup pada modal konfirmasi logout | Sistem menutup modal konfirmasi dan pengguna tetap berada pada halaman saat ini dalam kondisi login. | Berhasil sesuai hasil yang diharapkan. Logout dibatalkan dan sesi tetap aktif. | Valid |
| 3 | Pengguna menekan konfirmasi logout pada modal | Sistem menghapus data sesi pada localStorage (termasuk token), menutup modal, lalu mengarahkan pengguna ke halaman login. | Berhasil sesuai hasil yang diharapkan. Data sesi terhapus dan redirect ke login berhasil. | Valid |
| 4 | Setelah logout berhasil, pengguna mencoba mengakses ulang halaman protected melalui URL langsung | Sistem menolak akses halaman protected dan mengarahkan pengguna kembali ke halaman login karena token tidak tersedia/invalid. | Berhasil sesuai hasil yang diharapkan. Akses ke halaman protected diblokir. | Valid |
| 5 | Pengguna logout dari area user dashboard | Sistem menjalankan alur logout yang sama (konfirmasi, hapus sesi, redirect login) pada modul user. | Berhasil sesuai hasil yang diharapkan. Logout di area user berjalan konsisten. | Valid |
| 6 | Pengguna logout dari area admin dashboard | Sistem menjalankan alur logout yang sama (konfirmasi, hapus sesi, redirect login) pada modul admin. | Berhasil sesuai hasil yang diharapkan. Logout di area admin berjalan konsisten. | Valid |
| 7 | Pengguna logout saat berada di halaman selain dashboard (misal profile, konsultasi, atau history) | Sistem tetap menampilkan modal konfirmasi dan setelah konfirmasi tetap menghapus sesi serta redirect ke login. | Berhasil sesuai hasil yang diharapkan. Logout dapat dilakukan dari berbagai halaman protected. | Valid |
| 8 | Setelah logout, pengguna membuka halaman login | Sistem menampilkan form login normal tanpa redirect kembali ke halaman protected karena sesi sebelumnya sudah dihapus. | Berhasil sesuai hasil yang diharapkan. Halaman login tampil normal pasca logout. | Valid |
| 9 | Token kadaluarsa atau tidak valid saat pengguna melakukan request API pada halaman protected | Sistem menangani response unauthorized/forbidden dengan menghapus token dan memaksa pengguna kembali ke autentikasi (reload + guard login). | Berhasil sesuai hasil yang diharapkan. Sesi invalid tidak dapat dipakai melanjutkan akses. | Valid |
| 10 | Pengguna melakukan logout berulang (misal klik logout lagi setelah sesi sudah tidak aktif) | Sistem tetap mengarahkan pengguna ke halaman login tanpa menyebabkan error aplikasi atau crash. | Berhasil sesuai hasil yang diharapkan. Perilaku logout tetap aman dan stabil. | Valid |
