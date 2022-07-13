using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models.EF;
using Olympic.Models;

namespace Olympic.Controllers
{
    public class HomeController : Controller
    {
        private OlympicDbContext db = new OlympicDbContext();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult TienIch()
        {
            return View();
        }
        public ActionResult TraCuu()
        {
            return View();
        }

        public ActionResult LichTrinh()
        {
            string sql = @"select lt.ID, ct.ID as IDCuocThi, ct.TenCuocThi, ct.ThoiGianBatDau, ct.ThoiGianKetThuc, lt.ThoiGianBatDauNhanHS, lt.ThoiGianKetThucNhanHS, lt.ThoiGianBatDauThi,
                        lt.ThoiGianKetThucThi, lt.ThoiGianBatDauChamDiem, lt.ThoiGianKetThucChamDiem, lt.ThoiGianCongBoDiem, ct.Nam from a_CuocThi ct
                        join a_CuocThi_LichTrinh lt on ct.ID = lt.IDCuocThi and lt.TrangThai <> 10
                        where ct.TrangThai <> 10";
            var lstLichTrinh = db.Database.SqlQuery<LichTrinhs>(sql).ToList();
            var so_LichTrinh = lstLichTrinh.GroupBy(x => x.ID).Select(x => x.FirstOrDefault()).ToList();
            ViewBag.LichTrinh = lstLichTrinh;
            ViewBag.so_LichTrinh = so_LichTrinh;
            return View();
        }

        public ActionResult ThongTin()
        {
            return View();
        }
        public ActionResult DanhSachCuocThi()
        {
            return View();
        }
    }
}