namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class a_CuocThi_LichTrinh
    {
        public int ID { get; set; }

        public int? ID_CuocThi { get; set; }

        public string ThoiGian { get; set; }

        public string NoiDung { get; set; }

        public byte? TrangThai { get; set; }
    }
}
