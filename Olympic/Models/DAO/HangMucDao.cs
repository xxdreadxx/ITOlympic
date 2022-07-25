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
    public class HangMucDao
    {
        OlympicDbContext db = new OlympicDbContext();

        public List<a_HangMuc> getByIDCuocThi(int ID, int type, ref int totalCount)
        {
            List<a_HangMuc> lst = new List<a_HangMuc>();
            if (type != 0)
            {
                lst = db.a_HangMuc.Where(x => x.TrangThai != 10 && x.DoiTuong == type && x.ID_CuocThi ==ID).ToList();
            }
            else
            {
                lst = db.a_HangMuc.Where(x => x.TrangThai != 10 && x.ID_CuocThi == ID).ToList();
            }
            totalCount = lst.Count();
            return lst.OrderBy(x => x.ID).ToList();
        }

        public int Delete(string ListID, int ID)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = $"update a_HangMuc set TrangThai = 10, NguoiSua={ID}, NgaySua='{DateTime.Now}' where ID in (select * from STRING_SPLIT('{convertArray}',','))";
                var upd1 = db.Database.ExecuteSqlCommand(_sqlStr);
            }
            catch (Exception ex)
            {
                return 0;
            }
            return 1;
        }

        public a_HangMuc getByID(int id)
        {
            return db.a_HangMuc.FirstOrDefault(x => x.ID == id);
        }

        public a_HangMuc getByIDDT(int id)
        {
            int IDHM = db.a_DoiTuyen.FirstOrDefault(x => x.ID == id).ID_HangMuc.GetValueOrDefault();
            return db.a_HangMuc.FirstOrDefault(x => x.ID == IDHM);
        }

        public int Add(a_HangMuc result)
        {
            try
            {
                db.a_HangMuc.Add(result);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public byte Edit(a_HangMuc result)
        {
            var item = db.a_HangMuc.FirstOrDefault(x => x.ID == result.ID);
            if (item == null)
            {
                return 0;
            }
            else
            {
                item.MaHangMuc = result.MaHangMuc;
                item.TenHangMuc = result.TenHangMuc;
                item.ThoiGianBatDau = result.ThoiGianBatDau;
                item.ThoiGianKetThuc = result.ThoiGianKetThuc;
                item.GiaiThuong = result.GiaiThuong;
                item.DoiTuong = result.DoiTuong;
                item.HinhThucThi = result.HinhThucThi;
                item.NoiDungThi = result.NoiDungThi;
                item.NguoiSua = result.NguoiSua;
                item.NgaySua = result.NgaySua;
                db.SaveChanges();
                return 1;
            }
        }

        public byte ChangeStatus(int ID, byte status, int IDNguoiSua)
        {
            var item = db.a_HangMuc.FirstOrDefault(x => x.ID == ID);
            if (item == null)
            {
                return 0;
            }
            else
            {
                item.TrangThai = status;
                item.NguoiSua = IDNguoiSua;
                item.NgaySua = DateTime.Now;
                db.SaveChanges();
                return 1;
            }
        }

        public int ChangeStatusMore(string ListID, byte status, int ID)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = $"update a_HangMuc set TrangThai = {status}, NguoiSua={ID}, NgaySua='{DateTime.Now}' where ID in (select * from dbo.SplitDelimiterString('{convertArray}',','))";
                var upd = db.Database.ExecuteSqlCommand(_sqlStr);
            }
            catch (Exception)
            {
                return 0;
            }
            return 1;
        }

        public bool checkMa(string ma, int id, int idCuocThi)
        {
            var item = db.a_HangMuc.FirstOrDefault(x => x.MaHangMuc == ma && x.TrangThai != 10 && x.ID != id && x.ID_CuocThi == idCuocThi);
            if (item != null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public bool checkLichTrinh(int id, string date)
        {
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = "select ct.* " +
                        "from a_CuocThi_LichTrinh ct " +
                        $"where ct.TrangThai <> 10 and (CONVERT(nvarchar, ct.ThoiGianBatDauThi, 103)) <= (CONVERT(nvarchar, '{date}', 103)) and (CONVERT(nvarchar, '{date}', 103)) <= (CONVERT(nvarchar, ct.ThoiGianKetThucThi, 103))";
                    var lst = _conn.Query<a_CuocThi>(_sqlStr, null, commandType: CommandType.Text).ToList<a_CuocThi>();
                    int totalCount = lst.Count();
                    if (totalCount > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

    }
}