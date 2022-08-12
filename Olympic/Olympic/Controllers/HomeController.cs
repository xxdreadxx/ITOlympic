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
            var cuocthi = db.a_CuocThi.Where(x => x.TrangThai != 10).ToList();
            ViewBag.CuocThi = cuocthi;
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

        public ActionResult DangKy(int id = 0)
        {
            ViewBag.IDHangMuc = id;
            //ViewBag.IDCuocThi = idCuocThi;
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
            //int idCuocThi = int.Parse(c["IDCuocThi"]);

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
                sv.MaSV = c["MaHocSinh"].ToString().Trim();
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

        public JsonResult KetQuaTraCuuHoSo(string type,  string mahocsinh, string sobaodanh, int cuocthi, int hangmuc)
        {
            ViewBag.ThongTinHoSo = null;
            ViewBag.KetQuaTuyenSinh = null;
            ViewBag.Type = type;

                string _sql = "";
                string ketquatracuu;
            ThongTin thongTinHoSo = new ThongTin();

            // Mã học sinh 
            if (type == "2")
            {
                _sql = $@"select sv.ID, sv.MaSV, sv.HoTen, sv.NgaySinh, sv.GioiTinh, sv.Lop, hm.DoiTuong, sv.SDT, sv.Email, sv.NgayTao, hmdiem.TrangThai
                                from a_SinhVien sv
                                join a_HangMuc_SinhVien_Diem hmdiem on hmdiem.ID_SV = sv.ID
                                join a_HangMuc hm on hm.ID = hmdiem.ID_HangMuc
                                where sv.TrangThai <> 10 and LOWER(sv.MaSV)=LOWER(N'{mahocsinh}') and hm.ID = {hangmuc} ";

                thongTinHoSo = db.Database.SqlQuery<ThongTin>(_sql).FirstOrDefault();

                KetQua ketqua = new KetQua();
                var doituongthi = 0;
                if (thongTinHoSo != null)
                {
                    string sqlKetQua = "";
                  
                    doituongthi = thongTinHoSo.DoiTuong;
                    int idSV = thongTinHoSo.ID;
                    //1: thi đội; 2: cá nhân
                    if (doituongthi == 1)
                    {
                        sqlKetQua = $@"select distinct hm.TenHangMuc, hm.HinhThucThi, diem.Diem, cn.KetQua as GiaiThuong, cn.TenDoi
                                        from a_HangMuc hm
                                        join a_HangMuc_SinhVien_Diem diem on diem.ID_HangMuc = hm.ID  and diem.TrangThai <> 10
                                        join a_DoiTuyen cn on cn.ID_HangMuc = hm.ID and cn.TrangThai <> 10
                                        where hm.TrangThai <> 10 and diem.ID_SV = {idSV}";
                        ketqua = db.Database.SqlQuery<KetQua>(sqlKetQua).FirstOrDefault();
                    }
                    else
                    {
                        sqlKetQua = $@"select distinct hm.TenHangMuc, hm.HinhThucThi, diem.Diem, cn.GiaiThuong
                                        from a_HangMuc hm
                                        join a_HangMuc_SinhVien_Diem diem on diem.ID_HangMuc = hm.ID  and diem.TrangThai <> 10
                                        join a_ThiCaNhan cn on cn.ID_HangMuc = hm.ID and cn.TrangThai <> 10
                                        where hm.TrangThai <> 10 and diem.ID_SV = {idSV}";
                        ketqua = db.Database.SqlQuery<KetQua>(sqlKetQua).FirstOrDefault();
                    }
                }

                var lichtrinh = db.a_CuocThi_LichTrinh.Where(x => x.IDCuocThi == cuocthi && x.TrangThai != 10).FirstOrDefault();
                DateTime congbo = DateTime.ParseExact(lichtrinh.ThoiGianCongBoDiem, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                var test = DateTime.Now.ToString("dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                DateTime thoiGianHienTai = DateTime.ParseExact(test, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                if (congbo >= thoiGianHienTai)
                {
                    ViewBag.ThoiGianCongBo = true;
                }
                else
                {
                    ViewBag.ThoiGianCongBo = false;
                }
                ViewBag.DoiTuong = doituongthi;
                ViewBag.KetQuaTuyenSinh = ketqua;
                ViewBag.ThongTinHoSo = thongTinHoSo;
            }
            ketquatracuu = ConvertViewToString(string.Concat("~/Views/Home/KetQuaTraCuu.cshtml").Replace("//", "/"), null);

            return Json(new
            {
                status = 2,
                ketquatracuu,
            }, JsonRequestBehavior.AllowGet);

        }
        private string ConvertViewToString(string viewName, object model)
        {
            ViewData.Model = model;
            using (StringWriter writer = new StringWriter())
            {
                ViewEngineResult vResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                ViewContext vContext = new ViewContext(this.ControllerContext, vResult.View, ViewData, new TempDataDictionary(), writer);
                vResult.View.Render(vContext, writer);
                return writer.ToString();
            }
        }
        public JsonResult GetHangMuc(int cuocthi)
        {
            var data = db.a_HangMuc.Where(x =>x.ID_CuocThi == cuocthi && x.TrangThai != 10).ToList();

            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }
    }
}