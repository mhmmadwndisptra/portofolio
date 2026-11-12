/**
 * Authentication & Security Helper untuk Pemilik Portofolio
 * Muhammad Wandi Saputra Nurhasan
 * 
 * Pengunjung umum hanya memiliki hak BACA (Read-Only).
 * Pemilik dapat login melalui tombol kunci / modal sandi untuk membuka mode edit.
 */

window.PORTFOLIO_AUTH = {
  // Password default yang aman (dapat diubah kapan saja)
  ADMIN_HASH: "saputrawandi20",
  SESSION_KEY: "portfolio_owner_session",

  isOwner: function() {
    return sessionStorage.getItem(this.SESSION_KEY) === "true";
  },

  login: function(inputPass) {
    if (inputPass === this.ADMIN_HASH) {
      sessionStorage.setItem(this.SESSION_KEY, "true");
      return true;
    }
    return false;
  },

  logout: function() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
};
