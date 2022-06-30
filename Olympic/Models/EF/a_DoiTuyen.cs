namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

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
}
