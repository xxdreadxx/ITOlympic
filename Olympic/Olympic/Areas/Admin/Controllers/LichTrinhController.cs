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
            if (ID == 0)
            {
                //thêm mới
                a_CuocThi_LichTrinh gv = new a_CuocThi_LichTrinh();
                gv.IDCuocThi = int.Parse(c["IDCuocThi"]);
                gv.ThoiGianBatDauNhanHoSo = c["TGBDNhanHoSo"];
                gv.ThoiGianKetThucNhanHoSo = c["TGBDKTNhanHoSo"];
                gv.ThoiGianBatDauThi = c["TGBDThi"];
                gv.ThoiGianKetThucThi = c["TGKTThi"];
                gv.DiaDiemThi = c["DiaDiem"];
                gv.ThoiGianCongBoKetQua = c["TGCongBo"] ;
                gv.NgayTao = DateTime.Now;
                gv.NguoiTao = user;
                db.a_CuocThi_LichTrinh.Add(gv);
                db.SaveChanges();
            }
            else
            {
                //sửa
                a_CuocThi_LichTrinh gv = db.a_CuocThi_LichTrinh.FirstOrDefault(x => x.ID == ID);
                gv.ThoiGianBatDauNhanHoSo = c["TGBDNhanHoSo"];
                gv.ThoiGianKetThucNhanHoSo = c["TGBDKTNhanHoSo"];
                gv.ThoiGianBatDauThi = c["TGBDThi"];
                gv.ThoiGianKetThucThi = c["TGKTThi"];
                gv.DiaDiemThi = c["DiaDiem"];
                gv.ThoiGianCongBoKetQua = c["TGCongBo"];
                gv.NgaySua = DateTime.Now;
                gv.NguoiSua = user;
                db.SaveChanges();
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

    }
}