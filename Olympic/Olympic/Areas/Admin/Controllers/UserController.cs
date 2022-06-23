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
    }
}