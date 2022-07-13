using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Olympic.Models
{
    public class LichTrinhs
    {
        public int ID { get; set; }
        public int IDCuocThi { get; set; }
        public string TenCuocThi { get; set; }
        public string ThoiGianBatDau { get; set; }
        public string ThoiGianBatDauNhanHS { get; set; }
        public string ThoiGianKetThucNhanHS { get; set; }
        public string ThoiGianBatDauThi { get; set; }
        public string ThoiGianKetThucThi { get; set; }
        public string ThoiGianBatDauChamDiem { get; set; }
        public string ThoiGianKetThucChamDiem { get; set; }
        public string ThoiGianCongBoDiem { get; set; }
        public string ThoiGianKetThuc { get; set; }
        public string Nam { get; set; }
    }
}