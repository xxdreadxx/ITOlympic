using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Models;
using Models.DAO;
using Models.EF;
using Olympic.Models;

namespace Olympic.Areas.Admin.Controllers
{
    public class HomeAdController : Controller
    {
        private OlympicDbContext db = new OlympicDbContext();
        UserDao userDao = new UserDao();
        // GET: Admin/Home
        public ActionResult Index()
        {
            if (Session["UserID"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            int userID = int.Parse(Session["UserID"].ToString());
            ViewBag.User = userDao.getByID(userID);
            Session["UserImg"] = ViewBag.User.Image;
            Session["UserHoTen"] = ViewBag.User.HoTen;

            ViewBag.SLCuocThi = db.a_CuocThi.Where(x => x.TrangThai != 10).Count();
            ViewBag.SLGiaoVien = db.a_GiaoVien.Where(x => x.TrangThai != 10).Count();
            ViewBag.SLSinhVien = db.a_SinhVien.Where(x => x.TrangThai != 10).Count();
            ViewBag.SLDoiTuyen = db.a_DoiTuyen.Where(x => x.TrangThai != 10).Count();

            return View();
        }
        public JsonResult GetCuocThi(int type = 0)
        {
            List<a_CuocThi> data = new List<a_CuocThi>();
            if (type == 1)
            {
                data = db.a_CuocThi.Where(x => x.TrangThai == 1).ToList();
            }
            else
            {
                data = db.a_CuocThi.Where(x => x.TrangThai == 1 || x.TrangThai == 2).ToList();
            }
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCuocThiChuaTaoLichTrinh()
        {
            var data = db.a_CuocThi.Where(x => x.TrangThai == 1).ToList();
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDetailCuocThi(int id)
        {
            var data = db.a_CuocThi.Where(x => x.ID == id).FirstOrDefault();
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public List<string> CreateListYear(int? startYear, int? lastYear)
        {
            List<string> ListYear = new List<string>();
            for (int? i = startYear+1; i <= lastYear; i++)
            {
                ListYear.Add(i.ToString());
            }
            return ListYear;
        }

        public JsonResult GetlineChart()
        {
            int yearnow = DateTime.Now.Year;
            int year5 = yearnow - 5;
            List<string> ListYear = CreateListYear(year5, yearnow);
            List<ThongKe> lstData = new List<ThongKe>();
            if(ListYear != null)
            {
                foreach(var item in ListYear)
                {

                    string sql = $@"select  CONVERT(int,Year( ct.ThoiGianBatDau)) as Nam 
                            from a_HangMuc_SinhVien_Diem diem
                            join a_HangMuc hm on hm.ID = diem.ID_HangMuc 
                            join a_CuocThi ct on ct.ID = hm.ID_CuocThi and ct.TrangThai <> 10
                            where diem.TrangThai <> 10 and Nam = {int.Parse(item)}";
                    int soluong =  db.Database.SqlQuery<ThongKe>(sql).Count();
                    ThongKe tk = new ThongKe();
                    tk.Nam = int.Parse(item);
                    tk.SoLuong = soluong;
                    db.SaveChanges();
                    lstData.Add(tk);
                }
            }
            //var jsonSerializer = new JavaScriptSerializer();
            //string result = jsonSerializer.Serialize(lstData);

            //var jsonSerializer1 = new JavaScriptSerializer();
            //string result1 = jsonSerializer1.Serialize(ListYear);

            return Json(new
            {
                status = true,
                data = lstData,
                lstNam = ListYear
            }, JsonRequestBehavior.AllowGet);
        }
    }
}