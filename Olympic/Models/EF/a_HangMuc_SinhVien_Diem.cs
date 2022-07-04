namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("a_HangMuc_SinhVien_Diem")]
    public partial class a_HangMuc_SinhVien_Diem
    {
        public int ID { get; set; }

        public int? ID_SV { get; set; }

        public int? ID_HangMuc { get; set; }

        public double? Diem { get; set; }

        public byte? KetQua { get; set; }
        public byte? TrangThai { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
        public int? NguoiTao { get; set; }
        public int? NguoiSua { get; set; }
    }

    [NotMapped]
    public class a_HangMuc_SinhVien_Diem_View: a_HangMuc_SinhVien_Diem
    {
        public string TenSV { get; set; }
        public string Lop { get; set; }
        public string TenHangMuc { get; set; }
        public string TenCuocThi { get; set; }
        public string ThoiGianBatDau { get; set; }
        public string ThoiGianKetThuc { get; set; }
    }
}
