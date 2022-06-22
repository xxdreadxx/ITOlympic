using System;
using System.Collections.Generic;
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
            return lst;
        }

        public a_CuocThi getByID(int id)
        {
            return db.a_CuocThi.FirstOrDefault(x => x.ID == id);
        }
    }
}
