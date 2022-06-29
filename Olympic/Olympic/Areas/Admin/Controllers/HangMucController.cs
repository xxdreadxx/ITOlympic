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
    public class HangMucController : Controller
    {
        HangMucDao hmDao = new HangMucDao();
        // GET: Admin/HangMuc
        public ActionResult Index(int ID)
        {
            Session["ID_CuocThi"] = ID;
            return View();
        }

        public ActionResult getList(int type = 0, int page = 1)
        {
            int IDCuocThi = int.Parse(Session["ID_CuocThi"].ToString());
            int totalCount = 0;
            int pageSize = 15;
            int pageno = 0;
            pageno = page == null ? 1 : int.Parse(page.ToString());
            List<a_HangMuc> lstGV = new List<a_HangMuc>();
            var getdata = hmDao.getByIDCuocThi(IDCuocThi, type, ref totalCount);
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

        [HttpPost]
        public JsonResult Delete(string ListID)
        {
            if (ListID == null || ListID.Length < 0)
                return Json(new
                {
                    status = false
                }, JsonRequestBehavior.AllowGet);

            int CountDelete = hmDao.Delete(ListID);

            if (CountDelete <= 0)
            {
                return Json(new
                {
                    status = false
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit(int id)
        {
            var data = hmDao.getByID(id);
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult checkMaHangMuc(string ma, int id)
        {
            var data = hmDao.checkMa(ma, id);

            return Json(new
            {
                status = data,
            }, JsonRequestBehavior.AllowGet);
        }

        [ValidateInput(false)]
        public JsonResult Save(FormCollection c)
        {
            HttpFileCollectionBase file = Request.Files;
            int ID = int.Parse(c["ID"].ToString());
            int user = int.Parse(Session["UserID"].ToString());
            
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }
    }
}