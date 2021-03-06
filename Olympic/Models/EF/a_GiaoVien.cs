namespace Models.EF
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class a_GiaoVien
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string HoTen { get; set; }

        [StringLength(50)]
        public string Username { get; set; }

        [StringLength(50)]
        public string Password { get; set; }

        public byte? LoaiTK { get; set; }

        [StringLength(50)]
        public string MaGiaoVien { get; set; }

        public bool? GioiTinh { get; set; }

        [StringLength(50)]
        public string SDT { get; set; }

        [StringLength(50)]
        public string Email { get; set; }
        public string DiaChi { get; set; }
        public string Image { get; set; }
        public DateTime? NgaySinh { get; set; }

        public byte? TrangThai { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
        public int? NguoiTao { get; set; }
        public int? NguoiSua { get; set; }
    }
}
