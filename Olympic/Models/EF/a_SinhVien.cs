namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class a_SinhVien
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string MaSV { get; set; }

        [StringLength(50)]
        public string HoTen { get; set; }

        [StringLength(50)]
        public string Lop { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [StringLength(50)]
        public string SDT { get; set; }

        [StringLength(500)]
        public string DiaChi { get; set; }

        public byte? GioiTinh { get; set; }

        [StringLength(50)]
        public string NgaySinh { get; set; }

        public string AnhHoSo { get; set; }

        public byte? TrangThai { get; set; }
    }
}
