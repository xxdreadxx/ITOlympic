using Models.EF;
using System;
using System.Collections.Generic;
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
            var sql = @"select lt.ID, ct.MaCuocThi, ct.TenCuocThi, ct.TrangThai, ct.Cap from a_CuocThi_LichTrinh lt 
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
    }
}
