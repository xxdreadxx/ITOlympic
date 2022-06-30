namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class a_HangMuc_SinhVien_Diem
    {
        public int ID { get; set; }

        public int? ID_SV { get; set; }

        public int? ID_HangMuc { get; set; }

        public double? Diem { get; set; }

        public byte? KetQua { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
        public int? NguoiTao { get; set; }
        public int? NguoiSua { get; set; }
    }
}
