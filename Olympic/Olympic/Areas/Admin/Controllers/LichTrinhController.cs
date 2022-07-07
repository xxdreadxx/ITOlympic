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
        private CuocThiDao ctdao = new CuocThiDao();
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

        [HttpPost]
        public JsonResult Delete(string ListID)
        {
            if (ListID == null || ListID.Length < 0)
                return Json(new
                {
                    status = false
                }, JsonRequestBehavior.AllowGet);

            int CountDelete = dao.Delete(ListID);

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

        [ValidateInput(false)]
        public JsonResult Save(FormCollection c)
        {
            HttpFileCollectionBase file = Request.Files;
            int ID = int.Parse(c["ID"].ToString());
            int user = int.Parse(Session["UserID"].ToString());
            a_CuocThi_LichTrinh gv = new a_CuocThi_LichTrinh();
            if (ID == 0)
            {
                //thêm mới
                gv.IDCuocThi = int.Parse(c["IDCuocThi"]);
                gv.ThoiGianBatDauNhanHS = c["TGBDNhanHoSo"];
                gv.ThoiGianKetThucNhanHS = c["TGBDKTNhanHoSo"];
                gv.ThoiGianBatDauThi = c["TGBDThi"];
                gv.ThoiGianKetThucThi = c["TGKTThi"];
                gv.ThoiGianBatDauChamDiem = c["TGBDChamDiem"];
                gv.ThoiGianKetThucChamDiem = c["TGKTChamDiem"];
                gv.DiaDiem = c["DiaDiem"];
                gv.ThoiGianCongBoDiem = c["TGCongBo"] ;
                gv.NgayTao = DateTime.Now;
                gv.NguoiTao = user;
                var kt = dao.Add(gv);
            }
            else
            {
                //sửa
                gv.ID = ID;
                gv.ThoiGianBatDauNhanHS = c["TGBDNhanHoSo"];
                gv.ThoiGianKetThucNhanHS = c["TGBDKTNhanHoSo"];
                gv.ThoiGianBatDauThi = c["TGBDThi"];
                gv.ThoiGianKetThucThi = c["TGKTThi"];
                gv.ThoiGianBatDauChamDiem = c["TGBDChamDiem"];
                gv.ThoiGianKetThucChamDiem = c["TGKTChamDiem"];
                gv.DiaDiem = c["DiaDiem"];
                gv.ThoiGianCongBoDiem = c["TGCongBo"];
                gv.NguoiSua = user;
                gv.NgaySua = DateTime.Now;
                var kt = dao.Edit(gv);
            }
            return Json(new
            {
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit(int id)
        {
            var data = dao.getByID(id);
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getDataCuocThi(int id)
        {
            var data = ctdao.getByID(id);
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult checkTG(string tg)
        {
            int IDCuocThi = int.Parse(Session["ID_CuocThi"].ToString());
            bool kt = dao.checkLichTrinh(IDCuocThi, tg);
            return Json(new
            {
                status = kt
            }, JsonRequestBehavior.AllowGet);
        }

    }
}