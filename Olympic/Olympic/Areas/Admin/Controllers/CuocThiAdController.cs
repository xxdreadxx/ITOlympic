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
    public class CuocThiAdController : Controller
    {
        public CuocThiDao ctDao = new CuocThiDao();

        // GET: Admin/CuocThiAd
        public ActionResult Index()
        {
            return View();
        }
    }
}