using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.EF;

namespace Models.DAO
{
    public class SinhVienDao
    {
        OlympicDbContext db = new OlympicDbContext();

        public List<a_SinhVien> lstAll(string search, ref int totalCount)
        {
            List<a_SinhVien> lst = new List<a_SinhVien>();
            if (search == "")
            {
                lst = db.a_SinhVien.Where(x => x.TrangThai != 10).ToList();
            }
            else
            {
                lst = db.a_SinhVien.Where(x => x.TrangThai != 10 && x.HoTen.Contains(search)).ToList();
            }
            totalCount = lst.Count();
            return lst;
        }

        public a_SinhVien getByID(int ID)
        {
            return db.a_SinhVien.FirstOrDefault(x => x.ID == ID);
        }

        public byte Add(a_SinhVien item)
        {
            try
            {
                db.a_SinhVien.Add(item);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public byte ChangeStatus(int ID, byte status)
        {
            var item = db.a_GiaoVien.FirstOrDefault(x => x.ID == ID);
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

        public byte Edit(a_GiaoVien result)
        {
            var item = db.a_GiaoVien.FirstOrDefault(x => x.ID == result.ID);
            if (item == null)
            {
                return 0;
            }
            else
            {
                item.Email = result.Email;
                item.GioiTinh = result.GioiTinh;
                item.HoTen = result.HoTen;
                item.MaGiaoVien = result.MaGiaoVien;
                item.Password = result.Password;
                item.SDT = result.SDT;
                db.SaveChanges();
                return 1;
            }
        }
    }
}
