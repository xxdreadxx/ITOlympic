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
    public class NguoiThiController : Controller
    {
        DoiTuyenDao dtDao = new DoiTuyenDao();
        CuocThiDao ctDao = new CuocThiDao();
        HangMucDao hmDao = new HangMucDao();
        // GET: Admin/NguoiThi
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DSDoiThi(int idCuocThi = 0)
        {
            int sl = 0;
            ViewBag.CuocThi = ctDao.getByID(idCuocThi);
            ViewBag.HangMuc = hmDao.getByIDCuocThi(idCuocThi, 1, ref sl);
            Session["IDCuocThi"] = idCuocThi;
            return View();
        }

        public ActionResult getListDoiThi(string search = "", int page = 1)
        {
            int IDCuocThi = int.Parse(Session["IDCuocThi"].ToString());
            int totalCount = 0;
            int pageSize = 15;
            int pageno = 0;
            pageno = page == null ? 1 : int.Parse(page.ToString());
            List<a_DoiTuyenView> lstGV = new List<a_DoiTuyenView>();
            var getdata = dtDao.getListDoiTuyenByIDCuocThi(IDCuocThi, search, ref totalCount);
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