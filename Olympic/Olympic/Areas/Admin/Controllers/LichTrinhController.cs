using Models.DAO;
using Models.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Olympic.Areas.Admin.Controllers
{
    public class LichTrinhController : Controller
    {
        private OlympicDbContext db = new OlympicDbContext();
        private LichTrinhDao dao = new LichTrinhDao();
        // GET: Admin/LichTrinh
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult getList(int page = 1)
        {
            int totalCount = 0;
            int pageSize = 15;
            int pageno = 0;
            pageno = page == null ? 1 : int.Parse(page.ToString());
            List<LichTrinhView> lstGV = new List<LichTrinhView>();
            var getdata = dao.lstAll();
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


    }
}