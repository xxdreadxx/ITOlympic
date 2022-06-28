using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Models.DAO;
using Models.EF;

namespace Olympic.Areas.Admin.Controllers
{

    public class dGiaoVienController : Controller
    {
        private OlympicDbContext db = new OlympicDbContext();
        private UserDao dao = new UserDao();
        // GET: Admin/dGiaoVien
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult getList(string search =""  , int page = 1)
        {
            int totalCount = 0;
            int pageSize = 15;
            int pageno = 0;
            pageno = page == null ? 1 : int.Parse(page.ToString());
            List<a_GiaoVien> lstGV = new List<a_GiaoVien>();
            UserDao dao = new UserDao();
            var getdata = dao.getAllGiaoVien(search, ref totalCount);
            lstGV = getdata.Skip((pageno - 1) * pageSize).Take(pageSize).ToList();
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
            return PartialView(lstGV);
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
            var passwordEncrypted = MD5Hash(c["MatKhau"]);
            var ngaysinh = c["NgaySinh"];
            DateTime? birth = null;
            if (ngaysinh != "" && ngaysinh != null)
            {
              birth  = DateTime.ParseExact(ngaysinh, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            }
           
            if (ID == 0)
            {
                //thêm mới
                a_GiaoVien gv = new a_GiaoVien();
                gv.HoTen = c["HoTen"] != null ? c["HoTen"].Trim() : "";
                gv.Username = c["TenDangNhap"] != null ? c["TenDangNhap"].Trim() : "";
                gv.Password = passwordEncrypted;
                gv.LoaiTK = byte.Parse(c["KieuNguoiDung"].ToString());
                gv.Email = c["Email"] != null ? c["Email"].Trim() : "";
                gv.SDT = c["SDT"] != null ? c["SDT"].Trim() : "";
                gv.DiaChi = c["DiaChi"] != null ? c["DiaChi"].Trim() : "";
                gv.NgaySinh = birth;
                if(c["GioiTinh"]== "1")
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
                if (file.Count > 0)
                {
                    if (file[0].ContentLength > 0)
                    {
                        string pathFolder = "/Content/Images/Avatars/GiaoVien/";
                        Directory.CreateDirectory(Server.MapPath(pathFolder));
                        string nameAnh = file[0].FileName;
                        string pathFile = Path.Combine(Server.MapPath(pathFolder), nameAnh);
                        file[0].SaveAs(pathFile);
                        gv.Image = pathFolder + nameAnh;
                    }
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
                gv.Password = passwordEncrypted;
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
                if (file.Count > 0)
                {
                    if (file[0].ContentLength > 0)
                    {
                        string pathFolder = "/Content/Images/Avatars/GiaoVien/";
                        Directory.CreateDirectory(Server.MapPath(pathFolder));
                        string nameAnh = file[0].FileName;
                        string pathFile = Path.Combine(Server.MapPath(pathFolder), nameAnh);
                        file[0].SaveAs(pathFile);
                        gv.Image = pathFolder + nameAnh;
                    }
                }
                db.SaveChanges();
            }
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ChangeStatus(int id, byte trangthai)
        {
            int result = dao.ChangeStatus(id, trangthai);

            if (result <= 0)
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
        public static string MD5Hash(string input)
        {
            StringBuilder hash = new StringBuilder();
            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(input));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2"));
            }
            return hash.ToString();
        }

        public JsonResult Edit(int id)
        {
            var data = dao.getByID(id);
            string ngaysinh = "";
            if(data.NgaySinh != null)
            {
                ngaysinh = data.NgaySinh.GetValueOrDefault().ToString("yyyy-MM-dd");
            }
            return Json(new
            {
                status = true,
                data = data,
                ngaysinh = ngaysinh
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult checkTenDangNhap(string user, int id)
        {
            var data = dao.checkUsername(user, id);

            return Json(new
            {
                status = data,
            }, JsonRequestBehavior.AllowGet);
        }
    }
}