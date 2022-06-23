using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models.DAO;
using Models.EF;

namespace Olympic.Areas.Admin.Controllers
{
    public class SinhVienController : Controller
    {
        // GET: Admin/SinhVien
        private OlympicDbContext db = new OlympicDbContext();
        private SinhVienDao dao = new SinhVienDao();
        // GET: Admin/dGiaoVien
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult getList(string search = "", int page = 1)
        {
            int totalCount = 0;
            int pageSize = 15;
            int pageno = 0;
            pageno = page == null ? 1 : int.Parse(page.ToString());
            List<a_SinhVien> lstSV = new List<a_SinhVien>();
            var getdata = dao.lstAll(search, ref totalCount);
            lstSV = getdata.Skip((pageno - 1) * pageSize).Take(pageSize).ToList();
            ViewBag.Page = page;
            int maxCount = totalCount;
            if (maxCount % pageSize > 0)
            {
                ViewBag.MaxPage = (maxCount / pageSize + 1);
            }
            else
            {
                ViewBag.MaxPage = (maxCount / pageSize);
            }
            return PartialView(lstSV);
        }

        [HttpPost]
        public JsonResult Delete(string ListID)
        {
            if (ListID == null || ListID.Length < 0)
                return Json(new
                {
                    status = false
                }, JsonRequestBehavior.AllowGet);

            int CountDelete = dao.Delete(ListID);

            if (CountDelete <= 0)
            {
                return Json(new
                {
                    status = false
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [ValidateInput(false)]
        public JsonResult Save(FormCollection c)
        {
            int ID = int.Parse(c["ID"].ToString());
            var ngaysinh = c["NgaySinh"];
            DateTime? birth = null;
            if (ngaysinh != "" && ngaysinh != null)
            {
                birth = DateTime.ParseExact(ngaysinh, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            }

            if (ID == 0)
            {
                //thêm mới
                a_GiaoVien gv = new a_GiaoVien();
                gv.HoTen = c["HoTen"] != null ? c["HoTen"].Trim() : "";
                gv.Username = c["TenDangNhap"] != null ? c["TenDangNhap"].Trim() : "";
                gv.LoaiTK = byte.Parse(c["KieuNguoiDung"].ToString());
                gv.Email = c["Email"] != null ? c["Email"].Trim() : "";
                gv.SDT = c["SDT"] != null ? c["SDT"].Trim() : "";
                gv.DiaChi = c["DiaChi"] != null ? c["DiaChi"].Trim() : "";
                gv.NgaySinh = birth;
                if (c["GioiTinh"] == "1")
                {
                    gv.GioiTinh = true;
                }
                else
                {
                    gv.GioiTinh = false;
                }
                if (c["KichHoat"] == "1")
                {
                    gv.TrangThai = 1;
                }
                else
                {
                    gv.TrangThai = 2;
                }
                db.a_GiaoVien.Add(gv);
                db.SaveChanges();
            }
            else
            {
                //sửa
                a_GiaoVien gv = db.a_GiaoVien.FirstOrDefault(x => x.ID == ID);
                gv.HoTen = c["HoTen"] != null ? c["HoTen"].Trim() : "";
                gv.Username = c["TenDangNhap"] != null ? c["TenDangNhap"].Trim() : "";
                gv.LoaiTK = byte.Parse(c["KieuNguoiDung"].ToString());
                gv.Email = c["Email"] != null ? c["Email"].Trim() : "";
                gv.SDT = c["SDT"] != null ? c["SDT"].Trim() : "";
                gv.DiaChi = c["DiaChi"] != null ? c["DiaChi"].Trim() : "";
                gv.NgaySinh = birth;
                if (c["GioiTinh"] == "1")
                {
                    gv.GioiTinh = true;
                }
                else
                {
                    gv.GioiTinh = false;
                }
                if (c["KichHoat"] == "1")
                {
                    gv.TrangThai = 1;
                }
                else
                {
                    gv.TrangThai = 2;
                }
                db.SaveChanges();
            }
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit(int id)
        {
            var data = dao.getByID(id);
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }
    }
}