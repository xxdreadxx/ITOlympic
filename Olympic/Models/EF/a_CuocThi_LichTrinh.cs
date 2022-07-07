using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.EF
{
    public partial class a_CuocThi_LichTrinh
    {
        public int ID { get; set; }
        public int IDCuocThi { get; set; }
        public string ThoiGianBatDauNhanHS { get; set; }
        public string ThoiGianKetThucNhanHS { get; set; }
        public string ThoiGianBatDauThi { get; set; }
        public string ThoiGianKetThucThi { get; set; }
        public string ThoiGianBatDauChamDiem { get; set; }
        public string ThoiGianKetThucChamDiem { get; set; }
        public string ThoiGianCongBoDiem { get; set; }
        public string DiaDiem{ get; set; }
        public byte? TrangThai{ get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
        public int? NguoiTao { get; set; }
        public int? NguoiSua { get; set; }
    }
    public class LichTrinhView
    {
        public int ID { get; set; }
        public int IDCuocThi { get; set; }
        public string MaCuocThi { get; set; }
        public string TenCuocThi { get; set; }
        public byte Cap { get; set; }
        public byte? TrangThai { get; set; }
    }
}
