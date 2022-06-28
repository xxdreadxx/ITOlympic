﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using Models.EF;
using Models.DAO;
using System.IO;

namespace Olympic.Areas.Admin.Controllers
{
    public class CuocThiAdController : Controller
    {
        private OlympicDbContext db = new OlympicDbContext();
        public CuocThiDao ctDao = new CuocThiDao();

        // GET: Admin/CuocThiAd
        public ActionResult Index()
        {
            ctDao.updateStatusAuto();
            return View();
        }
        public ActionResult getList(string search = "", int page = 1)
        {
            int totalCount = 0;
            int pageSize = 15;
            int pageno = 0;
            pageno = page == null ? 1 : int.Parse(page.ToString());
            List<a_CuocThi> lstGV = new List<a_CuocThi>();
            var getdata = ctDao.getAll(search, ref totalCount);
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

            int CountDelete = ctDao.Delete(ListID);

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
            var data = ctDao.getByID(id);
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult checkMaCuocThi(string ma, int id)
        {
            var data = ctDao.checkMa(ma, id);

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
            if (ID == 0)
            {
                //thêm mới
                a_CuocThi gv = new a_CuocThi();
                gv.MaCuocThi = c["Ma"] != null ? c["Ma"].Trim() : "";
                gv.TenCuocThi = c["Ten"] != null ? c["Ten"].Trim() : "";
                gv.BTC = c["BTC"] != null ? c["BTC"].Trim() : "";
                gv.Cap = byte.Parse(c["Cap"].ToString());
                gv.GiaiThuong = c["GiaiThuong"] != null ? c["GiaiThuong"].Trim() : "";
                gv.KinhPhi = c["KinhPhi"] != null ? c["KinhPhi"].Trim() : "";
                gv.Nam = c["NamHoc"] != null ? c["NamHoc"].Trim() : "";
                gv.NoiDung = c["NoiDung"] != null ? c["NoiDung"].Trim() : "";
                gv.ThoiGianBatDau = c["TGBD"] != null ? c["TGBD"].Trim() : "";
                gv.ThoiGianKetThuc = c["TGKT"] != null ? c["TGKT"].Trim() : "";
                gv.TrangThai = 1;
                gv.NgayTao = DateTime.Now;
                gv.NguoiTao = user;
                if (file.Count > 0)
                {
                    if (file[0].ContentLength > 0)
                    {
                        string pathFolder = "/Content/File/CuocThi/";
                        Directory.CreateDirectory(Server.MapPath(pathFolder));
                        string nameAnh = file[0].FileName;
                        string pathFile = Path.Combine(Server.MapPath(pathFolder), nameAnh);
                        file[0].SaveAs(pathFile);
                        gv.FileDinhKem = pathFolder + nameAnh;
                    }
                }
                db.a_CuocThi.Add(gv);
                db.SaveChanges();
            }
            else
            {
                //sửa
                a_CuocThi gv = new a_CuocThi();
                gv.ID = ID;
                gv.MaCuocThi = c["Ma"] != null ? c["Ma"].Trim() : "";
                gv.TenCuocThi = c["Ten"] != null ? c["Ten"].Trim() : "";
                gv.BTC = c["BTC"] != null ? c["BTC"].Trim() : "";
                gv.Cap = byte.Parse(c["Cap"].ToString());
                gv.GiaiThuong = c["GiaiThuong"] != null ? c["GiaiThuong"].Trim() : "";
                gv.KinhPhi = c["KinhPhi"] != null ? c["KinhPhi"].Trim() : "";
                gv.Nam = c["NamHoc"] != null ? c["NamHoc"].Trim() : "";
                gv.NoiDung = c["NoiDung"] != null ? c["NoiDung"].Trim() : "";
                gv.ThoiGianBatDau = c["TGBD"] != null ? c["TGBD"].Trim() : "";
                gv.ThoiGianKetThuc = c["TGKT"] != null ? c["TGKT"].Trim() : "";
                gv.TrangThai = 1;
                gv.NgaySua = DateTime.Now;
                gv.NguoiSua = user;
                if (file.Count > 0)
                {
                    if (file[0].ContentLength > 0)
                    {
                        string pathFolder = "/Content/File/CuocThi/";
                        Directory.CreateDirectory(Server.MapPath(pathFolder));
                        string nameAnh = file[0].FileName;

                        string pathFile = Path.Combine(Server.MapPath(pathFolder), nameAnh);
                        file[0].SaveAs(pathFile);
                        gv.FileDinhKem = pathFolder + nameAnh;
                    }
                }
                var kt = ctDao.Edit(gv);
            }
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }
    }
}