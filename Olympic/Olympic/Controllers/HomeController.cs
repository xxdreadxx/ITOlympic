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
            var lstLichTrinh = db.Database.SqlQuery<LichTrinhs>(sql).OrderByDescending(x=>x.ID).ToList();
            var so_LichTrinh = lstLichTrinh.GroupBy(x => x.ID).Select(x => x.FirstOrDefault()).ToList();
            ViewBag.LichTrinh = lstLichTrinh;
            ViewBag.so_LichTrinh = so_LichTrinh;
            return View();
        }

        public ActionResult ThongTin()
        {
            var cuocthi = db.a_CuocThi.Where(x => x.TrangThai != 10).OrderByDescending(x=>x.ID).ToList();
            ViewBag.CuocThi = cuocthi;
            return View();
        }

        public JsonResult ViewQuyetDinh(int id)
        {
                var filequyetdinh = db.a_CuocThi.Where(x => x.ID == id && x.TrangThai != 10).FirstOrDefault();
                if (filequyetdinh != null)
                {
                    return Json(new
                    {
                        status = true,
                        filequyetdinh = filequyetdinh
                    }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new
                    {
                        status = false
                    }, JsonRequestBehavior.AllowGet);
                }
            
        }

        public ActionResult DanhSachCuocThi()
        {
            string sql_CuocThi = @"select lt.ID, ct.ID as IDCuocThi, ct.TenCuocThi, ct.ThoiGianBatDau, ct.ThoiGianKetThuc, lt.ThoiGianBatDauNhanHS, lt.ThoiGianKetThucNhanHS, lt.ThoiGianBatDauThi,
                        lt.ThoiGianKetThucThi, lt.ThoiGianBatDauChamDiem, lt.ThoiGianKetThucChamDiem, lt.ThoiGianCongBoDiem, ct.Nam from a_CuocThi ct
                        join a_CuocThi_LichTrinh lt on ct.ID = lt.IDCuocThi and lt.TrangThai <> 10
                        where ct.TrangThai <> 10";
            var lstLichTrinh = db.Database.SqlQuery<LichTrinhs>(sql_CuocThi).OrderByDescending(x => x.ID).ToList();
            ViewBag.CuocThi = lstLichTrinh;

            string sql = @"select ct.ID as IDCuocThi, ct.TenCuocThi, ct.ThoiGianBatDau, ct.ThoiGianKetThuc, hm.ID, hm.TenHangMuc, ct.TrangThai, lt.ThoiGianBatDauNhanHS, lt.ThoiGianKetThucNhanHS 
                        from a_CuocThi ct 
                        left join a_CuocThi_LichTrinh lt on lt.IDCuocThi = ct.ID and lt.TrangThai <> 10
                        join a_HangMuc hm on hm.ID_CuocThi = ct.ID and hm.TrangThai <> 10
                        where ct.TrangThai <> 10";
            var lstHangMucThi = db.Database.SqlQuery<CuocThiHangMuc>(sql).OrderByDescending(x => x.ID).ToList();
            ViewBag.lstHangMucThi = lstHangMucThi;
            return View();
        }

        public ActionResult DangKy()
        {
            return View();
        }
    }
}