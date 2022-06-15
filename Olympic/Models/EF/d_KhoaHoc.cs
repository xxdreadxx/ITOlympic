namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class d_KhoaHoc
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string MaKhoaHoc { get; set; }

        [StringLength(50)]
        public string TenKhoaHoc { get; set; }

        public int? NamBatDau { get; set; }

        public int? NamKetThuc { get; set; }

        public byte? TrangThai { get; set; }
    }
}
