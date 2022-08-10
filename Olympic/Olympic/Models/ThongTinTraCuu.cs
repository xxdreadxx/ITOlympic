using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Olympic.Models
{
    public class ThongTin
    {
        public int ID { get; set; }
        public string MaSV { get; set; }
        public string HoTen { get; set; }
        public string Lop { get; set; }
        public string Email { get; set; }
        public string SDT { get; set; }
        public byte? GioiTinh { get; set; }
        public byte DoiTuong { get; set; }
        public string NgaySinh { get; set; }
        public DateTime NgayTao { get; set; }
        public byte TrangThai { get; set; }
        public KetQua lstKetQua { get; set; }
    }

    public class KetQua
    {
        public string TenHangMuc { get; set; }
        public string HinhThucThi { get; set; }
        public double Diem { get; set; }
        public string GiaiThuong { get; set; }
    }
}