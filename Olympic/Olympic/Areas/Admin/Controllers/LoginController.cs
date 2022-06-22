using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using Models.EF;
using Models.DAO;

namespace Olympic.Areas.Admin.Controllers
{
    public class LoginController : Controller
    {
        UserDao userDao = new UserDao();
        // GET: Admin/Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Resetpass()
        {
            return View();
        }

        public JsonResult Login(string username, string pass)
        {
            bool kt = true;
            string mess = "Đăng nhập thành công!";
            int kq = userDao.Login(username, pass);
            if (kq == 0)
            {
                kt = false;
                mess = "Tài khoản hoặc mật khẩu không chính xác, đăng nhập thất bại!";
            }
            else if (kq == 2)
            {
                kt = false;
                mess = "Tài khoản đang bị khóa, vui lòng liên hệ quản trị viên để mở khóa!";
            }
            else if (kq == 3)
            {
                kt = false;
                mess = "Tài khoản hết hạn sử dụng, vui lòng liên hệ quản trị viên để gia hạn!";
            }
            return Json(new
            {
                status = kt,
                mess = mess
            }, JsonRequestBehavior.AllowGet);
        }
    }
}