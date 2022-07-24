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
            int IDCuocThi = int.Parse(c["IDCuocThi"].ToString());
            int user = int.Parse(Session["UserID"].ToString());
            var ngaysinh = c["TGBDNhanHoSo"];
            var ngaysinh1 = c["TGBDKTNhanHoSo"];
            var ngaysinh2 = c["TGBDThi"];
            var ngaysinh3 = c["TGKTThi"];
            var ngaysinh4 = c["TGBDChamDiem"];
            var ngaysinh5 = c["TGKTChamDiem"];
            var ngaysinh6 = c["TGCongBo"];
            a_CuocThi_LichTrinh gv = new a_CuocThi_LichTrinh();
            DateTime? birth = null;
            DateTime? birth1 = null;
            DateTime? birth2 = null;
            DateTime? birth3 = null;
            DateTime? birth4 = null;
            DateTime? birth5 = null;
            DateTime? birth6 = null;
            birth = DateTime.ParseExact(ngaysinh, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            birth1 = DateTime.ParseExact(ngaysinh1, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            birth2 = DateTime.ParseExact(ngaysinh2, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            birth3 = DateTime.ParseExact(ngaysinh3, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            birth4 = DateTime.ParseExact(ngaysinh4, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            birth5 = DateTime.ParseExact(ngaysinh5, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            birth6 = DateTime.ParseExact(ngaysinh6, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            if (ID == 0)
            {
                //thêm mới
                gv.IDCuocThi = IDCuocThi;
                gv.ThoiGianBatDauNhanHS = birth.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianKetThucNhanHS = birth1.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianBatDauThi = birth2.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianKetThucThi = birth3.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianBatDauChamDiem = birth4.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianKetThucChamDiem = birth5.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.DiaDiem = c["DiaDiem"];
                gv.ThoiGianCongBoDiem = birth6.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.NgayTao = DateTime.Now;
                gv.NguoiTao = user;
                gv.TrangThai = 1;
                var kt = dao.Add(gv);
            }
            else
            {
                //sửa
                gv.ID = ID;
                gv.ThoiGianBatDauNhanHS = birth.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianKetThucNhanHS = birth1.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianBatDauThi = birth2.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianKetThucThi = birth3.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianBatDauChamDiem = birth4.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.ThoiGianKetThucChamDiem = birth5.GetValueOrDefault().ToString("dd/MM/yyyy");
                gv.DiaDiem = c["DiaDiem"];
                gv.ThoiGianCongBoDiem = birth6.GetValueOrDefault().ToString("dd/MM/yyyy");
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
            string ThoiGianBatDauNhanHS = "";
            if (data.ThoiGianBatDauNhanHS != null)
            {
                ThoiGianBatDauNhanHS = DateTime.ParseExact(data.ThoiGianBatDauNhanHS, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            string ThoiGianKetThucNhanHS = "";
            if (data.ThoiGianKetThucNhanHS != null)
            {
                ThoiGianKetThucNhanHS = DateTime.ParseExact(data.ThoiGianKetThucNhanHS, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            string ThoiGianBatDauThi = "";
            if (data.ThoiGianBatDauThi != null)
            {
                ThoiGianBatDauThi = DateTime.ParseExact(data.ThoiGianBatDauThi, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            string ThoiGianKetThucThi = "";
            if (data.ThoiGianKetThucThi != null)
            {
                ThoiGianKetThucThi = DateTime.ParseExact(data.ThoiGianKetThucThi, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            string ThoiGianBatDauChamDiem = "";
            if (data.ThoiGianBatDauChamDiem != null)
            {
                ThoiGianBatDauChamDiem = DateTime.ParseExact(data.ThoiGianBatDauChamDiem, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            string ThoiGianKetThucChamDiem = "";
            if (data.ThoiGianKetThucChamDiem != null)
            {
                ThoiGianKetThucChamDiem = DateTime.ParseExact(data.ThoiGianKetThucChamDiem, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            string ThoiGianCongBo = "";
            if (data.ThoiGianCongBoDiem != null)
            {
                ThoiGianCongBo = DateTime.ParseExact(data.ThoiGianCongBoDiem, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
            }
            data.ThoiGianBatDauNhanHS = ThoiGianBatDauNhanHS;
            data.ThoiGianBatDauThi = ThoiGianBatDauThi;
            data.ThoiGianBatDauChamDiem = ThoiGianBatDauChamDiem;
            data.ThoiGianKetThucNhanHS = ThoiGianKetThucNhanHS;
            data.ThoiGianKetThucThi = ThoiGianKetThucThi;
            data.ThoiGianKetThucChamDiem = ThoiGianKetThucChamDiem;
            data.ThoiGianCongBoDiem= ThoiGianCongBo;
            
            return Json(new
            {
                status = true,
                data = data
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getDataCuocThi(int id)
        {
            var data = ctdao.getByID(id);
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