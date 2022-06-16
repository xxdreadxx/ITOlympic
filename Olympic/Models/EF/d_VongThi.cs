namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class d_VongThi
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string MaVongThi { get; set; }

        [StringLength(50)]
        public string TenVongThi { get; set; }

        public byte? TrangThai { get; set; }
    }
}
