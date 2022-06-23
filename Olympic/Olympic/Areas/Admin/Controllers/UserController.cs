using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using Models.EF;
using Models.DAO;
using System.IO;

namespace Olympic.Areas.Admin.Controllers
{
    public class UserController : Controller
    {
        UserDao userDao = new UserDao();
        // GET: Admin/User
        public ActionResult Index()
        {
            if (Session["UserID"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            else
            {
                int userID = int.Parse(Session["UserID"].ToString());
                ViewBag.User = userDao.getByID(userID);
                return View();
            }
        }

        [HttpPost]
        public JsonResult UpdateInfo(FormCollection f)
        {
            a_GiaoVien item = new a_GiaoVien();
            HttpFileCollectionBase file = Request.Files;
            item.ID = int.Parse(f["ID"].ToString());
            item.HoTen = f["HoTen"].ToString();
            var ngaysinh = f["NgaySinh"];
            DateTime? birth = null;
            if (ngaysinh != null && ngaysinh != "")
            {
                birth = DateTime.ParseExact(ngaysinh, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            }
            item.NgaySinh = birth;
            item.DiaChi = f["DiaChi"].ToString();
            item.SDT = f["SDT"].ToString();
            item.Email = f["Email"].ToString();
            item.GioiTinh = f["GioiTinh"].ToString() == "0" ? false : true;
            if (file.Count > 0)
            {
                if (file[0].ContentLength > 0)
                {
                    string pathFolder = "/Content/Images/Avatars/";
                    Directory.CreateDirectory(Server.MapPath(pathFolder));
                    string pathFile = Path.Combine(Server.MapPath(pathFolder), file[0].FileName);
                    file[0].SaveAs(pathFile);
                    item.Image = pathFolder + "/" + file[0].FileName;
                }
            }
            byte kt = userDao.Edit(item);
            var nhanvien = userDao.getByID(item.ID);
            if (kt == 1)
            {
                return Json(new
                {
                    status = true,
                    ava = nhanvien.Image,
                    birth = nhanvien.NgaySinh.GetValueOrDefault().ToString("dd/MM/yyyy")
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
    }
}