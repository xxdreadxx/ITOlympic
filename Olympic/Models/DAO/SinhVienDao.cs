﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
        public int Delete(string ListID)
        {
            try
            {
                var convertArray = ListID.Replace("[", "").Replace("]", "");
                string _sqlStr = $"update a_SinhVien set TrangThai = 10 where ID in (select * from STRING_SPLIT('{convertArray}',','))";
                var upd1 = db.Database.ExecuteSqlCommand(_sqlStr);
            }
            catch (Exception ex)
            {
                return 0;
            }
            return 1;
        }
        public a_SinhVien getByID(int ID)
        {
            return db.a_SinhVien.FirstOrDefault(x => x.ID == ID);
        }

        public int Add(a_SinhVien item)
        {
            try
            {
                db.a_SinhVien.Add(item);
                db.SaveChanges();
                return item.ID;
            }
            catch
            {
                return 0;
            }
        }

        public byte ChangeStatus(int ID, byte status)
        {
            var item = db.a_SinhVien.FirstOrDefault(x => x.ID == ID);
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

        public byte Edit(a_SinhVien result)
        {
            var item = db.a_SinhVien.FirstOrDefault(x => x.ID == result.ID);
            if (item == null)
            {
                return 0;
            }
            else
            {
                item.MaSV = result.MaSV;
                item.Email = result.Email;
                item.GioiTinh = result.GioiTinh;
                item.HoTen = result.HoTen;
                item.Lop = result.Lop;
                item.SDT = result.SDT;
                item.DiaChi = result.DiaChi;
                item.NgaySinh = result.NgaySinh;
                item.TrangThai = result.TrangThai;
                if (result.AnhHoSo != null)
                {
                    item.AnhHoSo = result.AnhHoSo;
                }
                db.SaveChanges();
                return 1;
            }
        }
    }
}
