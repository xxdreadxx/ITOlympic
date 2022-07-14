using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Olympic.Models
{
    public class CuocThiHangMuc
    {
        public int ID { get; set; }
        public int IDCuocThi { get; set; }
        public string TenCuocThi { get; set; }
        public string TenHangMuc { get; set; }
        public string ThoiGianBatDau { get; set; }
        public string ThoiGianKetThuc { get; set; }
        public string ThoiGianBatDauNhanHS { get; set; }
        public string ThoiGianKetThucNhanHS { get; set; }
        public byte TrangThai { get; set; }
    }
}