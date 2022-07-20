using System;
using System.Collections.Generic;
using System.IO;
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
            ViewBag.Search = search;
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
            HttpFileCollectionBase file = Request.Files;
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
                a_SinhVien gv = new a_SinhVien();
                gv.MaSV = c["MaSV"] != null ? c["MaSV"].Trim() : "";
                gv.HoTen = c["HoTen"] != null ? c["HoTen"].Trim() : "";
                gv.Email = c["Email"] != null ? c["Email"].Trim() : "";
                gv.SDT = c["SDT"] != null ? c["SDT"].Trim() : "";
                gv.Lop = c["Lop"] != null ? c["Lop"].Trim() : "";
                gv.DiaChi = c["DiaChi"] != null ? c["DiaChi"].Trim() : "";
                gv.NgaySinh = birth.GetValueOrDefault().ToString("dd/MM/yyyy");
                if (c["GioiTinh"] == "1")
                {
                    gv.GioiTinh = 1;
                }
                else
                {
                    gv.GioiTinh = 0;
                }
                if (c["KichHoat"] == "1")
                {
                    gv.TrangThai = 1;
                }
                else
                {
                    gv.TrangThai = 2;
                }
                
                if (file.Count > 0)
                {
                    if (file[0].ContentLength > 0)
                    {
                        string pathFolder = "/Content/Images/Avatars/SinhVien/";
                        Directory.CreateDirectory(Server.MapPath(pathFolder));
                        string nameAnh = file[0].FileName;
                        string pathFile = Path.Combine(Server.MapPath(pathFolder), nameAnh);
                        file[0].SaveAs(pathFile);
                        gv.AnhHoSo = pathFolder + nameAnh;
                    }
                }
                int IDNew = dao.Add(gv);
            }
            else
            {
                //sửa
                a_SinhVien gv = new a_SinhVien();
                gv.ID = ID;
                gv.MaSV = c["MaSV"] != null ? c["MaSV"].Trim() : "";
                gv.HoTen = c["HoTen"] != null ? c["HoTen"].Trim() : "";
                gv.Email = c["Email"] != null ? c["Email"].Trim() : "";
                gv.SDT = c["SDT"] != null ? c["SDT"].Trim() : "";
                gv.DiaChi = c["DiaChi"] != null ? c["DiaChi"].Trim() : "";
                gv.Lop = c["Lop"] != null ? c["Lop"].Trim() : "";
                gv.NgaySinh = birth.GetValueOrDefault().ToString("dd/MM/yyyy");
                if (c["GioiTinh"] == "1")
                {
                    gv.GioiTinh = 1;
                }
                else
                {
                    gv.GioiTinh = 0;
                }
                gv.TrangThai = 1;
                if (file.Count > 0)
                {
                    if (file[0].ContentLength > 0)
                    {
                        string pathFolder = "/Content/Images/Avatars/SinhVien/";
                        Directory.CreateDirectory(Server.MapPath(pathFolder));
                        string nameAnh = file[0].FileName;
                        string pathFile = Path.Combine(Server.MapPath(pathFolder), nameAnh);
                        file[0].SaveAs(pathFile);
                        gv.AnhHoSo = pathFolder + nameAnh;
                    }
                }
                var kt = dao.Edit(gv);
            }
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit(int id)
        {
            var data = dao.getByID(id);
            string NgaySinh = "";
            if (data.NgaySinh != null) {
                NgaySinh = DateTime.ParseExact(data.NgaySinh, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            
            return Json(new
            {
                status = true,
                data = data,
                NgaySinh = NgaySinh
            }, JsonRequestBehavior.AllowGet);
        }
    }
}