namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class a_DoiTuyen_SV
    {
        public int ID { get; set; }

        public int? ID_Doi { get; set; }

        public int? ID_SV { get; set; }

        public byte? TrangThai { get; set; }

        public string KetQua { get; set; }
    }
}
