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
            int user = int.Parse(Session["UserID"].ToString());
            if (ListID == null || ListID.Length < 0)
                return Json(new
                {
                    status = false
                }, JsonRequestBehavior.AllowGet);

            int CountDelete = hmDao.Delete(ListID, user);

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
            string ThoiGianBatDau = "";
            if (data.ThoiGianBatDau != null)
            {
                ThoiGianBatDau = DateTime.ParseExact(data.ThoiGianBatDau, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            string ThoiGianKetThuc = "";
            if (data.ThoiGianKetThuc != null)
            {
                ThoiGianKetThuc = DateTime.ParseExact(data.ThoiGianKetThuc, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            return Json(new
            {
                status = true,
                data = data,
                ThoiGianBatDau = ThoiGianBatDau,
                ThoiGianKetThuc = ThoiGianKetThuc
            }, JsonRequestBehavior.AllowGet);
        }

        [ValidateInput(false)]
        public JsonResult Save(FormCollection c)
        {
            int user = int.Parse(Session["UserID"].ToString());
            int IDCuocThi = int.Parse(Session["ID_CuocThi"].ToString());
            int ID = int.Parse(c["ID"].ToString());
            if (ID == 0)
            {
                    var ngaysinh = c["TGBD"];
                    var ngaysinh1 = c["TGKT"];
                    a_HangMuc item = new a_HangMuc();
                    item.MaHangMuc = c["Ma"].ToString().Trim();
                    item.ID_CuocThi = IDCuocThi;
                    item.TenHangMuc = c["Ten"].ToString().Trim();
                    item.DoiTuong = byte.Parse(c["DoiTuong"].ToString());
                    item.GiaiThuong = c["GiaiThuong"].ToString().Trim();
                    item.HinhThucThi = c["HinhThuc"].ToString().Trim();
                    item.NoiDungThi = c["NoiDung"].ToString().Trim();
                    item.SoLuong = int.Parse(c["SoLuong"].ToString());
                    item.ThoiGianBatDau = c["TGBD"].ToString().Trim();
                    item.ThoiGianBatDau = ngaysinh;
                    item.ThoiGianKetThuc = ngaysinh1;
                    item.NguoiTao = user;
                    item.NgayTao = DateTime.Now;
                    item.TrangThai = 1;
                    var idHM = hmDao.Add(item);
                
            }
            else
            {

                    var ngaysinh = c["TGBD"];
                    var ngaysinh1 = c["TGKT"];
                    
                    var item = hmDao.getByID(ID);
                    item.MaHangMuc = c["Ma"].ToString().Trim();
                    item.TenHangMuc = c["Ten"].ToString().Trim();
                    item.DoiTuong = byte.Parse(c["DoiTuong"].ToString());
                    item.GiaiThuong = c["GiaiThuong"].ToString().Trim();
                    item.HinhThucThi = c["HinhThuc"].ToString().Trim();
                    item.NoiDungThi = c["NoiDung"].ToString().Trim();
                    item.SoLuong = int.Parse(c["SoLuong"].ToString());
                    item.ThoiGianBatDau = c["TGBD"].ToString().Trim();
                    item.ThoiGianBatDau = ngaysinh;
                    item.ThoiGianKetThuc = ngaysinh1;
                    item.NguoiSua = user;
                    item.NgaySua = DateTime.Now;
                    var kt = hmDao.Edit(item);
                
            }
            
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult checkTG(string tg)
        {
            int IDCuocThi = int.Parse(Session["ID_CuocThi"].ToString());
            //DateTime? birth = null;
            //birth = DateTime.ParseExact(tg, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            //string tgn = birth.GetValueOrDefault().ToString("dd/MM/yyyy");
            bool kt = hmDao.checkLichTrinh(IDCuocThi, tg);
            return Json(new
            {
                status = kt
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult checkMaHangMuc(string ma, int id)
        {
            int IDCuocThi = int.Parse(Session["ID_CuocThi"].ToString());
            bool data = hmDao.checkMa(ma, id, IDCuocThi);

                return Json(new
                {
                    status = data
                }, JsonRequestBehavior.AllowGet);
            
        }
    }
}