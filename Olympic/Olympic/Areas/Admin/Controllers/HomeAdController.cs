using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using Models.DAO;
using Models.EF;

namespace Olympic.Areas.Admin.Controllers
{
    public class HomeAdController : Controller
    {
        private OlympicDbContext db = new OlympicDbContext();
        UserDao userDao = new UserDao();
        // GET: Admin/Home
        public ActionResult Index()
        {
            if (Session["UserID"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            int userID = int.Parse(Session["UserID"].ToString());
            ViewBag.User = userDao.getByID(userID);
            Session["UserImg"] = ViewBag.User.Image;
            Session["UserHoTen"] = ViewBag.User.HoTen;
            return View();
        }
        public JsonResult GetCuocThi()
        {
            var data = db.a_CuocThi.Where(x => x.TrangThai != 10 && x.TrangThai != 3).ToList();
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDetailCuocThi(int id)
        {
            var data = db.a_CuocThi.Where(x => x.ID == id).FirstOrDefault();
            var tgiankt = String.Format("{0}/{1}/{2}", data.ThoiGianKetThuc.Substring(6, 2), data.ThoiGianKetThuc.Substring(4, 2), data.ThoiGianKetThuc.Substring(0, 4));
            var tgianbd = String.Format("{0}/{1}/{2}", data.ThoiGianBatDau.Substring(6, 2), data.ThoiGianBatDau.Substring(4, 2), data.ThoiGianBatDau.Substring(0, 4));
            return Json(new
            {
                status = true,
                data = data,
                tgbd= tgianbd,
                tgkt=tgiankt
            }, JsonRequestBehavior.AllowGet);
        }
    }
}