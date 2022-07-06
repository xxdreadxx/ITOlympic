﻿using System;
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
        UserDao uDao = new UserDao();
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
            ViewBag.lstHLV = uDao.lstHLV();
            Session["IDCuocThi"] = idCuocThi;
            return View();
        }

        public ActionResult getListDoiTuyen(string search = "", int page = 1)
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

        public JsonResult checkHLV(int IDHLV, int IDCuocThi)
        {
            var data = dtDao.checkHLV(IDHLV, IDCuocThi);
            return Json(new
            {
                status = data,
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit(int ID)
        {
            var data = dtDao.getInfoDoiTuyen(ID);
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        [ValidateInput(false)]
        public JsonResult SaveDoiThi(FormCollection c)
        {
            int IDReturn = 0;
            int ID = int.Parse(c["ID"].ToString());
            int user = int.Parse(Session["UserID"].ToString());
            if (ID == 0)
            {
                a_DoiTuyen gv = new a_DoiTuyen();
                gv.MaDoi = c["Ma"] != null ? c["Ma"].Trim() : "";
                gv.TenDoi = c["Ten"] != null ? c["Ten"].Trim() : "";
                gv.ID_HLV = c["IDHLV"] != null ? int.Parse(c["IDHLV"].Trim()) : 0;
                gv.ID_HangMuc = c["IDHangMuc"] != null ? int.Parse(c["IDHangMuc"].Trim()) : 0;
                gv.TrangThai = 1;
                gv.NgayTao = DateTime.Now;
                gv.NguoiTao = user;
                IDReturn = dtDao.Add(gv);
            }
            else
            {
                a_DoiTuyen gv = new a_DoiTuyen();
                gv.ID = ID;
                gv.MaDoi = c["Ma"] != null ? c["Ma"].Trim() : "";
                gv.TenDoi = c["Ten"] != null ? c["Ten"].Trim() : "";
                gv.ID_HLV = c["IDHLV"] != null ? int.Parse(c["IDHLV"].Trim()) : 0;
                gv.ID_HangMuc = c["IDHangMuc"] != null ? int.Parse(c["IDHangMuc"].Trim()) : 0;
                gv.TrangThai = 1;
                gv.NgaySua = DateTime.Now;
                gv.NguoiSua = user;
                IDReturn = dtDao.Edit(gv);
            }
            bool kt = true;
            if (IDReturn == 0)
            {
                kt = false;
            }
            return Json(new
            {
                status = kt
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteDoiTuyen(string ListID)
        {
            if (ListID == null || ListID.Length < 0)
                return Json(new
                {
                    status = false
                }, JsonRequestBehavior.AllowGet);

            int CountDelete = dtDao.DeleteDoiTuyen(ListID);

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
    }
}