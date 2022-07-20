using System;
using System.Collections.Generic;
using System.IO;
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
            var lstLichTrinh = db.Database.SqlQuery<LichTrinhs>(sql).OrderByDescending(x => x.ID).ToList();
            var so_LichTrinh = lstLichTrinh.GroupBy(x => x.ID).Select(x => x.FirstOrDefault()).ToList();
            ViewBag.LichTrinh = lstLichTrinh;
            ViewBag.so_LichTrinh = so_LichTrinh;
            return View();
        }

        public ActionResult ThongTin()
        {
            var cuocthi = db.a_CuocThi.Where(x => x.TrangThai != 10).OrderByDescending(x => x.ID).ToList();
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

        public ActionResult DangKy(int idCuocThi = 0,int idHangMuc = 0)
        {
            ViewBag.IDHangMuc = idHangMuc;
            ViewBag.IDCuocThi = idCuocThi;
            return View();
        }

        [ValidateInput(false)]
        public JsonResult SaveThongTin()
        {
            var c = Request.Form;
            HttpFileCollectionBase fileDinhKem_TenFile = Request.Files;
            string mahocsinh = c["MaHocSinh"].ToString().Trim().ToLower();
            string email = c["Email"].ToString().Trim();
            string gioitinh = c["GioiTinh"];
            string ngaysinh = c["NgaySinh"];
            string hoten = c["HoTen"].ToString().Trim();
            string lop = c["Lop"].ToString().Trim();
            string sodienthoai = c["SoDienThoai"].ToString().Trim();
            int ID = int.Parse(c["ID"].ToString());
            int idHangMuc = int.Parse(c["idHangMuc"]);
            int idCuocThi = int.Parse(c["IDCuocThi"]);

            var checkExist = db.a_SinhVien.FirstOrDefault(x => x.MaSV.ToLower() == mahocsinh && x.TrangThai != 10 && x.ID != ID);
            if ((mahocsinh != "" && mahocsinh != null) && checkExist != null)
            {
                return Json(new
                {
                    status = false,
                    error = "Mã học sinh đã tồn tại",
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                a_SinhVien sv = new a_SinhVien();
                sv.MaSV = mahocsinh;
                sv.HoTen = hoten;
                sv.Email = email;
                if (gioitinh == "1")
                {
                    sv.GioiTinh = 1;
                }
                else
                {
                    sv.GioiTinh = 0;
                }

                if (fileDinhKem_TenFile.Count > 0)
                {
                    if (fileDinhKem_TenFile[0].ContentLength > 0)
                    {
                        string pathFolder = "/Content/Images/Avatars/SinhVien/";
                        Directory.CreateDirectory(Server.MapPath(pathFolder));
                        string nameAnh = fileDinhKem_TenFile[0].FileName;
                        string pathFile = Path.Combine(Server.MapPath(pathFolder), nameAnh);
                        fileDinhKem_TenFile[0].SaveAs(pathFile);
                        sv.AnhHoSo = pathFolder + nameAnh;
                    }
                }

                sv.NgaySinh = ngaysinh;
                sv.Lop = lop;
                sv.SDT = sodienthoai;
                sv.TrangThai = 1;
                sv.NgayTao = DateTime.Now;
                sv.NguoiTao = 0;
                db.a_SinhVien.Add(sv);
                db.SaveChanges();

                var sinhvien = db.a_SinhVien.Where(x => x.ID == sv.ID).FirstOrDefault();
                a_HangMuc_SinhVien_Diem hm_sv = new a_HangMuc_SinhVien_Diem();
                hm_sv.ID_SV = sv.ID;
                hm_sv.ID_HangMuc = idHangMuc;
                hm_sv.TrangThai = 2;
                hm_sv.NgayTao = DateTime.Now;
                hm_sv.NguoiTao = 0;
                db.a_HangMuc_SinhVien_Diem.Add(hm_sv);
                db.SaveChanges();

                return Json(new
                {
                    status = true,
                    error = "Đăng ký thành công"
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}