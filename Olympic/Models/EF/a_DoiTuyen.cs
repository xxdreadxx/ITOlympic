namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("a_DoiTuyen")]
    public partial class a_DoiTuyen
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string MaDoi { get; set; }

        [StringLength(50)]
        public string TenDoi { get; set; }

        public int? ID_HangMuc { get; set; }

        public string KetQua { get; set; }

        public int? ID_HLV { get; set; }

        public byte? TrangThai { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
        public int? NguoiTao { get; set; }
        public int? NguoiSua { get; set; }
    }

    [NotMapped]
    public class a_DoiTuyenView : a_DoiTuyen
    {
        public string TenHangMuc { get; set; }
        public string TenCuocThi { get; set; }
        public int SoLuong { get; set; }
        public int SoLuongHM { get; set; }
        public string HLV { get; set; }
        public string ThoiGianBatDauChamDiem { get; set; }
    }

    public class CaNhanView
    {
        public int ID { get; set; }
        public int IDHM_SV { get; set; }
        public string HoTen { get; set; }
        public string MaSV { get; set; }
        public string SoBaoDanh { get; set; }
        public string TenHangMuc { get; set; }
        public string TenCuocThi { get; set; }
        public string GiaiThuong { get; set; }
        public double? Diem { get; set; }
        public byte TrangThai { get; set; }
        public string ThoiGianBatDauChamDiem { get; set; }
        public string ThoiGianKetThucChamDiem { get; set; }
        public string ThoiGianBatDauThi { get; set; }
    }
}
