using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Olympic.Areas.Admin.Controllers
{
    public class HomeAdController : Controller
    {
        // GET: Admin/Home
        public ActionResult Index()
        {
            if (Session["UserID"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
    }
}