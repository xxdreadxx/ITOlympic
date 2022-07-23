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
        public JsonResult GetCuocThi(int type = 0)
        {
            List<a_CuocThi> data = new List<a_CuocThi>();
            if (type == 1)
            {
                data = db.a_CuocThi.Where(x => x.TrangThai == 1).ToList();
            }
            else
            {
                data = db.a_CuocThi.Where(x => x.TrangThai == 1 || x.TrangThai == 2).ToList();
            }
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCuocThiChuaTaoLichTrinh()
        {
            var data = db.a_CuocThi.Where(x => x.TrangThai == 1).ToList();
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailCuocThi(int id)
        {
            var data = db.a_CuocThi.Where(x => x.ID == id).FirstOrDefault();
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }
    }
}