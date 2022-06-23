using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using Models.EF;
using Models.DAO;
using System.Text;
using System.Security.Cryptography;

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
            string passmd5 = MD5Hash(pass);
            int kq = userDao.Login(username, passmd5);
            if (kq == 0)
            {
                kt = false;
                mess = "Tài khoản hoặc mật khẩu không chính xác, đăng nhập thất bại!";
            }
            else if (kq == 2)
            {
                kt = false;
                mess = "Tài khoản đang bị dừng dử dụng, vui lòng liên hệ quản trị viên!";
            }
            else
            {
                Session["UserID"] = userDao.getByUsername(username, passmd5);
            }
            return Json(new
            {
                status = kt,
                mess = mess
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
    }
}