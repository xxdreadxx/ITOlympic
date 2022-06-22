using System;
using System.Collections.Generic;
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
        public ActionResult Index(string search, int page = 1)
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
            return View(lstGV);
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
            var passwordEncrypted = MD5Hash(c["MatKhau"]);
            if (ID == 0)
            {
                //thêm mới
                a_GiaoVien gv = new a_GiaoVien();
                gv.HoTen = c["HoTen"] != null ? c["HoTen"].Trim() : "";
                gv.Username = c["user"] != null ? c["user"].Trim() : "";
                gv.Password = passwordEncrypted;
                gv.LoaiTK = byte.Parse(c["KieuNguoiDung"].ToString());
                gv.Email = c["Email"] != null ? c["Email"].Trim() : "";
                gv.SDT = c["SDT"] != null ? c["SDT"].Trim() : "";
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
                db.a_GiaoVien.Add(gv);
                db.SaveChanges();
            }
            else
            {
                //sửa
                a_GiaoVien gv = db.a_GiaoVien.FirstOrDefault(x => x.ID == ID);
                gv.HoTen = c["HoTen"] != null ? c["HoTen"].Trim() : "";
                gv.Username = c["user"] != null ? c["user"].Trim() : "";
                gv.Password = passwordEncrypted;
                gv.LoaiTK = byte.Parse(c["LoaiTK"].ToString());
                gv.Email = c["Email"] != null ? c["Email"].Trim() : "";
                gv.SDT = c["SDT"] != null ? c["SDT"].Trim() : "";
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

        public JsonResult BoKichHoat(int id)
        {
            var result = dao.ChangeStatus(id, 2);
            return Json(new
            {
                status = result
            });
        }
        public JsonResult KichHoat(int id)
        {
            var result = dao.ChangeStatus(id, 1);
            return Json(new
            {
                status = result
            });
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
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }
    }
}