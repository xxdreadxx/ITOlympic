namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class a_HangMuc_VongThi
    {
        public int ID { get; set; }

        public int? ID_HangMuc { get; set; }

        public int? ID_VongThi { get; set; }

        [StringLength(50)]
        public string ThoiGianBatDau { get; set; }

        [StringLength(50)]
        public string ThoiGianKetThuc { get; set; }

        public double? DiemDat { get; set; }

        [StringLength(500)]
        public string FileDinhKem { get; set; }

        public byte? TrangThai { get; set; }
    }
}
