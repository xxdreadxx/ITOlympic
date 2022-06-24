namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class a_CuocThi
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string MaCuocThi { get; set; }

        [StringLength(500)]
        public string TenCuocThi { get; set; }

        [StringLength(50)]
        public string Nam { get; set; }

        [StringLength(50)]
        public string ThoiGianBatDau { get; set; }

        [StringLength(50)]
        public string ThoiGianKetThuc { get; set; }

        public string GiaiThuong { get; set; }

        public string KinhPhi { get; set; }

        public string BTC { get; set; }

        public byte? Cap { get; set; }

        public string NoiDung { get; set; }

        public byte? TrangThai { get; set; }

        public string FileDinhKem { get; set; }
        public string LyDoHuy { get; set; }
    }
}
