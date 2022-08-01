using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.EF
{
    public class BaoCao
    {
    }

    public class TKSLSVThamGiaThi
    {
        public int ID { get; set; }
        public string ThoiGianThi { get; set; }
        public string TenCuocThi { get; set; }
        public int CapThi { get; set; }
        public int SoLuongHangMuc { get; set; }
        public int SoLuongDoiThi { get; set; }
        public int SoLuongThiSinhThiCaNhan { get; set; }
        public int SoLuongThiSinhThiDoanDoi { get; set; }
        public int SoGiaiThuongDatDuoc { get; set; }
    }

    public class TKSVThamGiaThi
    {
        public int ID { get; set; }
        public string HoTen { get; set; }
        public string Lop { get; set; }
        public string TenCuocThi { get; set; }
        public string TenHangMucThi { get; set; }
        public double Diem { get; set; }
        public string KetQua { get; set; }
    }
}
