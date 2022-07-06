using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.EF;

namespace Models.DAO
{
    public class UserDao
    {
        OlympicDbContext db = new OlympicDbContext();

        public List<a_GiaoVien> getAllGiaoVien(string search, ref int totalCount)
        {
            List<a_GiaoVien> lst = new List<a_GiaoVien>();
            if(search != "" && search != null)
            {
                lst = db.a_GiaoVien.Where(x => x.TrangThai != 10 && x.HoTen.Contains(search)).ToList();
            }
            else
            {
                lst = db.a_GiaoVien.Where(x => x.TrangThai != 10).ToList();
            }
            totalCount = lst.Count();
            return lst.OrderByDescending(x=>x.ID).ToList();
        }

        public int Login(string username, string password)
        {
            var user = db.a_GiaoVien.FirstOrDefault(x => x.Username == username && x.Password == password && x.TrangThai != 10);
            if(user == null)
            {
                // username or password is incorrect
                return 0;
            }
            else
            {
                //return status of Account: 1-Using, 2-Lock, 3-Expired
                return (int)user.TrangThai;
            }
        }

        public int getByUsername(string username, string password)
        {
            var user = db.a_GiaoVien.FirstOrDefault(x => x.Username == username && x.Password == password && x.TrangThai != 10);
            if (user == null)
            {
                // username or password is incorrect
                return 0;
            }
            else
            {
                //return status of Account: 1-Using, 2-Lock, 3-Expired
                return (int)user.ID;
            }
        }

        public a_GiaoVien getByID(int ID)
        {
            return db.a_GiaoVien.FirstOrDefault(x => x.ID == ID);
        }

        public byte Add(a_GiaoVien item)
        {
            try
            {
                db.a_GiaoVien.Add(item);
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

        public int Delete(string ListID)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = "update a_GiaoVien set TrangThai = 10 where ID in (select * from dbo.SplitDelimiterString(@lstMa,','))";
                var maTinParam1 = new SqlParameter("@lstMa", convertArray);
                var delete = db.Database.ExecuteSqlCommand(_sqlStr, maTinParam1);
            }
            catch (Exception)
            {
                return 0;
            }
            return 1;
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
                item.SDT = result.SDT;
                if (result.Image != null)
                {
                    item.Image = result.Image;
                }
                item.DiaChi = result.DiaChi;
                item.NgaySinh = result.NgaySinh;
                db.SaveChanges();
                return 1;
            }
        }

        public byte UpdatePass(string pass, int IDNV)
        {
            try
            {
                a_GiaoVien item = db.a_GiaoVien.FirstOrDefault(x => x.ID == IDNV);
                if (item.Password == pass)
                {
                    return 1;
                }
                else
                {
                    item.Password = pass;
                    db.SaveChanges();
                    return 0;
                }
            }
            catch
            {
                return 2;
            }
        }

        public bool checkUsername(string username, int id)
        {
            var item = db.a_GiaoVien.FirstOrDefault(x => x.Username == username && x.TrangThai != 10 && x.ID != id);
            if(item != null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public List<a_GiaoVien> lstHLV()
        {
            return db.a_GiaoVien.Where(x => x.TrangThai == 1 && x.LoaiTK == 2).ToList();
        }

    }
}
