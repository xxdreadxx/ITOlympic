using Dapper;
using Models.EF;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DAO
{
    public  class LichTrinhDao
    {
        OlympicDbContext db = new OlympicDbContext();
        public List<LichTrinhView> lstAll()
        {
            List<LichTrinhView> lst = new List<LichTrinhView>();
            var sql = @"select lt.ID, ct.ID, ct.MaCuocThi, ct.TenCuocThi, ct.TrangThai, ct.Cap from a_CuocThi_LichTrinh lt 
                        join a_CuocThi ct on ct.ID =lt.IDCuocThi
                        where lt.TrangThai <> 10 order by ct.ID desc";
            lst = db.Database.SqlQuery<LichTrinhView>(sql).ToList();
            return lst;
        }

        public int Delete(string ListID)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = $"update a_CuocThi_LichTrinh set TrangThai = 10 where ID in (select * from STRING_SPLIT('{convertArray}',','))";
                var upd1 = db.Database.ExecuteSqlCommand(_sqlStr);
            }
            catch (Exception ex)
            {
                return 0;
            }
            return 1;
        }

        public a_CuocThi_LichTrinh getByID(int ID)
        {
            return db.a_CuocThi_LichTrinh.FirstOrDefault(x => x.ID == ID);
        }

        public bool checkLichTrinh(int id, string date)
        {
            using (SqlConnection _conn = new SqlConnection(ConnectionLib.ConnectString))
            {
                _conn.Open();
                try
                {
                    var _sqlStr = @"select ct.* " +
                        "from a_CuocThi ct " +
                        $"where ct.TrangThai <> 10 and (CONVERT(DATE, ThoiGianBatDau, 103)) <= (CONVERT(DATE, '{date}', 103)) and (CONVERT(DATE, '{date}', 103)) <= (CONVERT(DATE, ThoiGianKetThuc, 103))";
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
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public int Add(a_CuocThi_LichTrinh result)
        {
            try
            {
                db.a_CuocThi_LichTrinh.Add(result);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public byte Edit(a_CuocThi_LichTrinh result)
        {
            var item = db.a_CuocThi_LichTrinh.FirstOrDefault(x => x.ID == result.ID);
            if (item == null)
            {
                return 0;
            }
            else
            {
                item.ThoiGianBatDauNhanHS = result.ThoiGianBatDauNhanHS;
                item.ThoiGianKetThucNhanHS = result.ThoiGianKetThucNhanHS;
                item.ThoiGianBatDauThi = result.ThoiGianBatDauThi;
                item.ThoiGianKetThucThi = result.ThoiGianKetThucThi;
                item.ThoiGianBatDauChamDiem = result.ThoiGianBatDauChamDiem;
                item.ThoiGianKetThucChamDiem = result.ThoiGianKetThucChamDiem;
                item.DiaDiem = result.DiaDiem;
                item.ThoiGianCongBoDiem = result.ThoiGianCongBoDiem;
                item.NgaySua = result.NgaySua;
                item.NguoiSua = result.NguoiSua;
                db.SaveChanges();
                return 1;
            }
        }
    }
}