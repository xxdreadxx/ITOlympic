using System;
using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.EF;

namespace Models.DAO
{
    public class CuocThiDao
    {
        OlympicDbContext db = new OlympicDbContext();

        public List<a_CuocThi> getAll(string search, ref int totalCount)
        {
            List<a_CuocThi> lst = new List<a_CuocThi>();
            if (search == "")
            {
                lst = db.a_CuocThi.Where(x => x.TrangThai != 10).ToList();
            }
            else
            {
                lst = db.a_CuocThi.Where(x => x.TrangThai != 10 && x.TenCuocThi.Contains(search)).ToList();
            }
            totalCount = lst.Count();
            return lst.OrderByDescending(x=>x.ID).ToList();
        }
        public int Delete(string ListID)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = $"update a_CuocThi set TrangThai = 10 where ID in (select * from STRING_SPLIT('{convertArray}',','))";
                var upd1 = db.Database.ExecuteSqlCommand(_sqlStr);
            }
            catch (Exception ex)
            {
                return 0;
            }
            return 1;
        }
        public a_CuocThi getByID(int id)
        {
            return db.a_CuocThi.FirstOrDefault(x => x.ID == id);
        }

        public int Add(a_CuocThi result)
        {
            try
            {
                db.a_CuocThi.Add(result);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public byte Edit(a_CuocThi result)
        {
            var item = db.a_CuocThi.FirstOrDefault(x => x.ID == result.ID);
            if (item == null)
            {
                return 0;
            }
            else
            {
                item.MaCuocThi = result.MaCuocThi;
                item.TenCuocThi = result.TenCuocThi;
                item.BTC = result.BTC;
                item.Cap = result.Cap;
                if(result.FileDinhKem != null)
                {
                    item.FileDinhKem = result.FileDinhKem;
                }
                item.GiaiThuong = result.GiaiThuong;
                item.KinhPhi = result.KinhPhi;
                item.NoiDung = result.NoiDung;
                item.Nam = result.Nam;
                item.ThoiGianBatDau = result.ThoiGianBatDau;
                item.ThoiGianKetThuc = result.ThoiGianKetThuc;
                db.SaveChanges();
                return 1;
            }
        }

        public byte ChangeStatus(int ID, byte status)
        {
            var item = db.a_CuocThi.FirstOrDefault(x => x.ID == ID);
            if (item == null)
            {
                return 0;
            }
            else
            {
                item.TrangThai = status;
                db.SaveChanges();
                return 1;
            }
        }

        public int ChangeStatusMore(string ListID, byte status)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = $"update a_CuocThi set TrangThai = {status} where ID in (select * from dbo.SplitDelimiterString('{convertArray}',','))";
                var upd = db.Database.ExecuteSqlCommand(_sqlStr);
            }
            catch (Exception)
            {
                return 0;
            }
            return 1;
        }

        public void updateStatusAuto()
        {
            string dateNow = DateTime.Now.ToString("dd/MM/yyyy");
            string _sqlStr = $"update a_CuocThi set TrangThai = 2 where (CONVERT(DATE, ThoiGianBatDau, 103)) <= (CONVERT(DATE, '{dateNow}', 103)) and (CONVERT(DATE, '{dateNow}', 103)) <= (CONVERT(DATE, ThoiGianKetThuc, 103)) and TrangThai = 1";
            var upd = db.Database.ExecuteSqlCommand(_sqlStr);
            string _sqlStr1 = $"update a_CuocThi set TrangThai = 3 where (CONVERT(DATE, ThoiGianBatDau, 103)) < (CONVERT(DATE, '{dateNow}', 103)) and (CONVERT(DATE, '{dateNow}', 103)) > (CONVERT(DATE, ThoiGianKetThuc, 103)) and TrangThai = 2";
            var upd1 = db.Database.ExecuteSqlCommand(_sqlStr);
        }

        public int FindData(int id)
        {
            string dateNow = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString();
            int _result = 0;
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = $@"select * from a_CuocThi where TrangThai <> 10 and ID = {id} and ThoiGianBatDau <= {dateNow} and {dateNow} <= ThoiGianKetThuc";
                    _result = _conn.Query<a_CuocThi>(_sqlStr, null, commandType: CommandType.Text).ToList().Count();
                    return _result;
                }
                catch (Exception)
                {
                    return 0;
                }
            }
        }

        public bool checkMa(string ma, int id)
        {
            var item = db.a_CuocThi.FirstOrDefault(x => x.MaCuocThi == ma && x.TrangThai != 10 && x.ID != id);
            if (item != null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public List<a_CuocThiAdView> getCuocThiAd(string search, ref int totalCount)
        {
            List<a_CuocThiAdView> lst = new List<a_CuocThiAdView>();
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = "select ct.ID, ct.MaCuocThi, ct.TenCuocThi, ct.Nam, ct.ThoiGianBatDau, ct.ThoiGianKetThuc, ct.Cap, count(hm.ID) as SLHangMuc, ct.TrangThai " +
                        "from a_CuocThi ct left join a_HangMuc hm on ct.ID = hm.ID_CuocThi and hm.TrangThai <> 10 " +
                        $"where ct.TrangThai <> 10 and (ct.TenCuocThi like N'%{search}%' and '{search}' = '') " +
                        "group by ct.ID, ct.MaCuocThi, ct.TenCuocThi, ct.Nam, ct.ThoiGianBatDau, ct.ThoiGianKetThuc, ct.Cap, ct.TrangThai ";
                    lst = _conn.Query<a_CuocThiAdView>(_sqlStr, null, commandType: CommandType.Text).ToList<a_CuocThiAdView>();
                    totalCount = lst.Count();
                    return lst;
                }
                catch (Exception)
                {
                    totalCount = 0;
                    return null;
                }
            }
        }

        //public bool CheckDate(string date, int id)
        //{

        //}
    }
}
