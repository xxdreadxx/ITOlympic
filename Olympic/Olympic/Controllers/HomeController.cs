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

        public JsonResult KetQuaTraCuuHoSo(string type, string mahoso, string mahocsinh, string matkhau, string sobaodanh, int namhoc, int truongthi)
        {
            ViewBag.ThongTinHoSo = null;
            ViewBag.KetQuaTuyenSinh = null;
            ViewBag.Type = type;

                string _sql = "";
                string ketquatracuu;
                //ThongTinHoSo thongTinHoSo = new ThongTinHoSo();

                // Mã học sinh 
               if (type == "2")
                {
                    _sql = $""+

                           $"where hs.TrangThai != 10 " +
                           $"and LOWER(hs.MaHocSinh)=LOWER(N''+ @mahocsinh + '') and kt.NamHoc= @namhoc ";

                    //object[] lstPara = {
                    //new SqlParameter("@mahocsinh",mahocsinh),
                    //new SqlParameter("@matkhau",matkhau),
                    //new SqlParameter("@namhoc",namhoc)
                    //};
                    //thongTinHoSo = db.Database.SqlQuery<ThongTinHoSo>(_sql, lstPara).FirstOrDefault();

                    #region Kết quả tra cứu - Kiên Giang
                    //lấy thông tin số báo danh trước khi lấy kết quả
                    //TS_KyThi_SoBaoDanh ketqua_sobaodanh = new TS_KyThi_SoBaoDanh();
                    //ketqua_sobaodanh = db.TS_KyThi_SoBaoDanh.FirstOrDefault(k => k.IDHocSinh == thongTinHoSo.IDHocSinh);
                    //if (ketqua_sobaodanh != null)
                    //{
                    //    TS_KetQuaTuyenSinh ketQua = new TS_KetQuaTuyenSinh();
                    //    ketQua = db.TS_KetQuaTuyenSinh.FirstOrDefault(k => k.SoBaoDanh == ketqua_sobaodanh.SoBaoDanh && k.TrangThai != 10);
                    //    ViewBag.KetQuaTuyenSinh = ketQua;
                    //}
                    #endregion

                }
                // Số báo danh
                else
                {
                    _sql = $"select hs.ID as IDHocSinh, hs.MaHoSo, hs.MaHocSinh, hs.HoTen, hs.NgaySinh, hs.GioiTinh, hs.NgayTao, sbd.SoBaoDanh, " +
                           $" t.TenTruong, hs_nv.TrangThai, hs.IDKyThi, hs_nv.TrangThai_Mail_Str, hs.DoiTuongTuyenThang, " +

                           "hs.DiaChiTT,(c0.TenDiaChi) as PhuongTT, (c.TenDiaChi) as QuanTT,(c1.TenDiaChi) as ThanhPhoTT, " +
                           "hs.DiaChiTamTru, (c2.TenDiaChi) as PhuongTamTru, (c3.TenDiaChi) as QuanTamTru, (c4.TenDiaChi) as ThanhPhoTamTru " +

                           $"from TS_HocSinh hs " +
                           $"left join TS_HocSinh_NguyenVong hs_nv on hs_nv.IDHocSinh = hs.ID " +
                           $"left join TS_Truong t on hs.IDTruong = t.ID " +
                           $"left join TS_KyThi_TaoKyThi kt on hs.IDKyThi = kt.ID " +
                           $"left join TS_KyThi_SoBaoDanh sbd on sbd.IDHocSinh = hs.ID and sbd.TrangThai != 10 " +
                           // Thường trú
                           "left join TS_DiaChi c on c.ID = hs.IDQuanTT " +
                           "left join TS_DiaChi c0 on c0.ID= hs.IDPhuongTT " +
                           "left join TS_DiaChi c1 on c1.ID = hs.IDTinhTT " +
                           // Tạm trú
                           "left join TS_DiaChi c2 on c2.ID= hs.IDPhuongTamTru  " +
                           "left join TS_DiaChi c3 on c3.ID = hs.IDQuanTamTru " +
                           "left join TS_DiaChi c4 on c4.ID = hs.IDTinhTamTru " +

                           $"where hs.TrangThai != 10 and sbd.SoBaoDanh = @sobaodanh and kt.NamHoc= @namhoc and sbd.IDTruongThi = @truongthi and sbd.MaDonViSuDung = (select MaDonViSuDung from TS_Truong where ID = @truongthi)";
                    //object[] lstPara = {
                    //new SqlParameter("@namhoc",namhoc),
                    //new SqlParameter("@sobaodanh",sobaodanh),
                    //new SqlParameter("@truongthi",truongthi)
                    //};
                    //thongTinHoSo = db.Database.SqlQuery<ThongTinHoSo>(_sql, lstPara).FirstOrDefault();


                    #region Kết quả tra cứu - Kiên Giang
                    //TS_KetQuaTuyenSinh ketQua = new TS_KetQuaTuyenSinh();
                    //ketQua = db.TS_KetQuaTuyenSinh.FirstOrDefault(k => k.SoBaoDanh == sobaodanh && k.TrangThai != 10);
                    //ViewBag.KetQuaTuyenSinh = ketQua;
                    #endregion
                }

                //if (thongTinHoSo != null)
                //{
                //    TS_KyThi_TaoKyThi kyThi = db.TS_KyThi_TaoKyThi.FirstOrDefault(k => k.ID == thongTinHoSo.IDKyThi && k.TrangThai != 10);

                //    //lấy ra thông tin thời gian đăng ký trực tiếp từ lịch trình tuyển sinh
                //    string sqlLichTrinh = "Select lttg.* from TS_LichTrinh_ThoiGian lttg " +
                //        "join TS_LichTrinh lt on lt.ID = lttg.IDLichTrinh and lt.TrangThai <> 10 " +
                //        $"where lt.IDKyThi = {kyThi.ID} and lttg.IDNoiDung = 7 ";
                //    TS_LichTrinh_ThoiGian objThoiGian = db.Database.SqlQuery<TS_LichTrinh_ThoiGian>(sqlLichTrinh).FirstOrDefault();
                //    if (objThoiGian == null)
                //    {
                //        ViewBag.ThoiGianCongBo = false;
                //    }
                //    else
                //    {
                //        string[] thoiGianStr = objThoiGian.ThoiGian.Split('-');
                //        DateTime tuNgay = DateTime.ParseExact(thoiGianStr[0], "dd/MM/yyyy", CultureInfo.InvariantCulture);
                //        //DateTime denNgay = DateTime.ParseExact(thoiGianStr[1], "dd/MM/yyyy", CultureInfo.InvariantCulture);

                //        DateTime ngayHienTai = DateTime.ParseExact(DateTime.Now.Date.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture), "dd/MM/yyyy", CultureInfo.InvariantCulture);
                //        if (tuNgay <= ngayHienTai)
                //        {
                //            ViewBag.ThoiGianCongBo = true;
                //        }
                //        else
                //        {
                //            ViewBag.ThoiGianCongBo = false;
                //        }
                //    }
                //    //Lấy danh sách điểm thi của thí sinh
                //    int cap = kyThi == null ? 0 : kyThi.DoiTuongTuyenSinh.Value;
                //    if (cap == 3)
                //    {
                //        //Lấy thông tin điểm ưu tiên
                //        string sqlUuTien = "Select SUM(isnull(dt.DiemCong,0)) from TS_HocSinh_DoiTuongUuTien dtut " +
                //            "join TS_DoiTuongUuTien dt on dt.ID = dtut.IDDoiTuongUuTien and dt.TrangThai != 10 " +
                //            $"where dtut.TrangThai != 10 and dtut.IDHocSinh = {thongTinHoSo.IDHocSinh} " +
                //            $"group by dtut.IDHocSinh ";
                //        double diemCong = db.Database.SqlQuery<double>(sqlUuTien).FirstOrDefault();
                //        thongTinHoSo.DiemUuTien = diemCong;

                //        string sqlDiemThi = "Select mt.Ma as MaMon, mt.Ten as TenMon, isnull((isnull(dt.DiemPhucKhao, dt.DiemThi) * isnull(ct.HeSo,0)),0) as DiemThi, ct.HeSo " +
                //            "from TS_KyThi_DiemThi dt " +
                //            "join TS_KyThi_SoBaoDanh sbd on sbd.ID = dt.IDSoBaoDanh and sbd.TrangThai <> 10 " +
                //            "join TS_MonThi mt on mt.ID = dt.IDMonThi and mt.TrangThai != 10 " +
                //            $"join TS_KyThi_CongThucTinhDiem ct on ct.IDMonThi = dt.IDMonThi and ct.TrangThai != 10 and ct.IDKyThi = {thongTinHoSo.IDKyThi} " +
                //            $"where dt.TrangThai != 10 and sbd.IDHocSinh = {thongTinHoSo.IDHocSinh}";

                //        List<KetQuaThi> lstKetQua = db.Database.SqlQuery<KetQuaThi>(sqlDiemThi).ToList();
                //        thongTinHoSo.lstKetQua = lstKetQua;
                //        thongTinHoSo.TongDiem = lstKetQua.Sum(k => k.DiemThi) + diemCong;
                //    }
                //    // Lấy ra danh sách tên trường đăng ký
                //    string sql_lstNguyenVong = "select nv.* , lc.TenLopChuyen, m.Ten as TenMonChuyen " +
                //        "from TS_HocSinh_NguyenVong nv " +
                //        "left join TS_LopChuyen lc on nv.IDLopChuyen = lc.ID and lc.TrangThai != 10 " +
                //        "left join TS_MonThi m on m.ID = nv.IDMonChuyen and m.TrangThai != 10 " +
                //        $"where nv.TrangThai != 10 and nv.IDHocSinh = {thongTinHoSo.IDHocSinh} ";
                //    var list_NguyenVong = db.Database.SqlQuery<HocSinh_NguyenVong>(sql_lstNguyenVong).ToList();
                //    //Lấy ra danh sách nguyện vọng hợp lệ
                //    //List<TS_HocSinh_NguyenVong> nguyenVong = db.TS_HocSinh_NguyenVong.Where(k => k.IDHocSinh == thongTinHoSo.IDHocSinh && k.TrangThai != 10).OrderBy(k => k.NguyenVong).ToList(); ;
                //    ViewBag.TrungTuyen = list_NguyenVong;
                //    ViewBag.Cap = cap;
                //    ViewBag.ListNguyenVong = list_NguyenVong;
                //    // Tìm danh sách điểm học bạ
                //    List<DoiTuongUuTien> lst_DTUT = new List<DoiTuongUuTien>();
                //    string sql_dtut = "select dt.* " +
                //                      "from TS_HocSinh_DoiTuongUuTien hs_dt " +
                //                      "left join TS_DoiTuongUuTien dt on dt.ID = hs_dt.IDDoiTuongUuTien " +
                //                      $"where IDHocSinh = {thongTinHoSo.IDHocSinh} and dt.TrangThai <> 10 and hs_dt.TrangThai <> 10 ";
                //    lst_DTUT = db.Database.SqlQuery<DoiTuongUuTien>(sql_dtut).ToList();
                //    // Tìm danh sách điểm học bạ
                //    List<TS_Diem_NguyenVong> lst_DiemHocBa = new List<TS_Diem_NguyenVong>();
                //    if (cap == 2 || cap == 3)
                //    {
                //        string sql_diemhocba = "select * " +
                //                               "from TS_Diem_NguyenVong " +
                //                               $"where IDHocSinh = {thongTinHoSo.IDHocSinh} and TrangThai<> 10 ";
                //        lst_DiemHocBa = db.Database.SqlQuery<TS_Diem_NguyenVong>(sql_diemhocba).ToList();
                //    }
                //    // View kết quả tra cứu
                //    ViewBag.ThongTinHoSo = thongTinHoSo;
                //    ketquatracuu = ConvertViewToString(string.Concat(currentPortal.Tb_Template.DuongDan, "/General/KetQuaTraCuuHoSo.cshtml").Replace("//", "/"), null);
                //    //var ketquatracuu = PartialView(string.Concat(currentPortal.Tb_Template.DuongDan, "/General/KetQuaTraCuuHoSo.cshtml").Replace("//", "/"));

                //    if (cap != 3) // Không phải cấp 3 thì mới hiện đơn
                //    {
                //        // View đơn đăng ký dự tuyển
                //        string don_dangkydutuyen = GetDonDangKyDuTuyen("TRACUU_TRANGCHU", thongTinHoSo.IDHocSinh, thongTinHoSo.IDKyThi, list_NguyenVong, lst_DiemHocBa, lst_DTUT);

                //        return Json(new
                //        {
                //            status = 1,
                //            nguyenVong = list_NguyenVong,
                //            don_dangkydutuyen,
                //            ketquatracuu,
                //        }, JsonRequestBehavior.AllowGet);
                //    }
                //}
                ketquatracuu =string.Concat("/General/KetQuaTraCuuHoSo.cshtml").Replace("//", "/"), null);

                return Json(new
                {
                    status = 2,
                    ketquatracuu,
                }, JsonRequestBehavior.AllowGet);
                //return PartialView(string.Concat(currentPortal.Tb_Template.DuongDan, "/General/KetQuaTraCuuHoSo.cshtml").Replace("//", "/"));
            }
        
    }
}