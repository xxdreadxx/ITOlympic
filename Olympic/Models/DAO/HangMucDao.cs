using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
                lst = db.a_HangMuc.Where(x => x.TrangThai != 10 && x.DoiTuong == type).ToList();
            }
            else
            {
                lst = db.a_HangMuc.Where(x => x.TrangThai != 10).ToList();
            }
            totalCount = lst.Count();
            return lst.OrderByDescending(x => x.ID).ToList();
        }

        public int Delete(string ListID)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = $"update a_HangMuc set TrangThai = 10 where ID in (select * from STRING_SPLIT('{convertArray}',','))";
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
                db.SaveChanges();
                return 1;
            }
        }

        public byte ChangeStatus(int ID, byte status)
        {
            var item = db.a_HangMuc.FirstOrDefault(x => x.ID == ID);
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
                string _sqlStr = $"update a_HangMuc set TrangThai = {status} where ID in (select * from dbo.SplitDelimiterString('{convertArray}',','))";
                var upd = db.Database.ExecuteSqlCommand(_sqlStr);
            }
            catch (Exception)
            {
                return 0;
            }
            return 1;
        }

        public bool checkMa(string ma, int id)
        {
            var item = db.a_HangMuc.FirstOrDefault(x => x.MaHangMuc == ma && x.TrangThai != 10 && x.ID != id);
            if (item != null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

    }
}
