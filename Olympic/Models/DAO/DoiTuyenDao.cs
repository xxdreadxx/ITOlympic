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
                    var _sqlStr = "select dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, count(ds.ID) as SoLuong, hm.SoLuong as SoLuongHM, gv.HoTen as HLV " +
                        "from a_DoiTuyen dt join a_HangMuc hm on hm.ID = dt.ID_HangMuc and hm.TrangThai <> 10 join a_GiaoVien gv on gv.ID = dt.ID_HLV " +
                        "join a_CuocThi ct on ct.ID = hm.ID_CuocThi left join a_DoiTuyen_SV ds on ds.ID_Doi = dt.ID and ds.TrangThai <> 10 " +
                        $"where ct.ID = {ID} and (dt.TenDoi like N'%{search}%' OR '{search}' = '') " +
                        "group by dt.ID, dt.ID_HangMuc, dt.ID_HLV, dt.KetQua, dt.MaDoi, dt.TenDoi, dt.TrangThai, hm.TenHangMuc, ct.TenCuocThi, gv.HoTen, hm.SoLuong";
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

        public a_DoiTuyenView getInfoDoiTuyen(int ID)
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
                        $"where dt.ID = {ID} " +
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
                        $"where ds.ID_Doi = {ID} and ds.TrangThai <> 10";
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
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = $"select * from a_SinhVien where TrangThai = 1 and ID not in (select ID_SV from a_DoiTuyen_SV where ID_Doi = {ID} and TrangThai <> 10) ";
                    lst = _conn.Query<a_SinhVien>(_sqlStr, null, commandType: CommandType.Text).ToList<a_SinhVien>();
                    return lst;
                }
                catch (Exception)
                {
                    return lst;
                }
            }
        }
    }
}