namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class d_Lop
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string MaLop { get; set; }

        [StringLength(50)]
        public string TenLop { get; set; }

        public int? ID_Khoa { get; set; }

        public string MoTa { get; set; }

        public byte? TrangThai { get; set; }
    }
}
