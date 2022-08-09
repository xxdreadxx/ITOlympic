using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Models;
using Models.EF;

namespace Models.DAO
{
    public class DoiTuyenDao
    {
        OlympicDbContext db = new OlympicDbContext();

        public List<a_DoiTuyenView> getListDoiTuyenByIDCuocThi(int ID, string search, ref int totalCount)
        {
            List<a_DoiTuyenView> lst = new List<a_DoiTuyenView>();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = "select dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, count(ds.ID) as SoLuong, hm.SoLuong as SoLuongHM, gv.HoTen as HLV, lt.ThoiGianBatDauChamDiem " +
                        "from a_DoiTuyen dt join a_HangMuc hm on hm.ID = dt.ID_HangMuc and hm.TrangThai <> 10 join a_GiaoVien gv on gv.ID = dt.ID_HLV " +
                        "join a_CuocThi ct on ct.ID = hm.ID_CuocThi " +
                        "left join a_CuocThi_LichTrinh lt on lt.IDCuocThi = ct.ID and lt.TrangThai <> 10 "+
                        "left join a_DoiTuyen_SV ds on ds.ID_Doi = dt.ID and ds.TrangThai <> 10 " +
                        $"where ct.ID = {ID} and (dt.TenDoi like N'%{search}%' OR '{search}' = '') " +
                        "group by dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, gv.HoTen, hm.SoLuong, lt.ThoiGianBatDauChamDiem";
                    lst = _conn.Query<a_DoiTuyenView>(_sqlStr, null, commandType: CommandType.Text).ToList<a_DoiTuyenView>();
                    totalCount = lst.Count();
                    return lst;
                }
                catch (Exception)
                {
                    totalCount = 0;
                    return lst;
                }
            }
        }

        public List<a_DoiTuyenView> getListDoiTuyenByIDHangMuc(int ID, ref int totalCount)
        {
            List<a_DoiTuyenView> lst = new List<a_DoiTuyenView>();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = "select dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, count(ds.ID) as SoLuong, gv.HoTen as HLV " +
                        "from a_DoiTuyen dt join a_HangMuc hm on hm.ID = dt.ID_HangMuc and hm.TrangThai <> 10 join a_GiaoVien gv on gv.ID = dt.ID_HLV " +
                        "join a_CuocThi ct on ct.ID = hm.ID_CuocThi join a_DoiTuyen_SV ds on ds.ID_Doi = dt.ID and ds.TrangThai <> 10 " +
                        $"where hm.ID = {ID} " +
                        "group by dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, gv.HoTen";
                    lst = _conn.Query<a_DoiTuyenView>(_sqlStr, null, commandType: CommandType.Text).ToList<a_DoiTuyenView>();
                    totalCount = lst.Count();
                    return lst;
                }
                catch (Exception)
                {
                    totalCount = 0;
                    return lst;
                }
            }
        }

        public a_DoiTuyenView getInfoDoiTuyen(int ID, int type)
        {
            a_DoiTuyenView lst = new a_DoiTuyenView();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                string _sqlStr = "";
                _conn.Open();
                try
                {
                    if (type == 0)
                    {
                        _sqlStr = "select dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, count(ds.ID) as SoLuong, gv.HoTen as HLV " +
                        "from a_DoiTuyen dt join a_HangMuc hm on hm.ID = dt.ID_HangMuc and hm.TrangThai <> 10 join a_GiaoVien gv on gv.ID = dt.ID_HLV " +
                        "join a_CuocThi ct on ct.ID = hm.ID_CuocThi join a_DoiTuyen_SV ds on ds.ID_Doi = dt.ID and ds.TrangThai <> 10 " +
                        "join a_CuocThi_LichTrinh lt on lt.IDCuocThi = ct.ID " +
                        $"where dt.ID = {ID} and convert(date, lt.ThoiGianBatDauNhanHS, 103) <= GETDATE() and GETDATE()<= convert(date, lt.ThoiGianKetThucNhanHS, 103) " +
                        "group by dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, gv.HoTen";
                    }
                    else
                    {
                        _sqlStr = "select dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, count(ds.ID) as SoLuong, gv.HoTen as HLV " +
                        "from a_DoiTuyen dt join a_HangMuc hm on hm.ID = dt.ID_HangMuc and hm.TrangThai <> 10 join a_GiaoVien gv on gv.ID = dt.ID_HLV " +
                        "join a_CuocThi ct on ct.ID = hm.ID_CuocThi join a_DoiTuyen_SV ds on ds.ID_Doi = dt.ID and ds.TrangThai <> 10 " +
                        "join a_CuocThi_LichTrinh lt on lt.IDCuocThi = ct.ID " +
                        $"where dt.ID = {ID} " +
                        "group by dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, gv.HoTen";
                    }
                    lst = _conn.Query<a_DoiTuyenView>(_sqlStr, null, commandType: CommandType.Text).FirstOrDefault();
                    return lst;
                }
                catch (Exception)
                {
                    return lst;
                }
            }
        }

        public a_DoiTuyenView checkChamDiem(int ID)
        {
            a_DoiTuyenView lst = new a_DoiTuyenView();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = "select dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, count(ds.ID) as SoLuong, gv.HoTen as HLV " +
                        "from a_DoiTuyen dt join a_HangMuc hm on hm.ID = dt.ID_HangMuc and hm.TrangThai <> 10 join a_GiaoVien gv on gv.ID = dt.ID_HLV " +
                        "join a_CuocThi ct on ct.ID = hm.ID_CuocThi join a_DoiTuyen_SV ds on ds.ID_Doi = dt.ID and ds.TrangThai <> 10 " +
                        "join a_CuocThi_LichTrinh lt on lt.IDCuocThi = ct.ID " +
                        $"where dt.ID = {ID} and convert(date, lt.ThoiGianBatDauChamDiem, 103) <= GETDATE() and GETDATE()<= convert(date, lt.ThoiGianKetThucChamDiem, 103) " +
                        "group by dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, gv.HoTen";
                    lst = _conn.Query<a_DoiTuyenView>(_sqlStr, null, commandType: CommandType.Text).FirstOrDefault();
                    return lst;
                }
                catch (Exception)
                {
                    return lst;
                }
            }
        }

        public List<a_HangMuc_SinhVien_Diem_View> getListSVInDoiTuyen(int ID, ref int totalCount)
        {
            List<a_HangMuc_SinhVien_Diem_View> lst = new List<a_HangMuc_SinhVien_Diem_View>();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = "select hs.*, hm.TenHangMuc, ct.TenCuocThi, sv.HoTen as TenSV , sv.MaSV, sv.Lop, hm.ThoiGianBatDau, hm.ThoiGianKetThuc " +
                        "from a_DoiTuyen_SV ds join a_SinhVien sv on sv.ID = ds.ID_SV join a_DoiTuyen dt on dt.ID = ds.ID_Doi " +
                        "join a_HangMuc hm on hm.ID = dt.ID_HangMuc join a_HangMuc_SinhVien_Diem hs on hs.ID_HangMuc = hm.ID and ds.ID_SV = hs.ID_SV join a_CuocThi ct on ct.ID = hm.ID_CuocThi " +
                        $"where ds.ID_Doi = {ID} and ds.TrangThai = 1";
                    lst = _conn.Query<a_HangMuc_SinhVien_Diem_View>(_sqlStr, null, commandType: CommandType.Text).ToList<a_HangMuc_SinhVien_Diem_View>();
                    totalCount = lst.Count();
                    return lst;
                }
                catch (Exception)
                {
                    totalCount = 0;
                    return lst;
                }
            }
        }

        public List<a_HangMuc_SinhVien_Diem_View> getListSVCNInHangMuc(int ID, ref int totalCount)
        {
            List<a_HangMuc_SinhVien_Diem_View> lst = new List<a_HangMuc_SinhVien_Diem_View>();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = "select hs.*, hm.TenHangMuc, ct.TenCuocThi, sv.HoTen as TenSV , sv.MaSV, sv.Lop, hm.ThoiGianBatDau, hm.ThoiGianKetThuc " +
                        "from a_HangMuc_SinhVien_Diem hs join a_HangMuc hm on hm.ID = hs.ID_HangMuc and hm.TrangThai <>10 " +
                        "join a_CuocThi ct on ct.ID = hm.ID_CuocThi join a_SinhVien sv on sv.ID = hs.ID_SV and hs.TrangThai <> 10 " +
                        $"where hm.ID = {ID} " +
                        "group by dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, sv.MaSV, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, gv.HoTen";
                    lst = _conn.Query<a_HangMuc_SinhVien_Diem_View>(_sqlStr, null, commandType: CommandType.Text).ToList<a_HangMuc_SinhVien_Diem_View>();
                    totalCount = lst.Count();
                    return lst;
                }
                catch (Exception)
                {
                    totalCount = 0;
                    return lst;
                }
            }
        }

        public bool checkHLV(int HLVID, int CTID)
        {
            List<a_HangMuc_SinhVien_Diem> lst = new List<a_HangMuc_SinhVien_Diem>();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = "select dt.* from a_DoiTuyen dt join a_HangMuc hm on hm.ID = dt.ID_HangMuc" +
                        $"where hm.ID_CuocThi = {CTID} and ID_HLV = {HLVID} and hm.TrangThai <> 10 ";
                    lst = _conn.Query<a_HangMuc_SinhVien_Diem>(_sqlStr, null, commandType: CommandType.Text).ToList<a_HangMuc_SinhVien_Diem>();
                    if(lst.Count >= 1)
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public int Add(a_DoiTuyen item)
        {
            try
            {
                db.a_DoiTuyen.Add(item);
                db.SaveChanges();
                return item.ID;
            }
            catch
            {
                return 0;
            }
        }

        public int Edit(a_DoiTuyen item)
        {
            try
            {
                var result = db.a_DoiTuyen.FirstOrDefault(x => x.ID == item.ID);
                if(result != null)
                {
                    result.ID_HangMuc = item.ID_HangMuc;
                    result.ID_HLV = item.ID_HLV;
                    result.MaDoi = item.MaDoi;
                    result.TenDoi = item.TenDoi;
                    result.NguoiSua = item.NguoiSua;
                    result.NgaySua = DateTime.Now;
                }
                db.SaveChanges();
                return item.ID;
            }
            catch
            {
                return 0;
            }
        }

        public int DeleteDoiTuyen(string ListID)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = "update a_DoiTuyen set TrangThai = 10 where ID in (select * from dbo.SplitDelimiterString(@lstMa,','))";
                var maTinParam1 = new SqlParameter("@lstMa", convertArray);
                var delete = db.Database.ExecuteSqlCommand(_sqlStr, maTinParam1);
            }
            catch (Exception)
            {
                return 0;
            }
            return 1;
        }

        public List<a_SinhVien> getListSVChuaDK(int ID)
        {
            List<a_SinhVien> lst = new List<a_SinhVien>();
            int IDHM = db.a_DoiTuyen.FirstOrDefault(x => x.ID == ID).ID_HangMuc.GetValueOrDefault();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = $"select * from a_SinhVien where TrangThai = 1 and ID in (select ID_SV from a_HangMuc_SinhVien_Diem where ID_HangMuc = {IDHM} and TrangThai = 2) ";
                    lst = _conn.Query<a_SinhVien>(_sqlStr, null, commandType: CommandType.Text).ToList<a_SinhVien>();
                    return lst;
                }
                catch (Exception)
                {
                    return lst;
                }
            }
        }

        public bool DelSVFromDoiTuyen(int IDSV, int IDDoiTuyen)
        {
            bool kt = true;
            var item = db.a_DoiTuyen_SV.FirstOrDefault(x => x.ID_Doi == IDDoiTuyen && x.ID_SV == IDSV && x.TrangThai == 1);
            if(item != null)
            {
                var IDHM = db.a_DoiTuyen.FirstOrDefault(x => x.ID == IDDoiTuyen).ID_HangMuc;
                var item1 = db.a_HangMuc_SinhVien_Diem.FirstOrDefault(x => x.ID_SV == IDSV && x.TrangThai == 1 && x.ID_HangMuc == IDHM);
                if (item1 != null)
                {
                    item1.TrangThai = 2;
                }
                item.TrangThai = 10;
                db.SaveChanges();
                kt = true;
            }
            else
            {
                kt = false;
            }
            return kt;
        }

        public bool AddSVFromLstToDoiThi(int IDDoiTuyen, int IDSinhVien)
        {
            bool kt = true;
            var IDHM = db.a_DoiTuyen.FirstOrDefault(x => x.ID == IDDoiTuyen).ID_HangMuc;
            var ktTS = db.a_HangMuc_SinhVien_Diem.FirstOrDefault(x => x.ID_HangMuc == IDHM && x.ID_SV == IDSinhVien && x.TrangThai == 2);
            if(ktTS != null)
            {
                ktTS.TrangThai = 1;
                db.SaveChanges();
                a_DoiTuyen_SV ds = new a_DoiTuyen_SV();
                ds.ID_Doi = IDDoiTuyen;
                ds.ID_SV = IDSinhVien;
                ds.NgayTao = DateTime.Now;
                ds.TrangThai = 1;
                db.a_DoiTuyen_SV.Add(ds);
                db.SaveChanges();
                kt = true;
            }
            else
            {
                a_DoiTuyen_SV ds = new a_DoiTuyen_SV();
                ds.ID_Doi = IDDoiTuyen;
                ds.ID_SV = IDSinhVien;
                ds.NgayTao = DateTime.Now;
                ds.TrangThai = 1;
                db.a_DoiTuyen_SV.Add(ds);
                db.SaveChanges();

                a_HangMuc_SinhVien_Diem hsd = new a_HangMuc_SinhVien_Diem();
                hsd.ID_HangMuc = IDHM;
                hsd.ID_SV = IDSinhVien;
                hsd.NgayTao = DateTime.Now;
                hsd.TrangThai = 1;
            }
            return kt;
        }

        public int CountSVinDoiTuyen(int IDDoiTuyen)
        {
            return db.a_DoiTuyen_SV.Where(x => x.ID_Doi == IDDoiTuyen && x.TrangThai == 1).ToList().Count();
        }

        public int UpdateKQ(int id, string kq)
        {
            try
            {
                var result = db.a_DoiTuyen.FirstOrDefault(x => x.ID == id);
                if (result != null)
                {
                    result.KetQua = kq;
                    result.TrangThai = 3;
                }
                db.SaveChanges();
                return id;
            }
            catch
            {
                return 0;
            }
        }

        public CaNhanView DuyetTSThiCaNhan(int id)
        {
            var item = db.a_HangMuc_SinhVien_Diem.FirstOrDefault(x => x.ID == id);
            int id_hangmuc = item.ID_HangMuc.GetValueOrDefault();
            a_ThiCaNhan thi = new a_ThiCaNhan();
            thi.ID_HangMuc = id_hangmuc;
            thi.ID_SV = item.ID_SV;
            thi.NgayTao = DateTime.Now;
            thi.TrangThai = 1;
            db.a_ThiCaNhan.Add(thi);
            db.SaveChanges();
            if (item != null)
            {
                item.TrangThai = 1;
                db.SaveChanges();

                string sql = $@"select sv.ID, hmcv.ID as IDHM_SV, sv.MaSV, hmcv.SoBaoDanh, sv.HoTen, hm.TenHangMuc, hmcv.TrangThai, hmcv.Diem, cn.GiaiThuong from a_SinhVien sv
                        join a_HangMuc_SinhVien_Diem hmcv on sv.ID = hmcv.ID_SV and hmcv.TrangThai <> 10
                        join a_HangMuc hm on hm.ID = hmcv.ID_HangMuc
                        join a_CuocThi ct on ct.ID = hm.ID_CuocThi
                        left join a_ThiCaNhan cn on cn.ID_SV = hmcv.ID_SV and cn.ID_HangMuc = hmcv.ID_HangMuc
                        where sv.TrangThai <> 10 and hmcv.ID = {id} and hm.DoiTuong = 2 and hm.TrangThai <> 10";
                var data = db.Database.SqlQuery<CaNhanView>(sql).FirstOrDefault();
                return data;
            }
            else
            {
                return null;
            }
        }

        public bool checkTGDel(int idCuocThi)
        {
            List<a_CuocThi_LichTrinh> lst = new List<a_CuocThi_LichTrinh>();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = $"select lt.* from a_CuocThi_LichTrinh lt where convert(date, lt.ThoiGianBatDauNhanHS, 103) <= GETDATE() and GETDATE()<= convert(date, lt.ThoiGianKetThucNhanHS, 103) and lt.IDCuocThi = {idCuocThi} ";
                    lst = _conn.Query<a_CuocThi_LichTrinh>(_sqlStr, null, commandType: CommandType.Text).ToList<a_CuocThi_LichTrinh>();
                    if (lst.Count >= 1)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public bool DelTSCN(int id)
        {
            var tskm = db.a_HangMuc_SinhVien_Diem.FirstOrDefault(x => x.ID == id && x.TrangThai != 10);
            if(tskm != null)
            {
                var tcn = db.a_ThiCaNhan.FirstOrDefault(x => x.ID_HangMuc == tskm.ID_HangMuc && x.ID_SV == tskm.ID_SV && x.TrangThai != 10);
                if(tcn != null)
                {
                    tcn.TrangThai = 10;
                    db.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}