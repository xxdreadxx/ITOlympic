using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.EF
{


    [Table("a_DoiTuyen_SV")]
    public partial class a_DoiTuyen_SV
    {
        public int ID { get; set; }

        public int? ID_Doi { get; set; }

        public int? ID_SV { get; set; }

        public byte? TrangThai { get; set; }

        public string KetQua { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
        public int? NguoiTao { get; set; }
        public int? NguoiSua { get; set; }
    }

    [NotMapped]
    public class a_DoiTuyen_SV_View: a_DoiTuyen_SV
    {
        public string TenDoi { get; set; }
        public string TenHangMucThi { get; set; }
        public string TenCuocThi { get; set; }
        public string TenSV { get; set; }
        public string Lop { get; set; }
        public string ThoiGianBatDau { get; set; }
        public string ThoiGianKetThuc { get; set; }
    }
}
