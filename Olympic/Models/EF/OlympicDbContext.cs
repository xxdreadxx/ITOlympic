using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace Models.EF
{
    public partial class OlympicDbContext : DbContext
    {
        public OlympicDbContext()
            : base("name=OlympicDbContext")
        {
        }

        public virtual DbSet<a_CuocThi> a_CuocThi { get; set; }
        public virtual DbSet<a_DoiTuyen> a_DoiTuyen { get; set; }
        public virtual DbSet<a_DoiTuyen_SV> a_DoiTuyen_SV { get; set; }
        public virtual DbSet<a_GiaoVien> a_GiaoVien { get; set; }
        public virtual DbSet<a_HangMuc> a_HangMuc { get; set; }
        public virtual DbSet<a_HangMuc_SinhVien_Diem> a_HangMuc_SinhVien_Diem { get; set; }
        public virtual DbSet<a_SinhVien> a_SinhVien { get; set; }
        public virtual DbSet<a_ThiCaNhan> a_ThiCaNhan { get; set; }
        public virtual DbSet<a_CuocThi_LichTrinh> a_CuocThi_LichTrinh { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
