namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class a_HangMuc
    {
        public int ID { get; set; }

        public int? ID_CuocThi { get; set; }

        [StringLength(50)]
        public string MaHangMuc { get; set; }

        [StringLength(250)]
        public string TenHangMuc { get; set; }

        public string ThoiGianBatDau { get; set; }
        public string ThoiGianKetThuc { get; set; }

        public byte? DoiTuong { get; set; }
        public int SoLuong { get; set; }

        public string HinhThucThi { get; set; }

        public string GiaiThuong { get; set; }

        public string NoiDungThi { get; set; }

        public byte? TrangThai { get; set; }
    }
}
